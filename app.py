import os

from flask import Flask
from dotenv import load_dotenv

# 開発用.env読み込み、本番環境ではエラーを出さずに無視される
load_dotenv(".env")

# Flask設定
app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello, World!"
