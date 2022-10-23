from flask import Flask, render_template, Blueprint, request
import os
import pyrebase
import requests
import time
import datetime
import json
from ai_linker import execute_async, handle_content_task

from config import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("community", __name__, url_prefix="/community")

# best 게시물 목록


@bp.route("/best/", methods=["GET"])
def get_best_list():
    posts_dic = db.child("posts").get().val()
    likes = []
    post_keys = []
    final_dict = {}
    for post_key, post_val in posts_dic.items():
        post_keys.append(post_key)
        if "likes" in post_val:
            likes.append(len(post_val["likes"]))
        else:
            likes.append(0)    

    #prevention of empty data
    if (len(post_keys) == 0):
        return {}, 200

    #NOTE: use of zip to create tuple :)
    sorted_val = sorted(zip(likes, post_keys), reverse=True)[:3]

    
    for i in sorted_val:
        final_dict[i[1]] = posts_dic[i[1]]

    return json.dumps(final_dict), 200
# new 게시물 목록


@bp.route("/new/", methods=["GET"])
def get_new_list():
    return db.child("posts").order_by_child("updated_at").get().val(), 200

# 자유게시판 게시물 목록


@bp.route("/posts/", methods=["GET"])
def get_post_list():
    if (request.args.get('tags') is not None):
        tag = request.args.get('tags')
        posts_dic = db.child("posts").get().val()
        tag_posts = {}
        for post_id, post_val in posts_dic.items():
            tags = post_val["tags"].split(",")
            if tag in tags:
                tag_posts[post_id] = post_val
        return json.dumps(tag_posts), 200        
        pass
    else:
        return db.child("posts").get().val(), 200

# 게시물 상세 내용 + comments


@bp.route("/posts/<post_id>", methods=["GET"])
def get_specific_post(post_id):
    post = db.child("posts").child(post_id).get().val()
    comments = db.child("comments").order_by_child(
        "post_id").equal_to(post_id).get().val()
    if comments == []:
        comments = {}
    return {"post": post, "comments": comments}, 200

# 게시물 좋아요 / 좋아요 삭제


@bp.route("/posts/<post_id>/like", methods=["POST"])
def like_this_post(post_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    user_id = decoded["localId"]

    like = db.child("users").child(user_id).child(
        "likes").child(post_id).get().val()
    if like is None:
        db.child("users").child(user_id).child("likes").child(post_id).set(1)
        db.child("posts").child(post_id).child("likes").child(user_id).set(1)
    else:
        db.child("users").child(user_id).child("likes").child(post_id).remove()
        db.child("posts").child(post_id).child("likes").child(user_id).remove()
    return {"status": "like success"}, 200

# 게시물 작성, login required.


@bp.route("/posts/", methods=["POST"])
def post_a_post():
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    print(decoded)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    username = db.child("users").child(user_id).child("username").get().val()

    params = request.form
    u_title = params["title"]
    u_content = params["content"]
    u_tags = params["tags"]
    u_pic_url = params["pic_url"]

    CUR_TIME = int(time.time())
    u_created_at = CUR_TIME
    u_updated_at = CUR_TIME

    #print("filesize", size)

    res = db.child("posts").push({
        "username": username,
        "user_id": user_id,
        "title": u_title,
        "content": u_content,
        "tags": u_tags,
        "pic_url": u_pic_url,
        "created_at": u_created_at,
        "updated_at": u_updated_at,
        "views": 0,
        "comment_num": 0
    })

    post_id = res["name"]
    db.child("users").child(user_id).child("posts").update({
        post_id: u_created_at
    })
    db.child("posts").child(post_id).update({'pic_url': u_pic_url})

    args = (user_id, "post", post_id, u_content)
    execute_async(handle_content_task, args)
    return {"status": "post success", "post_id": post_id}, 200

# 게시물 수정, login required.


@bp.route("/posts/<post_id>", methods=["PUT"])
def update_post(post_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    try:
        post_user_id = db.child("posts").child(post_id).get().val()["user_id"]
    except:
        return {"status": "Post ID is wrong"}, 403

    if (user_id != post_user_id):
        return {"status": "Not owner of post"}, 403

    params = request.get_json()
    u_title = params["title"]
    u_content = params["content"]
    u_tags = params["tags"]
    u_pic_url = params["pic_url"]

    CUR_TIME = int(time.time())
    u_updated_at = CUR_TIME

    res = db.child("posts").child(post_id).update({
        "title": u_title,
        "content": u_content,
        "tags": u_tags,
        "pic_url": u_pic_url,
        "updated_at": u_updated_at,
    })

    return {"status": "put success"}, 200

# 게시물 삭제, login required.


@bp.route("/posts/<post_id>", methods=["DELETE"])
def delete_post(post_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    try:
        post_user_id = db.child("posts").child(post_id).get().val()["user_id"]
    except:
        return {"status": "Post ID is wrong"}, 403

    if (user_id != post_user_id):
        return {"status": "Not owner of post"}, 403
    try: 
        associated_comments = db.child("posts").child(
            post_id).child("comments").get().val().keys()
        for comment_id in associated_comments:
            c_user_id = db.child("comments").child(
                comment_id).child("user_id").get().val()
            db.child("comments").child(comment_id).remove()
            db.child("users").child(c_user_id).child(
                "comments").child(comment_id).remove()
    except:
        pass

    db.child("posts").child(post_id).remove()
    db.child("users").child(user_id).child("posts").child(post_id).remove()
    return {"status": "delete success"}, 200

# 댓글 작성, login required.


@bp.route("/comment/<post_id>", methods=["POST"])
def post_a_comment(post_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403
    # print(decoded)

    # fields
    user_id = decoded["localId"]
    username = db.child("users").child(user_id).child("username").get().val()

    params = request.get_json()
    u_content = params["content"]

    CUR_TIME = int(time.time())
    u_created_at = CUR_TIME

    res = db.child("comments").push({
        "username": username,
        "post_id": post_id,
        "user_id": user_id,
        "content": u_content,
        "created_at": u_created_at,
    })

    db.child("posts").child(post_id).child("comments").update({
        res["name"]: u_created_at
    })

    db.child("users").child(user_id).child("comments").update({
        res["name"]: u_created_at
    })

    len_comments = 0
    # print(db.child("comments").order_by_child("post_id").equal_to(post_id).get().val())
    try:
        len_comments = len(db.child("comments").order_by_child(
            "post_id").equal_to(post_id).get().val())
    except:
        pass

    db.child("posts").child(post_id).update({
        "comment_num": len_comments
    })

    return {"status": "comment post success", "comment_id": res["name"]}, 200


# 댓글 삭제, login required.
@bp.route("/comment/<comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    try:
        comment = db.child("comments").child(comment_id).get().val()
        c_user_id = comment["user_id"]
        c_post_id = comment["post_id"]
    except:
        return {"status": "Comment ID is wrong"}, 403

    if (user_id != c_user_id):
        return {"status": "Not owner of post"}, 403

    db.child("comments").child(comment_id).remove()
    db.child("users").child(user_id).child(
        "comments").child(comment_id).remove()
    db.child("posts").child(c_post_id).child(
        "comments").child(comment_id).remove()
    len_comments = 0
    try:
        len_comments = len(db.child("comments").order_by_child(
            "post_id").equal_to(c_post_id).get().val())
    except:
        pass
    db.child("posts").child(c_post_id).update({
        "comment_num": len_comments
    })
    return {"status": "delete success"}, 200


@bp.route("/comment/<comment_id>/like", methods=["POST"])
def like_this_comment(comment_id):
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    user_id = decoded["localId"]

    like = db.child("users").child(user_id).child(
        "likes").child(comment_id).get().val()
    if like is None:
        db.child("users").child(user_id).child(
            "likes").child(comment_id).set(1)
        db.child("comments").child(comment_id).child(
            "likes").child(user_id).set(1)
    else:
        db.child("users").child(user_id).child(
            "likes").child(comment_id).remove()
        db.child("comments").child(comment_id).child(
            "likes").child(user_id).remove()
    return {"status": "like success"}, 200


@bp.route("/posts/<post_id>/views", methods=["POST"])
def update_views(post_id):
    """remote_addr = request.remote_addr
    timestamp = int(time.time())
    try:
      is_there_view = db.child("views").child(post_id).order_by_key().get().val().keys()
      if remote_addr.replace(".", " ") not in is_there_view:
        raise Exception("remote addr not in view!")
    except: 
      db.child("views").child(post_id).update({
        remote_addr.replace(".", " "): timestamp
      })
      past_view = db.child("posts").child(post_id).child("views").get().val()
      past_view += 1
      db.child("posts").child(post_id).update({
        "views": past_view
      })"""
    past_view = db.child("posts").child(post_id).child("views").get().val()
    past_view += 1
    db.child("posts").child(post_id).update({
        "views": past_view
    })
    return {"status": "update view success"}, 200
