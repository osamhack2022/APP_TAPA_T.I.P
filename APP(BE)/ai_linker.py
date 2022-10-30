import time
from datetime import datetime

import pyrebase
import requests
from threading import Thread
from config import config, classifier_server_url
from users import admin_login

firebase = pyrebase.initialize_app(config)
database = firebase.database()


def execute_async(task, args):
    """
    Executes the given task with args on a new thread.

    :param task: function to run async
    :param args: args to be passed as parameters to the function
    """
    thread = Thread(target=task, args=(args,))
    thread.daemon = True
    thread.start()


SINGLE_SCORE_DANGER_THRESHOLD = -0.99
NUMBER_OF_ENTRIES = 10
AVG_SCORE_DANGER_THRESHOLD = -0.5
WARNING_MESSAGE = '{}({})님의 감정 지수({:.2f})가 위험 단계에 도달했습니다.'


def handle_content_task(args):
    """
    Calculates the emotion score of a content and populates the data to the database.
    In addition, the emotion score produced will go through a mental health assessment process and
    counselors will be notified if the user is identified as at risk.

    To prevent Flask from blocking, call this function asynchronously using :func:`execute_async`.

    :param args: A tuple containing user_id, content_type, content_id, content, and base_url.
    """
    user_id = args[0]
    content_type = args[1]
    content_id = args[2]
    content = args[3]
    base_url = args[4]
    res = requests.post(classifier_server_url, json={'content': content}).json()
    top_emotion = res["emotion"]
    weighted_emotion_score = res["overall_score"]
    user = database.child("users").child(user_id).get().val()
    unit = user["affiliated_unit"]
    now = int(time.time())

    # Pushes the new emotion data into 'emotion_data/all'.
    res = database.child("emotion_data").push({
        "top_emotion": top_emotion,
        "weighted_emotion_score": weighted_emotion_score,
        "user_id": user_id,
        "content_type": content_type,
        "content_id": content_id,
        "unit": unit,
        "created_at": now
    })

    # Adds the new emotion data to user.emotion_data.
    emotion_id = res["name"]
    database.child("users").child(user_id).child("emotion_data").child(emotion_id).set(now)

    # Adds the new emotion data to unit.emotion_data.
    database.child("units").child(unit).child("emotion_data").child(emotion_id).set(now)

    """
    When a new post is submitted, the mental health risk assessment process happens in 2 ways:
    1.  The weighted emotion score produced from the post is checked to see if it meets a certain threshold.
    2.  An average weighted emotion score is generated from the last 10 emotion data entries. This score is
        then also compared to a (lower) threshold value.
        
    If either of the processes meets or exceeds the threshold, a counselor affiliated with user's unit will
    receive a message indicating the danger.
    """
    alert_counselors = False
    score = weighted_emotion_score

    print("single_score=" + str(score))

    if score <= SINGLE_SCORE_DANGER_THRESHOLD:
        alert_counselors = True
    # Only go to second assessment process if first passes.
    else:
        all_data = list(database.child("emotion_data").order_by_child("user_id").equal_to(user_id).get().val().items())
        all_data.sort(key=lambda entry: entry[1]["created_at"], reverse=True)
        all_data = all_data[:NUMBER_OF_ENTRIES]
        score = sum(map(lambda entry: entry[1]["weighted_emotion_score"], all_data)) / NUMBER_OF_ENTRIES

        print("avg_score=" + str(score))
        if score <= AVG_SCORE_DANGER_THRESHOLD:
            alert_counselors = True

    if alert_counselors:
        # Increment Daily Statistics count
        today = datetime.now().strftime("%Y-%m-%d")
        count = database.child("statistics").child("daily").child(today).child("counselor_alert_count").get().val()
        count = 1 if count is None else count + 1
        database.child("statistics").child("daily").child(today).update({
            "counselor_alert_count": count
        })

        message = WARNING_MESSAGE.format(user["name"], user["username"], score)
        token = admin_login()
        headers = {'Authorization': token}
        counselors = database.child("counselors").shallow().get().val()

        for user_id in counselors:
            res = requests.post(base_url + '/channels/', json={'user_id': user_id}, headers=headers).json()
            requests.post(base_url + '/channels/' + res["id"], json={'content': message}, headers=headers).json()
