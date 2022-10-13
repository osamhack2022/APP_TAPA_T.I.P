from flask import Blueprint, request
import pyrebase
import time

from mySecrets import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
database = firebase.database()

blueprint = Blueprint("channels", __name__, url_prefix="/channels")


# todo: add validation & comments

@blueprint.route("/", methods=["POST"])
def create_channel():
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    parameters = request.get_json()
    user_id = parameters["user_id"]

    res = database.child("users").child(self_id).child("channels").child(user_id).shallow().get()

    if res.val() is not None:
        return {"status": "channel already exists"}, 200

    now = int(time.time())

    res = database.child("channels").push({
        "last_message_id": None,
        "participants": {self_id: True, user_id: True},
        "messages": {},
        "created_at": now,
        "updated_at": now
    })

    channel_id = res["name"]

    database.child("users").child(self_id).child("channels").update({
        user_id: channel_id
    })
    database.child("users").child(user_id).child("channels").update({
        self_id: channel_id
    })

    return {"status": "channel creation success"}, 200


@blueprint.route("/<channel_id>", methods=["GET"])
def get_channel(channel_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    channel = database.child("channels").child(channel_id).get().val()

    if channel is None or channel["participants"][self_id] is None:
        return {"status": "channel does not exist"}, 403

    return channel, 200


@blueprint.route("/<channel_id>", methods=["POST"])
def send_message(channel_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    channel = database.child("channels").child(channel_id).get().val()

    if channel is None or channel["participants"][self_id] is None:
        return {"status": "channel does not exist"}, 403

    parameters = request.get_json()
    now = int(time.time())
    res = database.child("messages").child(channel_id).push({
        "sender_id": self_id,
        "content": parameters["content"],
        "created_at": now
    })
    message_id = res["name"]
    database.child("channels").child(channel_id).child("messages").child(message_id).set(now)
    database.child("channels").child(channel_id).child("last_message_id").set(message_id)
    database.child("channels").child(channel_id).child("updated_at").set(now)
    return {"status": "message creation success"}, 200


@blueprint.route("/<channel_id>/all", methods=["GET"])
def get_all_messages(channel_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    channel = database.child("channels").child(channel_id).get().val()

    if channel is None or channel["participants"][self_id] is None:
        return {"status": "channel does not exist"}, 403

    return database.child("messages").child(channel_id).get().val(), 200


@blueprint.route("/<channel_id>/<message_id>", methods=["GET"])
def get_single_message(channel_id, message_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    channel = database.child("channels").child(channel_id).get().val()

    if channel is None or channel["participants"][self_id] is None:
        return {"status": "channel does not exist"}, 403

    res = database.child("messages").child(channel_id).child(message_id).get().val()

    if res is None:
        return {"status": "message does not exist"}, 403

    return res, 200
