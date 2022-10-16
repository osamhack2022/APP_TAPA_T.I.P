from flask import Flask, request, jsonify
import os
from emotions_classifier import predict_text

app = Flask(__name__)


@app.route('/')
def index():
    text = request.get_json()["content"]
    # sums = predict_text(text)
    # sums_list = sums.tolist()
    # return jsonify(sums_list)


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=int(os.environ.get('PORT', 8081)))
