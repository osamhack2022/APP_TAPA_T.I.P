import collections
import json
import time

import pyrebase
from flask import Blueprint, request

from ai_linker import execute_async, handle_content_task
from config import config
from users import check_token

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("community", __name__, url_prefix="/community")


@bp.route("/best/", methods=["GET"])
def get_best_list():
    """
    Returns the top 3 most liked posts.

    :return: top 3 most liked posts
    """
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

    # prevention of empty data
    if len(post_keys) == 0:
        return {}, 200

    # NOTE: use of zip to create tuple :)
    sorted_val = sorted(zip(likes, post_keys), reverse=True)[:3]

    for i in sorted_val:
        final_dict[i[1]] = posts_dic[i[1]]

    return json.dumps(final_dict), 200


@bp.route("/new/", methods=["GET"])
def get_new_list():
    """
    Returns posts ordered by their last update time.

    :return: posts ordered by their last update time.
    """
    data = db.child("posts").order_by_child("updated_at").get().val()
    sorted_data = collections.OrderedDict(reversed(list(data.items())))
    return sorted_data, 200


@bp.route("/posts/", methods=["GET"])
def get_post_list():
    """
    Returns the list of all posts ordered by their last update time.
    Optionally, a tags list can be passed to filter the posts.

    :return: list of all posts optionally filtered by tags
    """
    if request.args.get('tags'):
        tag = request.args.get('tags')
        posts_dic = db.child("posts").order_by_child("updated_at").get().val()
        tag_posts = {}

        for post_id, post_val in posts_dic.items():
            tags = post_val["tags"].split(",")
            if tag in tags:
                tag_posts[post_id] = post_val
        return json.dumps(tag_posts), 200
    else:
        return db.child("posts").order_by_child("updated_at").get().val(), 200


@bp.route("/posts/<post_id>", methods=["GET"])
def get_specific_post(post_id):
    """
    Returns the post instance associated with post_id.

    :param post_id: the id of the post to get info
    :return: the post instance and comments linked to post
    """
    post = db.child("posts").child(post_id).get().val()

    if not post:
        return {"status": "post does not exist"}, 403

    comments = db.child("comments").order_by_child("post_id").equal_to(post_id).get().val()

    if not comments:
        comments = {}

    return {"post": post, "comments": comments}, 200


@bp.route("/posts/<post_id>", methods=["GET"])
def get_emotion(post_id):
    """
    Gets the emotion data associated with the post.

    :param post_id: id of the post to get emotion data
    :return: emotion data instance or {} if not exists
    """
    data = db.child("emotion_data").order_by_child("content_id").equal_to(post_id).get().val()
    return data if data is not None else {}, 200


@bp.route("/posts/<post_id>/like", methods=["POST"])
def like_post(post_id):
    """
    Adds or removes a like to the post.

    :param post_id: id of the post to add/remove like
    :return: status message indicating that adding/removing like was successful
    """
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    user_id = decoded["localId"]
    like = db.child("users").child(user_id).child("likes").child(post_id).get().val()

    if like is None:
        db.child("users").child(user_id).child("likes").child(post_id).set(1)
        db.child("posts").child(post_id).child("likes").child(user_id).set(1)
    else:
        db.child("users").child(user_id).child("likes").child(post_id).remove()
        db.child("posts").child(post_id).child("likes").child(user_id).remove()

    return {"status": "like success"}, 200


@bp.route("/posts/", methods=["POST"])
def create_post():
    """
    Creates a new post.

    :return: a status message indicating that post was created and the newly created post's id
    """
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    username = db.child("users").child(user_id).child("username").get().val()

    params = request.form
    u_title = params["title"]
    u_content = params["content"]
    u_tags = params["tags"]

    now = int(time.time())
    u_created_at = now
    u_updated_at = now

    to_push = {
        "username": username,
        "user_id": user_id,
        "title": u_title,
        "content": u_content,
        "tags": u_tags,
        "created_at": u_created_at,
        "updated_at": u_updated_at,
        "views": 0,
        "comment_num": 0
    }

    if "pic_url" in params:
        to_push["pic_url"] = params["pic_url"]

    res = db.child("posts").push(to_push)

    post_id = res["name"]
    db.child("users").child(user_id).child("posts").update({
        post_id: u_created_at
    })

    args = (user_id, "post", post_id, u_content, request.url_root)
    execute_async(handle_content_task, args)
    return {"status": "post success", "post_id": post_id}, 200


@bp.route("/posts/<post_id>", methods=["PUT"])
def update_post(post_id):
    """
    Updates a new post.

    :return: a status message indicating that post was updated
    """
    token = request.headers.get("Authorization")
    decoded = check_token(token)
    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    try:
        post_user_id = db.child("posts").child(post_id).get().val()["user_id"]
    except:
        return {"status": "Post does not exist"}, 403

    if user_id != post_user_id:
        return {"status": "Not owner of post"}, 403

    params = request.get_json()
    u_title = params["title"]
    u_content = params["content"]
    u_tags = params["tags"]

    now = int(time.time())
    u_updated_at = now

    to_update = {
        "title": u_title,
        "content": u_content,
        "tags": u_tags,
        "updated_at": u_updated_at,
    }

    if "pic_url" in params:
        to_update["pic_url"] = params["pic_url"]

    db.child("posts").child(post_id).update(to_update)
    return {"status": "put success"}, 200


@bp.route("/posts/<post_id>", methods=["DELETE"])
def delete_post(post_id):
    """
    Deletes a post.

    :param post_id: id of the post to delete
    :return: a status message indicating that post was deleted
    """
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    try:
        post_user_id = db.child("posts").child(post_id).get().val()["user_id"]
    except:
        return {"status": "Post does not exist"}, 403

    if user_id != post_user_id:
        return {"status": "Not owner of post"}, 403

    try:
        associated_comments = db.child("posts").child(post_id).child("comments").get().val().keys()

        for comment_id in associated_comments:
            c_user_id = db.child("comments").child(comment_id).child("user_id").get().val()
            db.child("comments").child(comment_id).remove()
            db.child("users").child(c_user_id).child("comments").child(comment_id).remove()
    except:
        pass

    db.child("posts").child(post_id).remove()
    db.child("users").child(user_id).child("posts").child(post_id).remove()
    return {"status": "delete success"}, 200


@bp.route("/comment/<post_id>", methods=["POST"])
def create_comment(post_id):
    """
    Adds a comment to a post.

    :param post_id: id of the post to add comment
    :return: a status message indicating that comment was added and the newly created comment's id
    """
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    # fields
    user_id = decoded["localId"]
    username = db.child("users").child(user_id).child("username").get().val()

    params = request.get_json()
    u_content = params["content"]

    now = int(time.time())
    u_created_at = now

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

    try:
        len_comments = len(db.child("comments").order_by_child("post_id").equal_to(post_id).get().val())
    except:
        pass

    db.child("posts").child(post_id).update({
        "comment_num": len_comments
    })

    return {"status": "comment post success", "comment_id": res["name"]}, 200


@bp.route("/comment/<comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    """
    Deletes a comment from a post.

    :param comment_id: id of the comment to delete
    :return: a status message indicating that comment was deleted
    """
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

    if user_id != c_user_id:
        return {"status": "Not owner of post"}, 403

    db.child("comments").child(comment_id).remove()
    db.child("users").child(user_id).child("comments").child(comment_id).remove()
    db.child("posts").child(c_post_id).child("comments").child(comment_id).remove()
    len_comments = 0

    try:
        len_comments = len(db.child("comments").order_by_child("post_id").equal_to(c_post_id).get().val())
    except:
        pass

    db.child("posts").child(c_post_id).update({
        "comment_num": len_comments
    })
    return {"status": "delete success"}, 200


@bp.route("/comment/<comment_id>/like", methods=["POST"])
def like_comment(comment_id):
    """
    Adds or removes a like to the comment.

    :param comment_id: id of the comment to add/remove like
    :return: status message indicating that adding/removing like was successful
    """
    token = request.headers.get("Authorization")
    decoded = check_token(token)

    if decoded == "invalid token":
        return {"status": "Invalid token, requires login again"}, 403

    user_id = decoded["localId"]
    like = db.child("users").child(user_id).child("likes").child(comment_id).get().val()

    if like is None:
        db.child("users").child(user_id).child("likes").child(comment_id).set(1)
        db.child("comments").child(comment_id).child("likes").child(user_id).set(1)
    else:
        db.child("users").child(user_id).child("likes").child(comment_id).remove()
        db.child("comments").child(comment_id).child("likes").child(user_id).remove()
    return {"status": "like success"}, 200


@bp.route("/posts/<post_id>/views", methods=["POST"])
def update_view_count(post_id):
    """
    Updates the view count of the post.

    :param post_id: id of the post to update the view count
    :return: status message indicating that the update was successful
    """
    past_view = db.child("posts").child(post_id).child("views").get().val()
    past_view = 1 if past_view is None else past_view + 1
    db.child("posts").child(post_id).update({
        "views": past_view
    })
    return {"status": "update view success"}, 200
