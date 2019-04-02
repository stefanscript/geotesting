import React from "react";

export function Check({title, passed}) {
    const className = passed ? "ok" : "not ok";
    return <code className={className}>{title}</code>
}