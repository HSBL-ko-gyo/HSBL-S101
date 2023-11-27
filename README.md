# HSBL-S101_Chameleon

<img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/f426f360-683a-4c48-9f0b-9ebb9d87e18e" width="128" height="128" alt="HSBL-S101_LOGO">

HSBL-S101_Chameleonは、AtomS3に対して、フルカラーLEDの色や画面の回転値を制御し、  
画像データを表示・保存する機能を提供します。

> ※このプロジェクトは  
「Chameleon Key：シングルディスプレイキーボード」の機能制限版です  
HSBL-S101_Chameleon Keyは今後有料で配布する予定です。  
詳細は[製品ページ](https://sites.google.com/view/hsbl-industrial-hp/home/2023%E4%BD%9C%E5%93%81chameleon-key)をご覧ください。  
><img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/1e1bd703-e5ae-439e-a196-002bb3161693" width="600"  alt="HSBL-S100">  


---

## Webベースの設定ツール

<img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/55ecf563-8887-42aa-85d7-8503f43fce65" width="480" alt="HSBL-S101_WEBtools">

このプロジェクトには、Web設定ツールが含まれています。  
設定ツールURL: https://hsbl-ko-gyo.github.io/HSBL-S101/  

### 主な機能

- ATOMS3への接続
- 画像の送信
- 画面の回転設定
- ボトムLEDの色設定

設定はAtomS3の内部ストレージに保存され、電源を切っても保持されます。

---


## 必要なハードウェア

- AtomS3
  
## 必要なライブラリ

- M5GFX
- FS
- SPIFFS
- Adafruit_NeoPixel
  
## 機能

- LEDの色を設定し、その色情報をSPIFFSに保存・読み込む機能
- 画面の回転値を設定し、その回転値をSPIFFSに保存・読み込む機能
- ピクセルデータをSPIFFSに保存・読み込む機能

## ソースコードのビルドと書き込み
今後 ESP Web Tools等を利用し簡単に書き込みが出来るようにする予定です。

### Arduino IDEを使用する場合

1. Arduino IDEを開きます。
2. メニューから「ファイル」->「開く」を選択し、ダウンロードした.inoファイルを開きます。
3. 「ツール」->「ボード」から「AtomS3」を選択します。
4. 「ツール」->「ポート」からAtomS3が接続されているポートを選択します。
5. 「スケッチ」->「アップロード」を選択してプログラムをAtomS3に書き込みます。
   
### コンパイルされた.binファイルを書き込む場合

1. .binファイルをダウンロードします。
2. AtomS3をPCに接続し、AtomS3をブートローダーモードにします。
3. ESP32 Download Toolやesptoolなどのツールを使用して.binファイルをAtomS3に書き込みます。

注意: コンパイルされた.binファイルを書き込む場合、書き込みツールの設定やAtomS3のブートローダーモードへの切り替え方法など、具体的な手順は使用するツールやハードウェアにより異なります。詳細は各ツールやハードウェアの公式ドキュメンテーションを参照してください。
