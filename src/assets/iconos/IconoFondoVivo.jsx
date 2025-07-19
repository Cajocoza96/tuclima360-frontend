import React from "react";
import { HiPhotograph } from "react-icons/hi";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";

export default function IconoFondoVivo() {
    const { encendidoFondoVivo, toggleEncendidoFondoVivo } = useFonVivoFormHoraTemp();

    return (
        <div className="flex flex-row items-center gap-3">

            <div className="flex flex-row items-center gap-2">
                <HiPhotograph className="text-black dark:text-white 
                                            text-base md:text-xl lg:text-xl 
                                            xl:text-xl 2xl:text-3xl"/>

                <p className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300">
                    Live Background
                </p>
            </div>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleEncendidoFondoVivo}>
                {encendidoFondoVivo ? (
                    <MdToggleOn className="text-green-600 transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                ):(
                    <MdToggleOff className="text-black dark:text-white transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                )}

            </div>

        </div>
    );
}