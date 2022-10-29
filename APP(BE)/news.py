import pyrebase
from flask import Blueprint

from config import config

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("news", __name__, url_prefix="/news")


@bp.route("/list", methods=["GET"])
def get_all_news():
    news = db.child("news").get().val()

    if news is None:
        return {}, 500

    return news, 200
