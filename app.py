import os

from flask import Flask, request, render_template, jsonify
import tweepy
from dotenv import load_dotenv

# 開発用.env読み込み、本番環境ではエラーを出さずに無視される
load_dotenv(".env")

# Flask設定
app = Flask(__name__)

# tweepy設定
client = tweepy.Client(
	consumer_key=os.environ.get("TWIT_CONSUMER_KEY"),
	consumer_secret=os.environ.get("TWIT_CONSUMER_SECRET"),
	access_token=os.environ.get("TWIT_ACCESS_TOKEN"),
	access_token_secret=os.environ.get("TWIT_ACCESS_TOKEN_SECRET")
)


# メインページ
@app.route("/")
def main():
	return render_template("index.html")


# ツイート用API
@app.route("/tweets", methods=["POST"])
def tweets():
	# 受信データ
	data = request.get_json()

	# 認証
	password = data["password"]
	if password != os.environ.get("PASSWORD"):
		return jsonify({"error": "パスワードが間違っています。"}), 401

	# ツイート
	try:
		client.create_tweet(text=data["tweet"])
		return jsonify({}), 200
	except Exception as e:
		return jsonify({"error": str(e)}), 403
