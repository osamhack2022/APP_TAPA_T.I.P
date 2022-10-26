import users
import diary
import channels
import community
import statistics
import news
from flask import Flask, render_template
from flask_cors import CORS
import os
import time
import datetime
from config import app_secret_key

app = Flask(__name__)
app.secret_key = app_secret_key
cors = CORS(app)


def format_server_time():
    server_time = time.localtime()
    return time.strftime("%I:%M:%S %p", server_time)


@app.route('/')
def index():
    dummy_times = [datetime.datetime(2022, 1, 1, 10, 0, 0),
                   datetime.datetime(2022, 1, 2, 10, 30, 0),
                   datetime.datetime(2022, 1, 3, 11, 0, 0),
                   ]

    return render_template('index.html', times=dummy_times)


app.register_blueprint(users.bp)

app.register_blueprint(community.bp)

app.register_blueprint(channels.blueprint)

app.register_blueprint(diary.bp)

app.register_blueprint(statistics.bp)
app.register_blueprint(news.bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
