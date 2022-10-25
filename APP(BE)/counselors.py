from flask import Blueprint
import pyrebase
from config import config

firebase = pyrebase.initialize_app(config)
database = firebase.database()

blueprint = Blueprint("counselors", __name__, url_prefix="/counselors")


@blueprint.route("/", methods=["GET"])
def get_all_counselors():
    res = database.child("counselors").shallow().get().val()
    counselor_list = []

    if not res:
        return counselor_list, 200

    for uid in res:
        obj = database.child("users").child(uid).get().val()
        obj["user_id"] = uid
        counselor_list.append(obj)

    return counselor_list, 200
