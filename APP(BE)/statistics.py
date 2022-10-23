from flask import Flask, render_template, Blueprint, request
import os
import pyrebase
import requests
import time
import datetime
import random

from mySecrets import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("statistics", __name__, url_prefix="/statistics")


@bp.route("/all", methods=["GET"])
def get_diary_list():

    today = db.child("statistics").child("today").get().val()
    data = db.child("statistics").child("latest").get().val()
    if data is None:
        return {}, 500

    accident_streaks = random.choice(data['accident-streaks'])
    issues = random.choice(data['issues'])
    emotions = random.choice(data['emotions'])

    return {
        "today": today,
        "accident_streaks": accident_streaks,
        "issues": issues,
        "emotions": emotions
    }, 200
