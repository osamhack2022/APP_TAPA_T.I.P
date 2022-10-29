from flask import Flask, render_template, Blueprint, request
import os
import pyrebase
import requests
import time
import datetime
from ai_linker import execute_async, handle_content_task

from config import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("diary", __name__, url_prefix="/diary")


@bp.route("/emotion/<diary_id>", methods=["GET"])
def get_diary_emotion(diary_id):
    data = db.child("emotion_data").order_by_child(
        "content_id").equal_to(diary_id).get().val()
    print(data)
    if data is None:
        return {}, 500
    return data


@bp.route("/list", methods=["GET"])
def get_diary_list():
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403
    user_id = decoded["localId"]
    data = db.child("diaries").order_by_child(
        "user_id").equal_to(user_id).get().val()

    if data is None:
        return {}, 500
    if isinstance(data, list):
        return [], 200

    entries = list(
        map(lambda key: {**data[key], 'key': key}, list(data.keys())))
    sorted_entries = sorted(
        entries, key=lambda x: x["created_at"], reverse=True)
    print(sorted_entries)
    return sorted_entries, 200


@bp.route("/new", methods=["POST"])
def post_diary():
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]

    params = request.get_json()
    u_content = params["content"]

    CUR_TIME = int(time.time())
    u_created_at = CUR_TIME
    u_updated_at = CUR_TIME

    res = db.child("diaries").push({
        "user_id": user_id,
        "content": u_content,
        "created_at": u_created_at,
        "updated_at": u_updated_at,
    })

    diary_id = res["name"]

    # print(res)
    db.child("users").child(user_id).child("diaries").update({
        diary_id: u_created_at
    })

    args = (user_id, "diary", diary_id, u_content)
    execute_async(handle_content_task, args)

    return {"status": "post success", "diary_id": diary_id}, 200
