import React, { useCallback, useEffect, useState } from "react";
import wretch from "wretch";
import { Link } from "react-router-dom";

import "./TodoList.css";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const onDelete = useCallback(
        (id) => {
            if (confirm("Are you sure?")) {
                wretch(`http://localhost:8080/todos/${id}`)
                    .delete()
                    .res()
                    .then(() => {
                        setTodos((todos) =>
                            todos.filter((item) => item?.id !== id)
                        );
                    })
                    .catch(() => alert("Something went wrong!"));
            }
        },
        [setTodos]
    );

    useEffect(() => {
        wretch("http://localhost:8080/todos").get().json().then(setTodos);
    }, []);

    return (
        <div className="todo-list">
            <table className="todo-list-table" cellSpacing="0">
                <thead>
                    <tr>
                        <th width="250">Name</th>
                        <th width="80">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo?.id}>
                            <td>{todo?.name}</td>
                            <td className="todo-list-actions">
                                <Link to={`/edit/${todo?.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => onDelete(todo?.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
