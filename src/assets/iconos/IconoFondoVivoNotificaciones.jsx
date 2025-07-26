import React, { useState } from "react";
import { HiPhotograph, HiBell } from "react-icons/hi";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";

import Toast from "../../componentes/toast/Toast";

export default function IconoFondoVivoNotificaciones({ fondoVivo, notificacion }) {
    const { encendidoFondoVivo, encendidoNotificacion,
        toggleEncendidoNotificacion, toggleEncendidoFondoVivo } = useFonVivoFormHoraTemp();


    const [showToast4, setShowToast4] = useState(false);

    const handleToast = () => {
        setShowToast4(true);
        setTimeout(() => setShowToast4(false), 2500);
    }

    return (
        <>
            {fondoVivo && (
                <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center gap-2">
                        <HiPhotograph className="text-black dark:text-white 
                                            text-base md:text-xl lg:text-xl 
                                            xl:text-xl 2xl:text-3xl"/>

                        <p className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300">
                            Live background
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleEncendidoFondoVivo}>
                        {encendidoFondoVivo ? (
                            <MdToggleOn className="text-green-600 transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                        ) : (
                            <MdToggleOff className="text-black dark:text-white transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                        )}
                    </div>
                </div>
            )}

            {notificacion && (
                <div className="flex flex-row items-center gap-3">

                    <Toast show4={showToast4} message4="Not available" />

                    <div className="flex flex-row items-center gap-2">
                        <HiBell className="text-black dark:text-white 
                                            text-base md:text-xl lg:text-xl 
                                            xl:text-xl 2xl:text-3xl"/>

                        <p className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300">
                            Notifications
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleEncendidoNotificacion}>
                        {encendidoNotificacion ? (
                            <MdToggleOn onClick={handleToast} className="text-green-600 transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                        ) : (
                            <MdToggleOff onClick={handleToast} className="text-black dark:text-white transition duration-300
                                            w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9"/>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}