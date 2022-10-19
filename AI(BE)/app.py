from flask import Flask, request, jsonify
import os
from emotions_classifier import predict_text, get_emotion_from

app = Flask(__name__)


@app.route('/classify', methods=['POST'])
def index():
    parameters = request.get_json()
    text = parameters["content"]
    avg_scores = predict_text(text)
    resp = {
        "emotion": get_emotion_from(avg_scores),
        "avg_scores": avg_scores.tolist()
    }
    return jsonify(resp)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8081)))
