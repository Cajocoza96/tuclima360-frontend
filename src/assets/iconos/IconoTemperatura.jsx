import React from "react";
import { WiThermometer } from "react-icons/wi";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";

export default function IconoTemperatura() {
    const { encendidoTemperaturaModo, toggleEncendidoTemperaturaModo } = useFonVivoFormHoraTemp();

    return (
        <div className="flex flex-row items-center gap-3">

            <div className="flex flex-row items-center gap-2">
                <WiThermometer className="text-black dark:text-white 
                                            text-2xl md:text-3xl lg:text-3xl 
                                            xl:text-3xl 2xl:text-5xl"/>
                <div className="flex flex-col items-center">
                    <p className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300">
                        Temperature
                    </p>

                    {encendidoTemperaturaModo ? (
                        <p className="text-sm md:text-base lg:text-base xl:text-base 2xl:text-2xl 
                        text-black dark:text-gray-300">
                            <span translate="no">Celsius</span>
                        </p>
                    ) : (
                        <p className="normal-case text-sm md:text-base lg:text-base xl:text-base 2xl:text-2xl 
                            text-black dark:text-gray-300">
                            <span translate="no">Fahrenheit</span>
                        </p>
                    )}
                </div>

            </div>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleEncendidoTemperaturaModo}>
                {encendidoTemperaturaModo ? (
                    <button className="w-7 2xl:w-10 border border-black dark:border-white rounded-md
                                    flex flex-row items-center justify-center cursor-pointer">
                        <p className="text-center text-black dark:text-white
                                        text-xs sm:text-base lg:text-xl 2xl:text-3xl">
                            <span translate="no">°</span>
                        </p>
                        <p className="text-center text-black dark:text-white
                                        text-xs sm:text-base lg:text-xl 2xl:text-3xl">
                            <span translate="no">C</span>
                        </p>
                    </button>
                ) : (
                    <button className="w-7 2xl:w-10 border border-black dark:border-white rounded-md
                                    flex flex-row items-center justify-center cursor-pointer">
                        <p className="text-center text-black dark:text-white
                                        text-xs sm:text-base lg:text-xl 2xl:text-3xl">
                            <span translate="no">°</span>
                        </p>
                        <p className="text-center text-black dark:text-white
                                        text-xs sm:text-base lg:text-xl 2xl:text-3xl">
                            <span translate="no">F</span>
                        </p>
                    </button>
                )}

            </div>

        </div>
    );
}
