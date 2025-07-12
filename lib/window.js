// lib/window.js
const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win = null;

function createWindow(maxItems = 10) {
    win = new BrowserWindow({
        width: 550,
        height: 400,
        show: false,
        frame: false,
        alwaysOnTop: true,
        center: true,
        transparent: true,
        backgroundColor: "#00000000", // transparent
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });

    // load minimal HTML + renderer script that listens on 'history-update'
    win.loadFile(path.join(__dirname, "..", "renderer", "index.html"));

    // hide when losing focus
    win.on("blur", () => win.hide());

    win.webContents.on("before-input-event", (event, input) => {
        // input.type is "keyDown" or "keyUp"
        // input.key is the key name, e.g. "Escape", "ArrowUp", "1", etc.
        // input.control, input.alt, input.shift, input.meta are booleans
        if (input.type === "keyDown" && input.key === "Escape") {
            win.hide();
            event.preventDefault(); // swallow it
        }
    });

    // Uncomment to open dev tools
    // win.webContents.openDevTools({ mode: "right" });

    return {
        show: () => win.show(),
        hide: () => win.hide(),
        isVisible: () => win && win.isVisible(),
        sendHistory: (items) => {
            if (win.webContents.isLoading()) {
                win.webContents.once("did-finish-load", () => {
                    win.webContents.send("history-update", items);
                });
            } else {
                win.webContents.send("history-update", items);
            }
        },
    };
}

// handle clicks from the renderer to re-copy
ipcMain.on("copy-item", (e, idx) => {
    // we'll wire the actual copyAt from main
    e.sender.send("invoke-copy", idx);
});

module.exports = { createWindow };
