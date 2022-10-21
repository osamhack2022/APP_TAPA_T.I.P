from dotenv import load_dotenv
import os

load_dotenv()

config = {
  "apiKey": os.environ["FIREBASE_API_KEY"],
  "authDomain": os.environ["FIREBASE_AUTH_DOMAIN"],
  "databaseURL": os.environ["FIREBASE_DATABASE_URL"],
  "storageBucket": os.environ["FIREBASE_STORAGE_BUCKET"]
}

app_secret_key = os.environ["FLASK_SECRET_KEY"]