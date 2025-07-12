const path = require("path");

module.exports = {
    mode: "development",
    entry: "./renderer/index.jsx",
    output: {
        path: path.resolve(__dirname, "renderer"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    target: "electron-renderer",
};
