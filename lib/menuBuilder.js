// lib/menuBuilder.js
const { Menu } = require("electron");

function buildMenu(items) {
    // Only take up to 10 items
    const limitedItems = items.slice(0, 10);
    const template =
        limitedItems.length === 0
            ? [{ label: "No copies yet", enabled: false }]
            : limitedItems.map((text, idx) => {
                  const key = idx < 9 ? `${idx + 1}` : "0";
                  const preview =
                      text.length > 30
                          ? text.slice(0, 30).trimEnd() + "…"
                          : text;
                  return {
                      label: `${idx + 1}. ${preview}   ${
                          process.platform === "darwin" ? "⌘" : "Ctrl"
                      }+${key}`,
                      accelerator: `CommandOrControl+${key}`,
                      click: () => {}, // will be hooked up in tray.js
                  };
              });

    template.push(
        { type: "separator" },
        {
            label: "Quit",
            accelerator: "CommandOrControl+Q",
            role: "quit",
        }
    );

    return Menu.buildFromTemplate(template);
}

module.exports = buildMenu;
