import React from "react";

export default function ValorValorValor({ valor1, valor2, valor3, className="", ...props }) {
    return (
        <div className="w-[95%]  mt-2 flex flex-row items-center justify-between">

            <div className={`text-xl md:text-2xl 2xl:text-4xl 
                            cursor-pointer${className}`} {...props}>
                {valor1}
            </div>

            <div className={`text-xl md:text-2xl 2xl:text-4xl 
                            ${className}`} {...props}>
                {valor2}
            </div>

            <div className={`text-xl md:text-2xl 2xl:text-4xl
                            cursor-pointer${className}`} {...props}>
                {valor3}
            </div>

        </div>
    );
}