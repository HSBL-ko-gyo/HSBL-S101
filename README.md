# HSBL-S101_Chameleon

<img src="https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/e6fd9d8b-b2a0-480f-8673-4b478d5ed2fc"  width="320" alt="HSBL-S101_use">

HSBL-S101_Chameleonは、AtomS3に対してWebtoolを通じてUSB経由で画像データを送信し、表示・保存します。  
画面の回転値等も保存可能です。

> ※このプロジェクトは  
「Chameleon Key：シングルディスプレイキーボード」の機能制限版です  
HSBL-S100_Chameleon Keyは今後有料で配布する予定です。  
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

## ファームウェア書き込み方法
[コチラから](https://github.com/HSBL-ko-gyo/HSBL-S101/tree/main/Firmware#%E3%83%95%E3%82%A1%E3%83%BC%E3%83%A0%E3%82%A6%E3%82%A7%E3%82%A2%E6%9B%B8%E3%81%8D%E8%BE%BC%E3%81%BF%E6%96%B9%E6%B3%95)


---

## 必要なハードウェア

- AtomS3
- (オプション)[HSBL-S100-01 RGB LED bottom for ATOM](https://github.com/HSBL-ko-gyo/HSBL-S100-01)
  
## ビルドに必要なライブラリ

- M5GFX
- FS
- SPIFFS
- Adafruit_NeoPixel
  

