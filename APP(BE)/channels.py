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


# # 게시물 좋아요 / 좋아요 삭제
# @blueprint.route("/posts/<post_id>/like", methods=["POST"])
# def like_this_post(post_id):
#     token = request.headers.get("Authorization")
#     decoded = check_token(token)
#     if decoded == "invalid token":
#         return {"status": "Invalid token, requires login again"}, 403
#
#     user_id = decoded["localId"]
#
#     like = database.child("users").child(user_id).child("likes").child(post_id).get().val()
#     if like is None:
#         database.child("users").child(user_id).child("likes").child(post_id).set(1)
#         database.child("posts").child(post_id).child("likes").child(user_id).set(1)
#     else:
#         database.child("users").child(user_id).child("likes").child(post_id).remove()
#         database.child("posts").child(post_id).child("likes").child(user_id).remove()
#     return {"status": "like success"}, 200
#
#
# # 게시물 작성, login required.
# @blueprint.route("/posts/", methods=["POST"])
# def post_a_post():
#     token = request.headers.get("Authorization")
#     decoded = check_token(token)
#     if decoded == "invalid token":
#         return {"status": "Invalid token, requires login again"}, 403
#
#     # fields
#     user_id = decoded["localId"]
#
#     params = request.get_json()
#     u_title = params["title"]
#     u_content = params["content"]
#     u_tags = params["tags"]
#
#     CUR_TIME = int(time.time())
#     u_created_at = CUR_TIME
#     u_updated_at = CUR_TIME
#
#     res = database.child("posts").push({
#         "user_id": user_id,
#         "title": u_title,
#         "content": u_content,
#         "tags": u_tags,
#         "created_at": u_created_at,
#         "updated_at": u_updated_at,
#         "likes": 0,
#         "views": 0
#     })
#
#     # print(res)
#     database.child("users").child(user_id).child("posts").update({
#         res["name"]: u_created_at
#     })
#
#     return {"status": "post success", "post_id": res["name"]}, 200
#
#
# # 게시물 수정, login required.
# @blueprint.route("/posts/<post_id>", methods=["PUT"])
# def update_post(post_id):
#     token = request.headers.get("Authorization")
#     decoded = check_token(token)
#     if decoded == "invalid token":
#         return {"status": "Invalid token, requires login again"}, 403
#
#     # fields
#     user_id = decoded["localId"]
#     try:
#         post_user_id = database.child("posts").child(post_id).get().val()["user_id"]
#     except:
#         return {"status": "Post ID is wrong"}, 403
#
#     if (user_id != post_user_id):
#         return {"status": "Not owner of post"}, 403
#
#     params = request.get_json()
#     u_title = params["title"]
#     u_content = params["content"]
#     u_tags = params["tags"]
#
#     CUR_TIME = int(time.time())
#     u_updated_at = CUR_TIME
#
#     res = database.child("posts").child(post_id).update({
#         "title": u_title,
#         "content": u_content,
#         "tags": u_tags,
#         "updated_at": u_updated_at,
#     })
#
#     return {"status": "put success"}, 200
#
#
# # 게시물 삭제, login required.
# @blueprint.route("/posts/<post_id>", methods=["DELETE"])
# def delete_post(post_id):
#     token = request.headers.get("Authorization")
#     decoded = check_token(token)
#     if decoded == "invalid token":
#         return {"status": "Invalid token, requires login again"}, 403
#
#     # fields
#     user_id = decoded["localId"]
#     try:
#         post_user_id = database.child("posts").child(post_id).get().val()["user_id"]
#     except:
#         return {"status": "Post ID is wrong"}, 403
#
#     if (user_id != post_user_id):
#         return {"status": "Not owner of post"}, 403
#
#     database.child("posts").child(post_id).remove()
#     database.child("users").child(user_id).child("posts").child(post_id).remove()
#     return {"status": "delete success"}, 200
#
#
# # 댓글 작성, login required.
# @blueprint.route("/comment/<post_id>", methods=["POST"])
# def post_a_comment(post_id):
#     token = request.headers.get("Authorization")
#     decoded = check_token(token)
#     if decoded == "invalid token":
#         return {"status": "Invalid token, requires login again"}, 403
#     # print(decoded)
#
#     # fields
#     user_id = decoded["localId"]
#
#     params = request.get_json()
#     u_content = params["content"]
#
#     CUR_TIME = int(time.time())
#     u_created_at = CUR_TIME
#
#     res = database.child("comments").push({
#         "post_id": post_id,
#         "user_id": user_id,
#         "content": u_content,
#         "created_at": u_created_at,
#         "likes": 0,
#     })
#
#     database.child("posts").child(post_id).child("comments").update({
#         res["name"]: u_created_at
#     })
#
#     database.child("users").child(user_id).child("comments").update({
#         res["name"]: u_created_at
#     })
#
#     return {"status": "comment post success", "comment_id": res["name"]}, 200
#
#
# # 댓글 삭제, login required.
# @blueprint.route("/comment/<comment_id>", methods=["DELETE"])
# def delete_comment(comment_id):
#     token = request.headers.get("Authorization")
#     decoded = check_token(token)
#     if decoded == "invalid token":
#         return {"status": "Invalid token, requires login again"}, 403
#
#     # fields
#     user_id = decoded["localId"]
#     try:
#         comment = database.child("comments").child(comment_id).get().val()
#         c_user_id = comment["user_id"]
#         c_post_id = comment["post_id"]
#     except:
#         return {"status": "Comment ID is wrong"}, 403
#
#     if (user_id != c_user_id):
#         return {"status": "Not owner of post"}, 403
#
#     database.child("comments").child(comment_id).remove()
#     database.child("users").child(user_id).child("comments").child(comment_id).remove()
#     database.child("posts").child(c_post_id).child("comments").child(comment_id).remove()
#     return {"status": "delete success"}, 200
