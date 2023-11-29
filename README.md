# HSBL-S101_Chameleon

<img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/e6fd9d8b-b2a0-480f-8673-4b478d5ed2fc"  width="320" alt="HSBL-S101_use">

HSBL-S101_Chameleonは、AtomS3に対してWebtoolを通じてUSB経由で画像データを送信し、表示・保存します。  
画面の回転値等も保存可能です。

> ※このプロジェクトは  
「Chameleon Key：シングルディスプレイキーボード」の機能制限版です  
HSBL-S101_Chameleon Keyは今後有料で配布する予定です。  
詳細は[製品ページ](https://sites.google.com/view/hsbl-industrial-hp/home/2023%E4%BD%9C%E5%93%81chameleon-key)をご覧ください。  
><img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/1e1bd703-e5ae-439e-a196-002bb3161693" width="320"  alt="HSBL-S100">  



---

## Webベースの設定ツール

<img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/55ecf563-8887-42aa-85d7-8503f43fce65" width="320" alt="HSBL-S101_WEBtools">

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
- (オプション:後日公開)ボトムLED
  
## 必要なライブラリ

- M5GFX
- FS
- SPIFFS
- Adafruit_NeoPixel
  
## 機能

- LEDの色を設定し、その色情報をSPIFFSに保存・読み込む機能
- 画面の回転値を設定し、その回転値をSPIFFSに保存・読み込む機能
- ピクセルデータをSPIFFSに保存・読み込む機能

