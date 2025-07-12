const path = require("path");
const { app } = require("electron");
const History = require("./lib/history");
const TrayMgr = require("./lib/tray");
const WindowMgr = require("./lib/window");
const Shortcuts = require("./lib/shortcuts");

let history, tray, winManager;

app.whenReady().then(() => {
    history = new History(100, 1000);
    winManager = WindowMgr.createWindow();
    tray = TrayMgr.createTray(history, winManager);

    Shortcuts.register(history, winManager);
});

app.on("will-quit", () => {
    require("electron").globalShortcut.unregisterAll();
});
