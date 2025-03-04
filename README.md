# ChatFlan_chan :Forked from pixiv/ChatVRM
+ A modified model with new features which can chat with Flandre
+ フランちゃんとチャットできる新機能を備えた改良chatVRMです
+ 和芙蘭聊天的愉快chatVRM改良版本
### Chat Flanchan ⇨ [Play Here!](https://ratadune.github.io/ChatFlan_chan/))
<img decoding="async" src="https://ratadune.github.io/ratadunemain.io/ogp.png" width="100%">

---
# New Features新機能
+ 【JP】
    - [x] 自動チャットログ削除ボタン。（最新のチャットログ25件のみを保持し、GPTの応答不良を防止します）
    - [x] 全ログ削除ボタン。
    - [x] アンドゥボタン。（あなたとGPTから1つずつ、前の2つのメッセージを削除します）
    - [x] 日本語/中国語音声認識用のスイッチボタン。
    - [x] Enterキーでメッセージを送信する、Shfitキーでテキストボックスに自動フォーカスする。
    - [x] 私は作ったフランちゃんがデフォルトモデルに。
+ 【EN】
    - [x] Undo button (deletes the previous 2 messages, 1 from you and 1 from GPT).
    - [x] Auto chatlog delete button (keeps only the 25 newest chatlogs to prevent GPT from not responding).
    - [x] Delete all logs button.
    - [x] Switch button for Japanese/Chinese speech recognition.
    - [x] Press Enter key to send message and press Shfit key to auto focus on textbox.
    - [x] Using Flandre model in default which made by me.
+ 【CH】
    - [x] 撤消按鈕（刪除前面的兩條消息，一條是你發送的，一條是GPT發送的）。
    - [x] 自動刪除聊天日誌按鈕（僅保留最新的25條聊天日誌，以防止GPT無法響應）。
    - [x] 刪除所有日誌按鈕。
    - [x] 日語/中文語音識別切換按鈕。
    - [x] 按Enter鍵發送消息，按Shift鍵自動聚焦在文字框上。
    - [x] 默認使用我創建的芙蘭模型。
---
ChatVRMはブラウザで簡単に3Dキャラクターと会話ができるデモアプリケーションです。
VRMファイルをインポートしてキャラクターに合わせた声の調整や、感情表現を含んだ返答文の生成などを行うことができます。

ChatVRMの各機能は主に以下の技術を使用しています。

- ユーザーの音声の認識
    - [Web Speech API(SpeechRecognition)](https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition)
- 返答文の生成
    - [ChatGPT API](https://platform.openai.com/docs/api-reference/chat)
- 読み上げ音声の生成
    - [Koeiro API](http://koeiromap.rinna.jp/)
- 3Dキャラクターの表示
    - [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)


## デモ

GitHub Pagesでデモを公開しています。

[https://pixiv.github.io/ChatVRM](https://pixiv.github.io/ChatVRM)


## 実行
ローカル環境で実行する場合はこのリポジトリをクローンするか、ダウンロードしてください。

```bash
git clone git@github.com:pixiv/ChatVRM.git
```

必要なパッケージをインストールしてください。
```bash
npm install
```

パッケージのインストールが完了した後、以下のコマンドで開発用のWebサーバーを起動します。
```bash
npm run dev
```

実行後、以下のURLにアクセスして動作を確認して下さい。

[http://localhost:3000](http://localhost:3000) 


---

## ChatGPT API

ChatVRMでは返答文の生成にChatGPT APIを使用しています。

ChatGPT APIの仕様や利用規約については以下のリンクや公式サイトをご確認ください。

- [https://platform.openai.com/docs/api-reference/chat](https://platform.openai.com/docs/api-reference/chat)
- [https://openai.com/policies/api-data-usage-policies](https://openai.com/policies/api-data-usage-policies)


## Koeiro API
ChatVRMでは返答文の音声読み上げにKoeiro APIを使用しています。

Koeiro APIの仕様や利用規約については以下のリンクや公式サイトをご確認ください。

- [http://koeiromap.rinna.jp/](http://koeiromap.rinna.jp/)
