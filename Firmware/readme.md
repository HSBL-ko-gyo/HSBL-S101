## filelist

**Japanese:**
1. **HSBL_S100**
   - 説明: HSBL_S101プロジェクトのメインArduinoスケッチファイル
     
**English:**
1. **HSBL_S100**
   - Description: This is the main Arduino sketch file for the HSBL_S101 project.

## ファームウェア書き込み方法
### ・[設定WEBツール内より(ESP-web-tool)](https://hsbl-ko-gyo.github.io/HSBL-S101/fw-tools/)
画面の指示に従ってWINPCからchorome系のブラウザより書き込みを行ってください。

途中、「Erase device」のチェックボックスは  
チェックを入れると本体メモリの情報(すでに書き込んだ画像等)  
を消してファームウェアを書き込みます。  

### ・[M5Burner](https://docs.m5stack.com/en/download)
公開中です。 ATOMS3の欄で「HSBL-S101」と検索し書き込みを行ってください。

![image](https://github.com/HSBL-ko-gyo/HSBL-S101/assets/128065816/8f3c08dc-ccaa-4dad-96e0-bd8c87d7ed75)


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
