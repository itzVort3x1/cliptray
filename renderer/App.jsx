import React, { useState, useEffect } from "react";
const { ipcRenderer } = window.require("electron");

// Single history item (hover effect + click to copy)
function HistoryItem({ text, displayIndex, origIdx }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            style={{
                ...styles.item,
                ...(hover ? styles.itemHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => ipcRenderer.send("copy-item", origIdx)}
        >
            <span style={styles.number}>{displayIndex + 1}.</span>
            <span style={styles.txt}>{text.slice(0, 50)}…</span>
        </div>
    );
}

export default function App() {
    const [allItems, setAllItems] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        ipcRenderer.on("history-update", (_, items) => {
            setAllItems(items);
        });
        return () => {
            ipcRenderer.removeAllListeners("history-update");
        };
    }, []);

    // Build filtered list of {text, origIdx}
    const filteredItems = allItems
        .map((text, idx) => ({ text, origIdx: idx }))
        .filter((item) =>
            item.text.toLowerCase().includes(filter.toLowerCase())
        );

    return (
        <div style={styles.container}>
            <input
                autoFocus
                type="text"
                placeholder="Search clipboard history…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={styles.search}
            />

            <div style={styles.list}>
                {filteredItems.map(({ text, origIdx }, idx) => (
                    <HistoryItem
                        key={origIdx}
                        text={text}
                        displayIndex={idx}
                        origIdx={origIdx}
                    />
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: 550,
        height: "100%",
        padding: 12,
        boxSizing: "border-box",
        fontFamily: "sans-serif",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
    },
    search: {
        padding: "8px 12px",
        marginBottom: 10,
        fontSize: 14,
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.2)",
        outline: "none",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
    },
    list: {
        flex: 1,
        overflowY: "auto",
    },
    item: {
        display: "flex",
        alignItems: "center",
        padding: "6px 12px",
        cursor: "pointer",
        borderRadius: 6,
        marginBottom: 4,
        transition: "background 0.2s",
    },
    itemHover: {
        background: "rgba(255,255,255,0.4)",
    },
    number: {
        width: 24,
        textAlign: "right",
        marginRight: 8,
        color: "#444",
        fontSize: 13,
    },
    txt: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
};
