import tensorflow as tf

# model load
model = tf.keras.models.load_model('./model/punish_predict_model.h5')
model2 = tf.keras.models.load_model('./model/punish_predict_model2.h5')


def planned_to_num(x):
    if x == '우발적':
        return 0
    if x == '다소 우발적':
        return 1
    if x == '다소 계획적':
        return 2
    if x == '계획적':
        return 3


# predict 함수 전처리

# get_accident : 데이터 request (당한 가혹행위, 관계, 단발성, 개월, 주기, 우발성, 선처여부)
# [중요] 선처여부는 처음부터 숫자로 입력 받음
def get_accident(accident, relation, once, month, frequency, is_planned, mercy):
    accident_data = accident_to_num(accident)
    accident_data.append(once_to_num(once))
    accident_data.append(planned_to_num(is_planned))
    accident_data.append(accident_count(month, frequency))
    accident_data.append(mercy)
    return accident_data


def accident_to_num(accident):
    if accident == '따돌림':
        return [1, 0, 0, 0, 0, 0, 0, 0]
    if accident == '모욕':
        return [0, 1, 0, 0, 0, 0, 0, 0]
    if accident == '성추행':
        return [0, 0, 1, 0, 0, 0, 0, 0]
    if accident == '성희롱':
        return [0, 0, 0, 1, 0, 0, 0, 0]
    if accident == '얼차려':
        return [0, 0, 0, 0, 1, 0, 0, 0]
    if accident == '폭언, 욕설':
        return [0, 0, 0, 0, 0, 1, 0, 0]
    if accident == '폭행, 구타':
        return [0, 0, 0, 0, 0, 0, 1, 0]
    if accident == '협박, 강요':
        return [0, 0, 0, 0, 0, 0, 0, 1]
    if accident == '금품갈취':
        return [0, 0, 0, 0, 0, 0, 0, 0]


def once_to_num(once):
    if once == '지속적':
        return 1
    if once == '단발적':
        return 0


def accident_count(month, frequency):
    if frequency == '월 1회':
        return month * 1 / 360
    if frequency == '월 2회':
        return month * 2 / 360
    if frequency == '주 1~2회':
        return month * 6 / 360
    if frequency == '주 3~4회':
        return month * 14 / 360
    if frequency == '매일':
        return month * 30 / 360
    else:
        return 0


def punish_estimate(x):
    if x > 180:
        return '실형 이상'
    elif x > 150:
        return '군기교육 상(11~15일) ~ 강등'
    elif x > 140:
        return '군기교육 중(6~10일) ~ 군기교육 상(11~15일)'
    elif x > 130:
        return '군기교육 하(1~5일) ~ 군기교육 중(6~10일)'
    elif x > 120:
        return '감봉 3개월 ~ 군기교육 하(1~5일)'
    elif x > 110:
        return '감봉 2~3개월'
    elif x > 100:
        return '감봉 1~2개월'
    elif x > 90:
        return '휴가단축 5일 ~ 감봉 1개월'
    elif x > 80:
        return '휴가단축 3~5일'
    elif x > 70:
        return '휴가단축 2~4일'
    elif x > 60:
        return '휴가단축 1~3일'
    elif x > 50:
        return '근신 11~15일'
    elif x > 40:
        return '근신 6~10일'
    elif x > 30:
        return '견책 ~ 근신 1~5일'
    else:
        return '견책'


# predict 함수
def predict(accident, relation, once, month, frequency, is_planned, mercy):
    accident_data2 = get_accident(accident, relation, once, month, frequency, is_planned, mercy)
    accident_data1 = accident_data2[:-1]
    predict1 = model.predict([accident_data1])
    predict2 = model2.predict([accident_data2])
    danger_rate = str(predict1[0][0] / 100.0)
    predicted_punishment = punish_estimate(predict1[0][0])
    chance_of_forced_reloc = str(predict2[0][0])
    return danger_rate, predicted_punishment, chance_of_forced_reloc
