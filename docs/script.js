let currentPort;
let progressTimeout;

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function rgb888ToRgb565(r, g, b) {
        let red = r >> 3;
        let green = g >> 2;
        let blue = b >> 3;
        return (red << 11) | (green << 5) | blue;
    }

    document.getElementById('connectButton').addEventListener('click', async () => {
        try {
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
            currentPort = port;
            // 以下のボタンを接続時に有効にします
            document.getElementById('sendButton').disabled = false;
            document.getElementById('bottomLedColor').disabled = false;
            document.getElementById('setBottomLedColor').disabled = false;
            document.getElementById('setScreenRotation').disabled = false;
        } catch (e) {
            console.error("Failed to connect:", e);
        }
    });

    const PIXELS_PER_PACKET = 10;

    function resetProgressTimeout() {
        clearTimeout(progressTimeout);
        progressTimeout = setTimeout(() => {
            console.error("Progress was not updated for a period of time.");
            document.getElementById('progressMessage').textContent = "0%";
            document.getElementById('statusMessage').textContent = "Reset Send";
            processedPixels = 0; // 進行状況をリセット
            // ここでエラー処理を行う
        }, 5000); // 5秒間進行状況が更新されなかったらエラーとする
    }

    function updateProgress(processedPixels, totalPixels) {
        let progress = (processedPixels / totalPixels) * 100;
        document.getElementById('progressMessage').textContent = `${progress.toFixed(2)}%`;
        resetProgressTimeout(); // タイマーをリセット
    }

    document.getElementById('sendButton').addEventListener('click', async () => {
        const imageInput = document.getElementById('imageInput');
        const file = imageInput.files[0];
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        let totalPixels = 128 * 128;
        let processedPixels = 0; // 進捗状況のリセット
        let packetDataStr = ''; // 送信データの初期化

        resetProgressTimeout(); // 進捗タイムアウトのリセット

        img.onload = async function () {
            try {
                ctx.drawImage(img, 0, 0, 128, 128);
                const imgData = ctx.getImageData(0, 0, 128, 128);
                const writer = currentPort.writable.getWriter();

                for (let y = 0; y < 128; y++) {
                    for (let x = 0; x < 128; x++) {
                        const idx = (y * 128 + x) * 4;
                        const r = imgData.data[idx];
                        const g = imgData.data[idx + 1];
                        const b = imgData.data[idx + 2];
                        const rgb565Value = rgb888ToRgb565(r, g, b);
                        packetDataStr += `${x},${y},${rgb565Value},`;

                        if (packetDataStr.split(',').length / 3 >= PIXELS_PER_PACKET) {
                            packetDataStr += '\n';
                            const packetDataUint8Array = new TextEncoder().encode(packetDataStr);
                            await writer.write(packetDataUint8Array);
                            await sleep(10);
                            packetDataStr = '';
                        }

                        processedPixels++;
                        updateProgress(processedPixels, totalPixels);
                    }
                }

                if (packetDataStr.length > 0) {
                    packetDataStr += '\n';
                    const packetDataUint8Array = new TextEncoder().encode(packetDataStr);
                    await writer.write(packetDataUint8Array);
                }

                writer.releaseLock(); // リソースの解放
                document.getElementById('statusMessage').textContent = "Send Complete";
            } catch (error) {
                console.error("Send error:", error);
                document.getElementById('progressMessage').textContent = "0%";
                document.getElementById('statusMessage').textContent = "Send error";
                processedPixels = 0; // 進行状況をリセット
                // 必要に応じて他のUI要素をリセット
                if(writer) writer.releaseLock(); // エラー発生時にもリソースを解放
            }
        };

        img.src = URL.createObjectURL(file);
    });





    // 底面LEDの色を設定するイベントリスナーを追加
    document.getElementById('setBottomLedColor').addEventListener('click', async () => {
        const bottomLedColorValue = document.getElementById('bottomLedColor').value;
        if (bottomLedColorValue) {
            const writer = currentPort.writable.getWriter();
            const dataStr = `CMD:SETLED:${bottomLedColorValue}\n`;
            const dataUint8Array = new TextEncoder().encode(dataStr);
            await writer.write(dataUint8Array);
            await sleep(10);
            writer.releaseLock();
            document.getElementById('statusMessage').textContent = "Bottom LED color set";
        }
    });

    // 画面の回転を設定するイベントリスナーを追加
    document.getElementById('setScreenRotation').addEventListener('click', async () => {
        const rotationEls = document.getElementsByName('rotation');
        let selectedRotation;
        for (const el of rotationEls) {
            if (el.checked) {
                selectedRotation = el.value;
                break;
            }
        }

        if (selectedRotation !== undefined) {
            const writer = currentPort.writable.getWriter();
            const dataStr = `CMD:SETROT:${selectedRotation}\n`;
            const dataUint8Array = new TextEncoder().encode(dataStr);
            await writer.write(dataUint8Array);
            await sleep(10);
            writer.releaseLock();
            document.getElementById('statusMessage').textContent = "Screen rotation set.";
        }
    });

    document.getElementById('redSlider').addEventListener('input', updateColorValue);
    document.getElementById('greenSlider').addEventListener('input', updateColorValue);
    document.getElementById('blueSlider').addEventListener('input', updateColorValue);
    document.getElementById('brightnessSlider').addEventListener('input', updateColorValue);

    document.querySelectorAll('.color-preset').forEach((button) => {
        button.addEventListener('click', (event) => {
            const color = event.target.dataset.color.split(',');
            document.getElementById('redSlider').value = color[0];
            document.getElementById('greenSlider').value = color[1];
            document.getElementById('blueSlider').value = color[2];

            updateColorValue();
        });
    });

    document.getElementById('bottomLedColor').addEventListener('input', function () {
        const colorValue = this.value.split(',');
        const red = colorValue[0];
        const green = colorValue[1];
        const blue = colorValue[2];
        const brightness = colorValue[3];

        const colorLayer = document.getElementById('colorLayer');
        const brightnessLayer = document.getElementById('brightnessLayer');
        colorLayer.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        brightnessLayer.style.opacity = 1 - Math.pow(brightness / 255, 0.3);
    });

    function updateColorValue() {
        const red = document.getElementById('redSlider').value;
        const green = document.getElementById('greenSlider').value;
        const blue = document.getElementById('blueSlider').value;
        let brightness = document.getElementById('brightnessSlider').value;

        // Round brightness to the nearest value in brightnessValues
        const brightnessValues = [0, 2, 16, 32, 64, 128, 192, 255];
        const closestBrightness = brightnessValues.reduce((a, b) => {
            return Math.abs(b - brightness) < Math.abs(a - brightness) ? b : a;
        });

        // Set the slider value to the closest brightness
        document.getElementById('brightnessSlider').value = closestBrightness;

        document.getElementById('bottomLedColor').value = `${red},${green},${blue},${closestBrightness}`;

        // Update color preview
        const colorLayer = document.getElementById('colorLayer');
        const brightnessLayer = document.getElementById('brightnessLayer');
        colorLayer.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        brightnessLayer.style.opacity = 1 - Math.pow(closestBrightness / 255, 0.3);
    }

    window.onload = updateColorValue;
