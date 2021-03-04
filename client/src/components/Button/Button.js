import React from "react";

import "./Button.css";

const Button = ({ children, className, ...rest }) => (
    <button
        className={["app-button", className].filter((x) => !x).join(",")}
        {...rest}
    >
        {children}
    </button>
);

export default Button;
