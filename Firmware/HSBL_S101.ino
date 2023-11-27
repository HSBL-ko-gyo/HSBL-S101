/*
 * HSBL_S101.ino
 * 
 * 作成者: ハシビロ工業
 * バージョン: 0.1.0
 */
#include <M5GFX.h>
#include <FS.h>
#include <SPIFFS.h>
#include <Adafruit_NeoPixel.h>

// ピンとLEDの数の定義
#define PIN 6
#define NUMPIXELS 1
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

// この変数はWEBから送られるLEDの色情報を保持します
String ledColorValue = "255,255,255,0";

// この変数は画面の回転値を保持します
int rotationValue = 2;

M5GFX gfx;
M5Canvas canvas(&gfx);

struct PixelData {
  int x;
  int y;
  int color;
};

PixelData pixelBuffer[128 * 128];
int pixelCount = 0;

const int buttonPin = 41;
int previousButtonState = HIGH;
String appCommand = "";  // この変数はWEBから送られるコマンドを保持します

// メッセージを表示する関数
void displayMessage(const char *message) {
  canvas.fillScreen(TFT_BLACK);
  canvas.setTextSize(2);
  canvas.setTextColor(TFT_WHITE, TFT_BLACK);

  String msg(message);
  int lineHeight = 20;  // 行の高さを設定します。適切な値に調整してください。
  int lineIndex = 0;
  int startPos = 0;
  int endPos = msg.indexOf('\n');

  while (endPos != -1) {
    String line = msg.substring(startPos, endPos);
    canvas.drawString(line.c_str(), canvas.width() / 2 - 50, canvas.height() / 2 - 10 + lineIndex * lineHeight, 1);
    startPos = endPos + 1;
    endPos = msg.indexOf('\n', startPos);
    lineIndex++;
  }

  String lastLine = msg.substring(startPos);
  canvas.drawString(lastLine.c_str(), canvas.width() / 2 - 50, canvas.height() / 2 - 10 + lineIndex * lineHeight, 1);

  canvas.pushSprite(0, 0);
}

// ピクセルデータをSPIFFSに保存する関数
void savePixelsToSPIFFS() {
  File file = SPIFFS.open("/pixelData.txt", "w");
  if (!file) {
    Serial.println("Failed to open file");
    return;
  }

  for (int i = 0; i < pixelCount; i++) {
    file.printf("%d,%d,%d\n", pixelBuffer[i].x, pixelBuffer[i].y, pixelBuffer[i].color);
  }
  file.flush();
  file.close();
}

// SPIFFSからピクセルデータを読み込む関数
void loadPixelsFromSPIFFS() {
  File file = SPIFFS.open("/pixelData.txt", "r");
  if (!file) {
    Serial.println("Failed to open file");
    displayMessage("No pixel data to read!");
    delay(1000);
    gfx.fillScreen(TFT_BLACK);
    return;
  }

  bool dataExists = false;

  while (file.available()) {
    String line = file.readStringUntil('\n');
    int comma1 = line.indexOf(',');
    int comma2 = line.lastIndexOf(',');

    if (comma1 == -1 || comma2 == -1 || comma1 == comma2) {
      continue;
    }

    dataExists = true;
    int x = line.substring(0, comma1).toInt();
    int y = line.substring(comma1 + 1, comma2).toInt();
    int color = line.substring(comma2 + 1).toInt();
    canvas.drawPixel(x, y, color);
  }

  if (!dataExists) {
    displayMessage("No valid pixel data found!");
    delay(1000);
    gfx.fillScreen(TFT_BLACK);
  } else {
    canvas.pushSprite(0, 0);
  }

  file.close();
}

// LEDの色を設定する関数
void setLedColor() {
  int comma1 = ledColorValue.indexOf(',');
  int comma2 = ledColorValue.indexOf(',', comma1 + 1);
  int comma3 = ledColorValue.indexOf(',', comma2 + 1);

  int r = ledColorValue.substring(0, comma1).toInt();
  int g = ledColorValue.substring(comma1 + 1, comma2).toInt();
  int b = ledColorValue.substring(comma2 + 1, comma3).toInt();
  int brightness = ledColorValue.substring(comma3 + 1).toInt();

  strip.setBrightness(brightness);
  strip.setPixelColor(0, strip.Color(r, g, b));
}

// この関数はLEDの色をSPIFFSに保存します
void saveLedColorToSPIFFS() {
  File file = SPIFFS.open("/ledColor.txt", FILE_WRITE);
  if (!file) {
    Serial.println("Failed to open LED color file for writing");
    return;
  }
  file.println(ledColorValue);
  file.close();
}

// この関数はLEDの色をSPIFFSから読み込みます
void loadLedColorFromSPIFFS() {
  File file = SPIFFS.open("/ledColor.txt", FILE_READ);
  if (!file) {
    Serial.println("Failed to open LED color file on boot");
    return;
  }
  ledColorValue = file.readStringUntil('\n');
  file.close();
  setLedColor();
}

// この関数は回転値をSPIFFSに保存します
void saveRotationValueToSPIFFS() {
  File file = SPIFFS.open("/rotationValue.txt", FILE_WRITE);
  if (!file) {
    Serial.println("Failed to open rotation value file for writing");
    return;
  }

  // 文字列として保存
  file.println(rotationValue);
  file.close();
}

// この関数は回転値をSPIFFSに保存します
void loadRotationValueFromSPIFFS() {
  File file = SPIFFS.open("/rotationValue.txt", FILE_READ);
  if (!file) {
    Serial.println("Failed to open rotation value file on boot");
    return;
  }
  rotationValue = file.readStringUntil('\n').toInt();
  file.close();
}

void setup(void) {
  pinMode(buttonPin, INPUT_PULLUP);

  gfx.begin();
  gfx.setRotation(0);
  gfx.fillScreen(TFT_BLACK);
  canvas.createSprite(gfx.width(), gfx.height());
  Serial.begin(115200);

  if (!SPIFFS.begin(true)) {
    Serial.println("SPIFFS initialization failed");
    return;
  }

  displayMessage("Loading...\nHSBL-S101\nV0.1.0"); //バージョン

  // SPIFFSからピクセルデータをロード
  loadPixelsFromSPIFFS();

  // NeoPixelの初期化
  strip.begin();
  // LEDの色情報をロード
  loadLedColorFromSPIFFS();
  strip.show();

  // 画面の回転値をSPIFFSからロード
  loadRotationValueFromSPIFFS();
  // 画面の表示向きを設定
  gfx.setRotation(rotationValue);
  canvas.pushSprite(0, 0);
}

void loop(void) {
  if (Serial.available()) {
    String receivedString = Serial.readStringUntil('\n');
    // コマンドデータの場合
    if (receivedString.startsWith("CMD:")) {
      // App Commandを受け取る
      appCommand = receivedString.substring(4);

      // LEDの色を更新する場合のコマンド
      if (appCommand.startsWith("SETLED:")) {
        ledColorValue = appCommand.substring(7);
        setLedColor();
        saveLedColorToSPIFFS();
        strip.show();
      }
      // 画面の回転値を更新する場合のコマンド
      if (appCommand.startsWith("SETROT:")) {
        rotationValue = appCommand.substring(7).toInt();
        gfx.setRotation(rotationValue);
        saveRotationValueToSPIFFS();
        canvas.pushSprite(0, 0);
      }

    }
    // 画像データの場合
    else {
      // トークンを取得
      char *token = strtok((char *)receivedString.c_str(), ",");
      // トークンがNULLでなく、ピクセルカウントが128 * 128未満の場合、ループを続ける
      while (token != NULL && pixelCount < 128 * 128) {
        // x座標を取得
        pixelBuffer[pixelCount].x = atoi(token);
        token = strtok(NULL, ",");

        // y座標を取得
        pixelBuffer[pixelCount].y = atoi(token);
        token = strtok(NULL, ",");

        // 色を取得
        pixelBuffer[pixelCount].color = atoi(token);
        token = strtok(NULL, ",");

        // ピクセルを描画
        canvas.drawPixel(pixelBuffer[pixelCount].x, pixelBuffer[pixelCount].y, pixelBuffer[pixelCount].color);
        pixelCount++;
      }

      // スプライトをプッシュ
      canvas.pushSprite(0, 0);

      // ピクセルカウントが128 * 128以上の場合
      if (pixelCount >= 128 * 128) {
        // メッセージを表示
        displayMessage("Saving...");
        // ピクセルをSPIFFSに保存
        savePixelsToSPIFFS();
        // 画面をクリア
        canvas.fillScreen(TFT_BLACK);
        // ピクセルを描画
        for (int i = 0; i < pixelCount; i++) {
          canvas.drawPixel(pixelBuffer[i].x, pixelBuffer[i].y, pixelBuffer[i].color);
        }
        // スプライトをプッシュ
        canvas.pushSprite(0, 0);

        // バッファをクリア
        pixelCount = 0;
        memset(pixelBuffer, 0, sizeof(pixelBuffer));
      }
    }
  }
  delay(1);
}
