import React from "react";
import { HiClock } from "react-icons/hi";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useFonVivoFormHoraTemp} from "../../context/FonVivoFormHoraTempContext";

export default function IconoFormatoHoras() {
    const { encendidoFormatoHora, toggleEncendidoFormatoHora } = useFonVivoFormHoraTemp();

    return (
        <div className="flex flex-row items-center gap-3">

            <div className="flex flex-row items-center gap-2">
                <HiClock className="text-black dark:text-white 
                                            text-base md:text-xl lg:text-xl 
                                            xl:text-xl 2xl:text-3xl"/>
                <div className="flex flex-col items-center">
                    <p className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300">
                        24 Hours Format
                    </p>

                    {encendidoFormatoHora ? (
                        <p className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-2xl 
                        text-black dark:text-gray-300">
                            Example<span translate="no"> 15:00</span>
                        </p>
                    ) : (
                        <p className="normal-case text-sm md:text-base lg:text-base xl:text-base 2xl:text-2xl 
                            text-black dark:text-gray-300">
                            Example<span translate="no"> 3:00 p.m</span>
                        </p>
                    )}
                </div>

            </div>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleEncendidoFormatoHora}>
                {encendidoFormatoHora ? (
                    <MdToggleOn className="text-green-600 transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                ) : (
                    <MdToggleOff className="text-black dark:text-white transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                )}

            </div>

        </div>
    );
}
