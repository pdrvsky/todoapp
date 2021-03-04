import React from "react";

const Input = (props) => (
    <input
        {...props}
        style={{
            borderRadius: 4,
            border: "1px solid var(--foreground)",
            padding: "4px 8px",
        }}
    />
);

export default Input;
