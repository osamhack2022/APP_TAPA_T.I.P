from datetime import datetime
from config import config
import pyrebase
from flask import Flask, request, jsonify
import os
from emotions_classifier import predict_text, get_top_emotion_from, calculate_weighted_score
from punishment_predictor import predict

app = Flask(__name__)

firebase = pyrebase.initialize_app(config)
database = firebase.database()


def increment_statistics(key):
    # Increment Daily Statistics count
    today = datetime.now().strftime("%Y-%m-%d")
    count = database.child("statistics").child("daily").child(today).child(key).get().val()
    # count = 1 if count is None else count + 1
    count = 13 if count is None else count + 1  # 앱 시연(숫자 증가 애니메이션)을 위해 최솟값을 10으로 설정하였습니다.
    database.child("statistics").child("daily").child(today).update({
        key: count
    })

    database.child("statistics").child("latest").child(key).set(count)


@app.route('/classify', methods=['POST'])
def classify_emotion():
    parameters = request.get_json()
    text = parameters["content"]
    avg_scores = predict_text(text)
    resp = {
        "emotion": get_top_emotion_from(avg_scores),
        "avg_scores": avg_scores.tolist(),
        "overall_score": calculate_weighted_score(avg_scores)
    }
    increment_statistics("emotion_detection_count")
    return jsonify(resp)


@app.route('/predict', methods=['POST'])
def predict_punishment():
    parameters = request.get_json()
    accident = parameters["accident"]
    relation = parameters["relation"]
    once = parameters["once"]
    month = parameters["month"]
    frequency = parameters["frequency"]
    is_planned = parameters["is_planned"]
    mercy = parameters["mercy"]
    danger_rate, predicted_punishment, chance_of_forced_reloc = predict(
        accident, relation, once, month, frequency, is_planned, mercy
    )
    resp = {
        "danger_rate": danger_rate,
        "predicted_punishment": predicted_punishment,
        "chance_of_forced_reloc": chance_of_forced_reloc
    }
    increment_statistics("punishment_prediction_count")
    return jsonify(resp)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8081)))
