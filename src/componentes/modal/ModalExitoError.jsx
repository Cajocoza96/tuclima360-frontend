import React from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function ModalExitoError({ ciudad, mensaje, onCerrar, esError = false }) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="bg-white dark:bg-gray-800 
                                z-50 p-3 absolute
                                top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2
                                w-[80%] 2xs:w-[50%] lg:w-[40%] h-auto ">

                <div className="mx-auto w-full flex flex-col items-center gap-4 2xl:gap-8">
                    <div className="flex flex-col items-center gap-2 2xl:gap-6">

                        {/* Icono dinámico según el tipo de modal */}
                        {esError ? (
                            <HiXCircle className="text-8xl 2xl:text-10xl text-red-500"/>
                        ) : (
                            <HiCheckCircle className="text-8xl 2xl:text-10xl text-green-500"/>
                        )}
                        
                        <p className="text-center font-bold text-xs xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl
                                    text-black dark:text-white">
                            <span>{ciudad}</span>
                        </p>

                        <p className="text-center text-xs xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl
                                    text-black dark:text-white">
                            {mensaje}
                        </p>
                    </div>

                    {/* Botón con color dinámico */}
                    <button 
                        onClick={onCerrar}
                        className={`w-fit ${esError 
                            ? 'bg-red-600 active:bg-red-400' 
                            : 'bg-green-600 active:bg-green-400'
                        } text-center 
                                        font-bold text-xs xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl
                                    text-white cursor-pointer py-2 px-4 rounded`}>
                        Ok
                    </button>

                </div>
            </div>
        </div>
    );
}