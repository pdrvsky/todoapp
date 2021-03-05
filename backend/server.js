const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Declare app globals
const APP_PORT = 8080;

// Initialize the app
const app = express();
const todoRouter = express.Router();

// Declare middleware
app.use(bodyParser.json());
app.use(cors());

// Get all todos
todoRouter.route("/").get((_, response) => {
    response.status(200).json([]);
});

// Register the router
app.use("/todos", todoRouter);

// Start the app
app.listen(APP_PORT, () => {
    console.log(`Started server on port ${APP_PORT}...`);
});
