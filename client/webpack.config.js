const path = require("path");

const config = {
    entry: ["react-hot-loader/patch", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    devServer: {
        contentBase: "./public",
        port: 3000,
    },
};

module.exports = config;
