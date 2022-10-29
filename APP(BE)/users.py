import base64
import time

import pyrebase
import requests
from flask import Blueprint, request

from config import *

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("users", __name__, url_prefix="/users")


def admin_login():
    """
    Attempts to auth with admin account credentials. If successful, the token of login session will be returned.

    :return: A string which is the token of the admin account's login session or "invalid credentials" if login failed
    """
    try:
        res = auth.sign_in_with_email_and_password(admin_account_email, admin_account_password)
        return res["idToken"]
    except requests.exceptions.HTTPError:
        return "invalid credentials"


def update_avatar(blob, user_id):
    with open(user_id + ".jpg", "wb") as file_handler:
        file_handler.write(base64.decodebytes(blob))

    storage.child("images").child(user_id).child("profile_pic").put(user_id + '.jpg')
    pic_url = storage.child("images").child(user_id).child("profile_pic").get_url(None)
    return pic_url


def check_token(token):
    try:
        decoded_token = auth.get_account_info(token)
        return decoded_token["users"][0]
    except requests.exceptions.HTTPError:
        return "invalid token"


@bp.route("/get/myself", methods=["GET"])
def get_myself():
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token"}, 200
    u_id = decoded["localId"]
    data = db.child("users").child(u_id).get().val()
    if data is None:
        return {
            "error": "User not found. Account data possibly corrupted."
        }, 500
    return data, 200


@bp.route("/get/myself/detail", methods=["GET"])
def get_myself_detail():
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token"}, 200
    u_id = decoded["localId"]
    data = db.child("users").child(u_id).get().val()

    if data is None:
        return {
            "error": "User not found. Account data possibly corrupted."
        }, 500

    # fetch user posts
    user_posts = db.child("posts").order_by_child(
        "user_id").equal_to(u_id).get().val()

    # fetch user comments
    user_comments = db.child("comments").order_by_child(
        "user_id").equal_to(u_id).get().val()

    return {
        "user": data,
        "posts": user_posts,
        "comments": user_comments,
    }, 200


@bp.route("/login", methods=["POST"])
def login():
    params = request.get_json()
    username = params["username"]
    password = params["password"]
    user = auth.sign_in_with_email_and_password(username, password)
    return {"idToken": user["idToken"]}, 200


@bp.route("/myself", methods=["POST", "PUT"])
def update_user():
    params = request.get_json()

    u_id = params["id"]
    u_email = params["email"]
    u_name = params["name"]
    u_username = params["username"]
    #u_avatar = update_avatar(params["avatar"], u_id)
    u_service_number = params["service_number"]
    u_rank = params["rank"]
    u_position = params["position"]
    u_affiliated_unit = params["affiliated_unit"]
    u_enlisted_at = params["enlisted_at"]
    u_discharged_at = params["discharged_at"]

    CUR_TIME = int(time.time())
    u_updated_at = CUR_TIME

    db.child("users").child(u_id).update(
        {
            'id': u_id,
            'username': u_username,
            'email': u_email,
            'name': u_name,
            'service_number': u_service_number,
            'rank': u_rank,
            'position': u_position,
            'affiliated_unit': u_affiliated_unit,
            'enlisted_at': u_enlisted_at,
            'discharged_at': u_discharged_at,
            'updated_at': u_updated_at
        })

    if request.method == 'POST':

        db.child("users").child(u_id).update(
            {'created_at': CUR_TIME
             })
        return {"status": "POST success"}, 200

    return {"status": "PUT success"}, 200
