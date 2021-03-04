import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Menu from "./components/Menu";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo/EditTodo";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app-header">
                    <h2 className="app-title">My Todo App</h2>
                    <Menu />
                </div>
                <div className="app-body">
                    <Switch>
                        <Route path="/" exact>
                            <TodoList />
                        </Route>
                        <Route path="/new" exact>
                            <EditTodo create />
                        </Route>
                        <Route path="/edit/:todoId" exact>
                            <EditTodo />
                        </Route>
                    </Switch>
                </div>
                <div className="app-footer">
                    <p>{new Date().getFullYear()} todo inc.</p>
                </div>
            </Router>
        );
    }
}
