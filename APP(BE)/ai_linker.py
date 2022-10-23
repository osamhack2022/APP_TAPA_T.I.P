import time

import pyrebase
import requests
from threading import Thread
from config import config, classifier_server_url

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


SECONDS_IN_A_WEEK = 60 * 60 * 24 * 7


def handle_content_task(args):
    """
    Calculates the emotion score of a content and populates the data to the database.

    To prevent Flask from blocking, call this function asynchronously using :func:`execute_async`.

    :param args: A tuple containing user_id, content_type, content_id, and content
    """
    user_id = args[0]
    content_type = args[1]
    content_id = args[2]
    content = args[3]
    res = requests.post(classifier_server_url, json={'content': content}).json()
    top_emotion = res["emotion"]
    weighted_emotion_score = res["overall_score"]
    now = int(time.time())

    # Pushes the new emotion data into 'emotion_data/all'.
    res = database.child("emotion_data").push({
        "top_emotion": top_emotion,
        "weighted_emotion_score": weighted_emotion_score,
        "user_id": user_id,
        "content_type": content_type,
        "content_id": content_id,
        "created_at": now
    })

    # Adds the new emotion data to user.emotion_data.
    emotion_id = res["name"]
    database.child("users").child(user_id).child("emotion_data").child(emotion_id).set(now)

    # Adds the new emotion data to unit.emotion_data.
    user = database.child("users").child(user_id).get().val()
    unit = user["affiliated_unit"]
    database.child("units").child(unit).child("emotion_data").child(emotion_id).set(now)
