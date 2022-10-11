from flask import Flask, render_template, Blueprint, request
import os, pyrebase, requests
import time, datetime

from mySecrets import config

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
storage = firebase.storage()

bp = Blueprint("community", __name__, url_prefix="/community")

#best 게시물 목록
@bp.route("/best/", methods=["GET"])
def get_best_list():
  pass

#new 게시물 목록
@bp.route("/new/", methods=["GET"])
def get_new_list():
  pass

#자유게시판 게시물 목록
@bp.route("/posts/", methods=["GET"])
def get_post_list():
  pass

#게시물 상세 내용 + comments
@bp.route("/posts/<post_id>", methods=["GET"])
def get_post_list(post_id):
  pass

#게시물 작성, login required.
@bp.route("/posts/", methods=["POST"])
def post_a_post():
  pass

#게시물 수정, login required. 
@bp.route("/posts/<post_id>", methods=["PUT"])
def update_post(post_id):
  pass

#게시물 삭제, login required. 
@bp.route("/posts/<post_id>", methods=["DELETE"])
def update_post(post_id):
  pass

#댓글 작성, login required.
@bp.route("/comment/<post_id>", methods=["POST"])
def post_a_comment(post_id):
  pass

#댓글 삭제, login required.
@bp.route("/comment/<comment_id>", methods=["DELETE"])
def post_a_comment(comment_id):
  pass
