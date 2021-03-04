import React from "react";

import "./Button.css";

const variants = {
    secondary: "app-button--secondary",
    delete: "app-button--delete",
};

const Button = ({ children, className, variant, ...rest }) => (
    <button
        className={["app-button", variant, className]
            .filter((x) => !!x)
            .join(" ")}
        {...rest}
    >
        {children}
    </button>
);

Button.variants = variants;
export default Button;
