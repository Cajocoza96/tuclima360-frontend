import React from "react";

export default function BotonAccion({ onClick, nombre, className = "", ...props }) {
    return (
        <button
            className={`select-none p-2 text-base md:text-xl 2xl:text-3xl ${className}`} {...props}
            onClick={onClick}
            draggable="false"
            onMouseDown={(e) => e.preventDefault()}>
            {nombre}
        </button>
    );
}