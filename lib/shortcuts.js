// lib/shortcuts.js
const { globalShortcut } = require("electron");

function register(history, windowManager) {
    // re-copy shortcuts
    for (let i = 0; i < Math.min(10, history.maxItems); i++) {
        const key = i < 9 ? `${i + 1}` : "0";
        globalShortcut.register(`CommandOrControl+${key}`, () => {
            history.copyAt(i);
        });
    }

    // toggle the BrowserWindow
    globalShortcut.register("CommandOrControl+Alt+V", () => {
        if (windowManager.isVisible()) windowManager.hide();
        else windowManager.show();
    });
}

module.exports = { register };
