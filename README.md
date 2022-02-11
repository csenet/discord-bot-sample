# Discord Sample Bot

## 概要

Seknot APIを用いたサンプルアプリです

Discordで話した文字数に応じたコインが配布され、コインをUser間で取引することが可能です

Disocrdサーバー内での活動量に応じたコインのステーキングで、サーバーの権限を決定したりなど色々と使えるかも?

Botの機能としては非常にシンプルなので、コインを使ったゲーム機能など色々と追加して遊んで見てください

## 利用方法
1. [Discord Deverloper Portal](https://discord.com/developers/applications)からAplicationを作成し、BotのTOKENを入手します

2. レポジトリをCloneして以下の`.env`ファイルを作成します

```
SERVICE_ID=<< Tokenが紐付いているServceのId >>
TOKEN_ADDRESS=<< 発行したTokenのAddress >>
CLIENT_ID=<< APIのclieent_id >>
CLIENT_SECRET=<< APIのcclient_secret >>
SYMBOL=<< TokenのSymbol >>

DB_USER=root
DB_PASS=password

DISCORD_TOKEN=<< Discord BotのToken >>
```

※DBのUserやPasswordは任意で適当なものに変更してください

3. `docker-compose build` を実行してServiceをBuildしてから、`docker-compose up`でサービスを開始します

`Bot Started!`と表示されれば正常に動作しています

なお、予めDockerやdocker-composeをインストールしておく必要があります

4. DiscordのServerへBotを追加して、オンラインになっていることを確認します

次のようなコマンドを実行すると実際に動作が確認できます

```
Usage:
!register - Walletを作成する
!address - 自分のAddressを確認する
!balance - 自分の残高を確認します
!send @to amount - @でメンションした相手にコインを送金します
!ping - pongします
!help - helpを表示する
```

## Overview

This is a sample application using Seknot API.

Coins are distributed based on the number of characters spoken in Discord, and the coins can be traded between users.

It can be used for various purposes, such as determining the authority of the server by staking coins based on the amount of activity in the Disocrd server.

The bot's function is very simple, so you can add various functions such as games using coins.

## How to use

1. create an Application from [Discord Deverloper Portal](https://discord.com/developers/applications), and get TOKEN of the Bot. 2.

2. clone the repository and create the following `.env` file

```
SERVICE_ID=<<Id of the Servce to which the Token is tied >>.
TOKEN_ADDRESS=<<Address of the issued Token >>
CLIENT_ID=<<< API's CLIENT_ID >>
CLIENT_SECRET=<<< API's cclient_secret >>
SYMBOL=<<Symbol in Token >>

DB_USER=root
DB_PASS=password

DISCORD_TOKEN=<<< Discord Bot's Token >>
```

Please change DB_USER and DB_PASS to whatever you like.

3. run `docker-compose build` to build the service, and then `docker-compose up` to start the service

If you see `Bot Started!`, the service works well.

Note that you need to install Docker and docker-compose beforehand.

4. Add Bot to Discord Server, and make sure it is online.

Run the following command to see it in action

```
Usage:
register - Create a Wallet
address - Check your address.
balance - Check your balance.
!send @to amount - Send coins to @mentions
!ping - pong
!help - Show help
```