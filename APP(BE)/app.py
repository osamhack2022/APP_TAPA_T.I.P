
from flask import Flask, render_template
import os
import time, datetime

app = Flask(__name__)

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

if __name__ == '__main__':
  app.run(debug=True,host='127.0.0.1',port=int(os.environ.get('PORT', 8080)))