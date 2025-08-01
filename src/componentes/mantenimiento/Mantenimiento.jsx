import React from "react";
import paginaEnMantenimiento1 from "/assets/img/mantenimiento/paginaEnMantenimiento1.webp";

export default function Mantenimiento() {
    return (
        <div className="w-full min-h-[100svh] flex flex-col items-center">
            <div className="w-[95%] min-h-[100svh] overflow-hidden text-center
                            flex flex-col justify-around items-center">

                <p className="font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-blue-500 to-green-400
                        text-3xl lg:text-4xl 2xl:text-6xl">
                    <span translate="no">TuClima360</span>
                </p>

                <p className="text-center text-xl lg:text-2xl 2xl:text-4xl text-black">
                    This page is currently under maintenance
                </p>

                <div className="w-60 2xs:w-50 lg:w-70 2xl:w-100 overflow-hidden">
                    <img src={paginaEnMantenimiento1} alt="mantenimiento"/>
                </div>

                <p className="text-center text-xl lg:text-2xl 2xl:text-4xl text-black">
                    We’ll be back shortly. Thank you for your patience.
                </p>
            </div>

        </div>
    );
}