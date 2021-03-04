import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

import "./Menu.css";

const Menu = () => {
    return (
        <ul className="app-menu">
            <li>
                <Link to="/">
                    <Button>Home</Button>
                </Link>
            </li>
            <li>
                <Link to="/new">
                    <Button variant={Button.variants.secondary}>Add new</Button>
                </Link>
            </li>
        </ul>
    );
};

export default Menu;
