# tweet-server

ツイート専用のWebアプリです。

## 使い方

### 1. APIキーを[Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)から取得

`Consumer Keys` > `API Key and Secret`、`Authentication Tokens` > `Access Token and Secret`を取得し、メモしてください。

`User authentication settings` > `User authentication set up`から`App permissions`を`Read and write`に変更してください。

`App info`のURL設定は適当なもので構いません。

### 2. `compose.yml`作成
取得したAPIキーをセットし、`PASSWORD`を強力なものに変更してください。

必要に応じてポート番号を変更してください。

```yaml
services:
  tweet-server:
    image: kentaro1043/tweet-server
    ports:
      - "8080:8000"
    environment:
      TWIT_CONSUMER_KEY: cunsumer-key
      TWIT_CONSUMER_SECRET: consumer-secret
      TWIT_ACCESS_TOKEN: access-token
      TWIT_ACCESS_TOKEN_SECRET: access-token-secret
      PASSWORD: strong-password
```

### 3. Dockerコンテナの起動
`docker compose up -d`で実行します。

SSLを設定することを強く推奨します。[nginxproxy/nginx-proxy](https://hub.docker.com/r/nginxproxy/nginx-proxy)などを用いることができます。
