const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ConnectionManager } = require("typeorm");

const TodoEntity = require("./todo.entity");

// Declare app globals
const APP_PORT = 8080;

// Initialize the app
const app = express();
const todoRouter = express.Router();
const connectionManager = new ConnectionManager();
const databaseConnection = connectionManager.create({
    host: "localhost",
    username: "admin",
    password: "password",
    database: "todos",
    type: "postgres",
    entities: [TodoEntity],
    synchronize: true,
});

// Declare middleware
app.use(bodyParser.json());
app.use(cors());

// Get all todos
todoRouter.route("/").get((_, response) => {
    const todoRepository = databaseConnection.getRepository(TodoEntity);
    todoRepository
        .find()
        .then((todos) => {
            response.status(200).json(todos);
        })
        .catch((error) => {
            console.error(
                "There was an error while getting todos from db",
                error
            );
            response.status(500);
        });
});

// Get todo by id
todoRouter.route("/:id").get((request, response) => {
    const todoId = Number(request.params.id);
    if (Number.isNaN(todoId)) {
        return response.status(400).json();
    }

    const todoRepository = databaseConnection.getRepository(TodoEntity);
    todoRepository
        .findOne(todoId)
        .then((todo) => {
            if (!todo) {
                return response.status(404).json();
            }
            response.status(200).json(todo);
        })
        .catch((error) => {
            console.error(
                `There was an error while getting todo with id: ${request.params.id} from db`,
                error
            );
            response.status(500).json();
        });
});

// Create new todo
todoRouter.route("/").post((request, response) => {
    const todoName = request.body.name;
    if (!todoName) {
        return response.status(400).json();
    }

    const todoRepository = databaseConnection.getRepository(TodoEntity);
    todoRepository
        .insert({ name: todoName })
        .then((result) => {
            response.status(200).json(result.identifiers[0]);
        })
        .catch((error) => {
            console.error(
                "There was an error while trying to insert new todo!",
                error
            );
            response.status(500).json();
        });
});

// Update a todo
todoRouter.route("/:id").put((request, response) => {
    const todoId = Number(request.params.id);
    const todoName = request.body.name;
    if (!todoName || Number.isNaN(todoId)) {
        return response.status(400).json();
    }

    const todoRepository = databaseConnection.getRepository(TodoEntity);
    todoRepository
        .findOne(todoId)
        .then((todo) => {
            if (!todo) {
                return response.status(404).json();
            }
            todo.name = todoName;
            todoRepository
                .save(todo)
                .then((todo) => {
                    return response.status(200).json(todo);
                })
                .catch((error) => {
                    console.error(
                        `There was an error while trying to update a todo with id: ${todoId}!`,
                        error
                    );
                    response.status(500).json();
                });
        })
        .catch((error) => {
            console.error(
                "There was an error while trying to update a todo!",
                error
            );
            response.status(500).json();
        });
});

// Delete a todo
todoRouter.route("/:id").delete((request, response) => {
    const todoId = Number(request.params.id);
    if (Number.isNaN(todoId)) {
        return response.status(400).json();
    }

    const todoRepository = databaseConnection.getRepository(TodoEntity);
    todoRepository
        .findOne(todoId)
        .then((todo) => {
            if (!todo) {
                return response.status(404).json();
            }
            todoRepository
                .delete(todo)
                .then((result) => {
                    return response.status(200).json(result.affected);
                })
                .catch((error) => {
                    console.error(
                        `There was an error while trying to delete a todo with id: ${todoId}!`,
                        error
                    );
                    response.status(500).json();
                });
        })
        .catch((error) => {
            console.error(
                "There was an error while trying to delete new todo!",
                error
            );
            response.status(500).json();
        });
});

// Register the router
app.use("/todos", todoRouter);

// Start the app
app.listen(APP_PORT, () => {
    console.log(`Started server on port ${APP_PORT}...`);
    databaseConnection
        .connect()
        .then(() => {
            console.log("Successfully connected to database!");
        })
        .catch((error) => {
            console.error("There was an error connecting to database", error);
        });
});
