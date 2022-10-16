from flask import Flask, request, jsonify
import os
from emotions_classifier import predict_text, get_top_emotion_from, calculate_weighted_score

app = Flask(__name__)


@app.route('/classify', methods=['POST'])
def index():
    parameters = request.get_json()
    text = parameters["content"]
    avg_scores = predict_text(text)
    resp = {
        "emotion": get_top_emotion_from(avg_scores),
        "avg_scores": avg_scores.tolist(),
        "overall_score": calculate_weighted_score(avg_scores)
    }
    return jsonify(resp)


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=int(os.environ.get('PORT', 8081)))
