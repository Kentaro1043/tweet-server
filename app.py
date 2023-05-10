import os

from flask import Flask
from flask_httpauth import HTTPBasicAuth
import tweepy
from dotenv import load_dotenv

# 開発用.env読み込み、本番環境ではエラーを出さずに無視される
load_dotenv(".env")

# Flask設定
app = Flask(__name__)
auth = HTTPBasicAuth()

# tweepy設定
client = tweepy.Client(
	consumer_key=os.environ.get("TWIT_CONSUMER_KEY"),
	consumer_secret=os.environ.get("TWIT_CONSUMER_SECRET"),
	access_token=os.environ.get("TWIT_ACCESS_TOKEN"),
	access_token_secret=os.environ.get("TWIT_ACCESS_TOKEN_SECRET")
)

# 認証
@auth.verify_password
def verify_password(username, password):
	if username == os.environ.get("USERNAME") and password == os.environ.get("PASSWORD"):
		return username
	else:
		return None

# メインページ
@app.route("/")
def main():
	return render_template("index.html")

# ツイート用API
@app.route("/tweet", methods=["POST"])
@auth.login_required
def tweet():
	try:
		client.create_tweet(text=request.form["tweet"])
		return 200
	except Exception as e:
		return { error: e }, 403
