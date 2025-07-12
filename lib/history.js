// lib/history.js
const { clipboard, Notification } = require("electron");

class History {
    constructor(maxItems = 10, pollInterval = 1000) {
        this.maxItems = maxItems;
        this.items = [];
        this.lastText = "";
        this.pollInterval = pollInterval;
        this.timer = null;
    }

    startPolling(onChange) {
        this.timer = setInterval(() => {
            const text = clipboard.readText();
            if (text && text !== this.lastText) {
                this.lastText = text;
                this.items.unshift(text);
                if (this.items.length > this.maxItems) this.items.pop();
                onChange(this.items);
            }
        }, this.pollInterval);
    }

    copyAt(idx) {
        console.log(`Re-copying item at index ${idx}`);
        console.log(`Item count: ${this.items}`);
        const text = this.items[idx];
        console.log(`Text: ${text}`);
        if (text) {
            clipboard.writeText(text);
            new Notification({
                title: "Clipboard",
                body: `Re-copied #${idx + 1}: "${text.slice(0, 30)}…"`,
            }).show();
        }
    }

    getItems() {
        return this.items.slice();
    }
}

module.exports = History;
