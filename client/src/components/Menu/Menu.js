import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

const Menu = () => {
    return (
        <ul className="app-menu">
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
    );
};

export default Menu;
