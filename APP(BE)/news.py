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

bp = Blueprint("news", __name__, url_prefix="/news")


@bp.route("/list", methods=["GET"])
def get_diary_list():

    news = db.child("news").get().val()
    if news is None:
        return {}, 500

    return news, 200
