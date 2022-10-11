from crypt import methods
from flask import Flask, render_template, Blueprint, request
import os, pyrebase, requests, json
import time, datetime
import base64

from mySecrets import config

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("users", __name__, url_prefix="/users")

#pass
def update_avatar(blob, u_id):
  with open(u_id + ".jpg", "wb") as fh:
    fh.write(base64.decodebytes(blob))

  storage.child("images").child(u_id).child("profile_pic").put(u_id + '.jpg') 
  pic_url = storage.child("images").child(u_id).child("profile_pic").get_url(None)
  return pic_url

def check_token(token):
  try:
    decoded_token = auth.get_account_info(token)
    return (decoded_token["users"][0])
  except requests.exceptions.HTTPError:
    return "invalid token"

@bp.route("/get/myself", methods=["GET"])
def get_myself():
  token = request.headers.get("Authorization") 
  decoded = check_token(token)
  if token == "invalid token":
    return {"status": "Invalid token"}, 200
  return decoded, 200
  
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