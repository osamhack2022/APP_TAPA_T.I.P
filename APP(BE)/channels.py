from datetime import datetime

from flask import Blueprint, request
import pyrebase
import time
from operator import itemgetter

from config import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
database = firebase.database()

blueprint = Blueprint("channels", __name__, url_prefix="/channels")


# todo: add validation & comments
@blueprint.route("/", methods=["GET"])
def get_all_channels():
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    res = database.child("users").child(self_id).child("channels").get().val()
    channels = []

    if res is None:
        return channels, 200

    for key, value in res.items():
        obj = database.child("channels").child(value).get().val()
        obj["user_id"] = key
        obj["channel_id"] = value
        channels.append(obj)

    channels.sort(key=itemgetter('updated_at'), reverse=True)
    return channels, 200


@blueprint.route("/", methods=["POST"])
def create_channel():
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    self_id = decoded["localId"]
    self = database.child("users").child(self_id).get().val()
    parameters = request.get_json()
    user_id = parameters["user_id"]
    user = database.child("users").child(user_id).get().val()

    if self.get("username") != "admin" and user.get("position") == "상담사":
        # Increment Daily Statistics count
        today = datetime.now().strftime("%Y-%m-%d")
        count = database.child("statistics").child("daily").child(today).child("counseling_request_count").get().val()
        # count = 1 if count is None else count + 1
        count = 28 if count is None else count + 1 # 앱 시연(숫자 증가 애니메이션)을 위해 최솟값을 28로 설정하였습니다.
        database.child("statistics").child("daily").child(today).update({
            "counseling_request_count": count
        })

        database.child("statistics").child("latest").child("counseling_request_count").set(count)

    res = database.child("users").child(self_id).child("channels").child(user_id).get().val()

    if res is not None:
        return {"status": "channel already exists", "id": res}, 200

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

    return {"status": "channel creation success", "id": channel_id}, 200


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
    return {"status": "message creation success", "id": message_id}, 200


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
    res = database.child("messages").child(channel_id).get().val()

    if res is None:
        return {}, 200

    return res, 200


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
