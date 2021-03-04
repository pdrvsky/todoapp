import React, { useCallback, useEffect, useState } from "react";
import wretch from "wretch";
import { useHistory, useParams } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

import "./EditTodo.css";

const EditTodo = ({ create }) => {
    const history = useHistory();
    const { todoId } = useParams();
    const [todo, setTodo] = useState({});

    const onChange = useCallback(({ target: { name, value } }) => {
        setTodo((todo) => {
            if (todo) {
                todo[name] = value;
            }
            return todo ? { ...todo } : {};
        });
    }, []);

    const onSave = useCallback(() => {
        if (!todoId && !create) return;
        if (!create) {
            wretch(`http://localhost:8080/todos/${todoId}`)
                .put(todo)
                .json()
                .then(() => history.push("/"))
                .catch(() => alert("There was an error while saving todo!"));
        } else {
            wretch("http://localhost:8080/todos")
                .post(todo)
                .json()
                .then(() => history.push("/"))
                .catch(() => alert("There was an error while saving todo!"));
        }
    }, [todo]);

    useEffect(() => {
        if (!todoId) return;
        wretch(`http://localhost:8080/todos/${todoId}`)
            .get()
            .json()
            .then(setTodo);
    }, [todoId]);

    return (
        <div className="app-edit-todo">
            <h2>Edit Todo</h2>
            <div>
                <label htmlFor="name" className="app-edit-todo__label">
                    Name:
                </label>
                <Input
                    name="name"
                    value={todo?.name || ""}
                    onChange={onChange}
                />
            </div>
            <Button className="app-edit-todo__save" onClick={onSave}>
                Save
            </Button>
        </div>
    );
};

export default EditTodo;
