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


def handle_content_task(args):
    """
    Calculates the score of a given content and recalculates the user's score if needed.

    To prevent Flask from blocking, call this function asynchronously using :func:`execute_async`.

    :param args: A tuple containing user_id, content_type, content_id, and content
    """
    user_id = args[0]
    content_type = args[1]
    content_id = args[2]
    content = args[3]
    score = requests.post(classifier_server_url, json={'content': content}).json()
    user = database.child("users").child(user_id).get().val()
    # TODO: Populate emotion_data/by_unit, emotion_data/time_based, users/<user>/emotion_data and more
