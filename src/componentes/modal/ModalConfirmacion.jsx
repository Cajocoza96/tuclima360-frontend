import React from "react";
import infoModal from "../../data/infoModal.json";

export default function ModalConfirmacion({ciudad, mensaje, onCancelar, onAceptar}) {

    const infoDelModal = infoModal.opcionConfirmacion

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onCancelar}>
            <div className="bg-white dark:bg-gray-800 
                            z-50 p-3
        |               absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2
                        w-[90%] h-auto ">

                <div className="mx-auto w-full flex flex-col gap-4 2xl:gap-5">
                    <div className="flex flex-col gap-2 2xl:gap-3">
                        <p className="font-bold text-base xss:text-base 
                                    2xs:text-base md:text-xl 2xl:text-3xl
                                text-black dark:text-white">
                            <span translate="no">{ciudad}</span>
                        </p>

                        <p className="text-base xss:text-base 2xs:text-base 
                                        md:text-xl 2xl:text-3xl
                            text-black dark:text-white">
                            {mensaje}
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-6 2xl:gap-7">
                        <p 
                            className="font-bold text-base xss:text-base 
                                        2xs:text-base md:text-xl 2xl:text-3xl
                                        text-blue-800 dark:text-white cursor-pointer"
                            onClick={onCancelar}
                            >
                            {infoDelModal.cancelar}
                        </p>

                        <p 
                            className="font-bold text-base xss:text-base 
                                        2xs:text-base md:text-xl 2xl:text-3xl
                                        text-blue-800 dark:text-white cursor-pointer"
                            onClick={onAceptar}
                            >
                            {infoDelModal.aceptar}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}