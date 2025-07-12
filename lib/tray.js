// lib/tray.js
const { Tray, nativeImage, Menu } = require("electron");
const buildMenu = require("./menuBuilder");

function createTray(history, windowManager) {
    const iconPath = "/usr/share/icons/hicolor/512x512/apps/cli-tray.png";

    const trayIcon = nativeImage
        .createFromPath(iconPath)
        .resize({ width: 32, height: 32 });
    const tray = new Tray(trayIcon);
    tray.setToolTip("Clipboard History");

    // rebuild menu whenever history changes
    function updateMenu(items) {
        // stitch in the correct click handler
        const menu = buildMenu(items);
        menu.items?.forEach((item) => {
            if (item.click && item.accelerator?.match(/^\d/)) {
                const idx = parseInt(item.accelerator.slice(-1), 10) - 1;
                item.click = () => history.copyAt(idx);
            }
        });
        tray.setContextMenu(menu);
    }

    // initial menu
    updateMenu(history.getItems());

    // allow tray icon click to pop the native menu
    tray.on("click", () => tray.popUpContextMenu());

    // also update when polled:
    history.startPolling((items) => {
        updateMenu(items);
        // also push to your BrowserWindow if open:
        windowManager.sendHistory(items);
    });

    return tray;
}

module.exports = { createTray };
