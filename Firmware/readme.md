## filelist

**Japanese:**
1. **build/m5stack.esp32.m5stack-atoms3**
   - 説明: M5Stack ESP32用のビルド設定またはコンパイルされたバイナリが含まれるディレクトリで、M5Stack AtomS3モデル向けに最適化されています。

2. **HSBL_S101.ino**（ファイル）
   - 説明: HSBL_S101プロジェクトのメインArduinoスケッチファイル
     
**English:**
1. **build/m5stack.esp32.m5stack-atoms3**
   - Description: This directory contains build configurations or compiled binaries for the M5Stack ESP32, specifically optimized for the M5Stack AtomS3 model.

2. **HSBL_S101.ino** (File)
   - Description: This is the main Arduino sketch file for the HSBL_S101 project.

## ファームウェア書き込み方法
今後 ESP Web Tools等を利用し簡単に書き込みが出来るようにする予定です。

### [M5Burner](https://docs.m5stack.com/en/download#:~:text=UIFLOW%20FIRMWARE%20BURNING%20TOOL)を使用する場合
公開中です。 ATOMS3の欄で「HSBL-S101」と検索し書き込みを行ってください。

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
