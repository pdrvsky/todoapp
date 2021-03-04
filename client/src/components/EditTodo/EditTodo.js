import React, { useCallback, useEffect, useState } from "react";
import wretch from "wretch";
import { useParams } from "react-router-dom";

const EditTodo = () => {
    const [todo, setTodo] = useState(null);
    const { todoId } = useParams();

    const onChange = useCallback(({ target: { name, value } }) => {
        setTodo((todo) => {
            if (todo) {
                todo[name] = value;
            }
            return todo ? { ...todo } : null;
        });
    }, []);

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
                <label for="name">Name: </label>
                <input
                    name="name"
                    value={todo?.name || ""}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default EditTodo;
