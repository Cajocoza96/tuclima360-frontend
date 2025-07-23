import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import cargaInfoCiudadClima from "../../assets/animaciones/lottie_animation/carga_info_ciudad_clima/cargaInfoCiudadClima.json";
import noCargaInfoCiudadClima from "../../assets/animaciones/lottie_animation/carga_info_ciudad_clima/noCargaInfoCiudadClima.json";
import { div } from "framer-motion/client";

export default function EstadoCargaConexion({
    estadoMensajeCargaCiudadClima,
    estadoMensajeConexionCiudadClima,
    estadoMensajeCargaCiudColom,
    estadoMensajeConexion
}) {
    const [animacionCargada, setAnimacionCargada] = useState(false);
    const [errorCargaAnimacion, setErrorCargaAnimacion] = useState(false);

    const navigate = useNavigate();

    const handleInicio = () => navigate("/");

    // Efecto para manejar la carga de animaciones
    useEffect(() => {
        if (estadoMensajeCargaCiudadClima || estadoMensajeConexionCiudadClima) {
            setAnimacionCargada(false);
            setErrorCargaAnimacion(false);

            // Simular tiempo de carga de animación
            const timeout = setTimeout(() => {
                setAnimacionCargada(true);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [estadoMensajeCargaCiudadClima, estadoMensajeConexionCiudadClima]);

    const handleAnimacionError = () => {
        setErrorCargaAnimacion(true);
        console.warn('Error cargando animación Lottie');
    };

    return (
        <>
            {estadoMensajeCargaCiudadClima && (
                <div className="xss:h-[100svh] h-screen">
                    <div className="bg-violet-900 dark:bg-black w-screen xss:h-[100svh] h-screen z-50 p-3 
                                absolute top-1/2 left-1/2 transform 
                                -translate-x-1/2 -translate-y-1/2
                                flex flex-col items-center justify-center">

                        <div
                            onClick={handleInicio}
                            className="mb-5 2xl:mb-10 cursor-pointer w-fit flex flex-row items-center justify-center gap-2 2xl-gap-4">
                            <p className="text-white text-center text-xl 2xs:text-2xl 2xl:text-3xl">
                                Go back home?
                            </p>
                            <HiHome className="text-white
                                            text-xl md:text-2xl 2xl:text-4xl" />
                        </div>


                        <motion.p
                            className="text-white text-center text-xl 2xs:text-2xl 2xl:text-3xl"
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        >
                            {estadoMensajeCargaCiudadClima}
                        </motion.p>

                        <div className="w-30 2xl:w-50 overflow-hidden">
                            {animacionCargada && !errorCargaAnimacion ? (
                                <Lottie
                                    className="w-full object-cover"
                                    animationData={cargaInfoCiudadClima}
                                    loop={true}
                                    onError={handleAnimacionError}
                                />
                            ) : (
                                <div className="w-full h-24 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>

                        <p className="font-extrabold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-blue-500 to-green-400
                                    text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl">
                            <span translate="no">TuClima360</span>
                        </p>
                    </div>
                </div>
            )}

            {estadoMensajeConexionCiudadClima && (
                <div className="xss:h-[100svh] h-screen">
                    <div className="bg-violet-900 dark:bg-black w-screen xss:h-[100svh] h-screen z-50 p-3 
                                absolute top-1/2 left-1/2 transform 
                                -translate-x-1/2 -translate-y-1/2
                                flex flex-col items-center justify-center">

                        <div
                            onClick={handleInicio}
                            className="mb-5 2xl:mb-10 cursor-pointer w-fit flex flex-row items-center justify-center gap-2 2xl-gap-4">
                            <p className="text-white text-center text-xl 2xs:text-2xl 2xl:text-3xl">
                                Go back home?
                            </p>
                            <HiHome className="text-white
                                            text-xl md:text-2xl 2xl:text-4xl" />
                        </div>

                        <p className="text-white text-center text-xl 2xs:text-2xl 2xl:text-3xl">
                            {estadoMensajeConexionCiudadClima}
                        </p>

                        <div className="w-30 2xl:w-50 overflow-hidden">
                            {animacionCargada && !errorCargaAnimacion ? (
                                <Lottie
                                    className="w-full object-cover"
                                    animationData={noCargaInfoCiudadClima}
                                    loop={true}
                                    onError={handleAnimacionError}
                                />
                            ) : (
                                <div className="w-full h-24 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>

                        <p className="font-extrabold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-blue-500 to-green-400
                                    text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl">
                            <span translate="no">TuClima360</span>
                        </p>
                    </div>
                </div>
            )}

            {estadoMensajeCargaCiudColom && (
                <div className="h-screen z-50 p-3 absolute 
                                top-1/2 left-1/2 transform -translate-x-1/2  
                                -translate-y-1/2
                                flex flex-col items-center justify-center">
                    <p className="text-white text-center text-xl 2xs:text-2xl 2xl:text-3xl">
                        {estadoMensajeCargaCiudColom}
                    </p>
                </div>
            )}

            {estadoMensajeConexion && (
                <div className="h-screen z-50 p-3 absolute 
                                top-1/2 left-1/2 transform -translate-x-1/2  
                                -translate-y-1/2
                                flex flex-col items-center justify-center">
                    <p className="text-white text-center text-xl 2xs:text-2xl 2xl:text-3xl">
                        {estadoMensajeConexion}
                    </p>
                </div>
            )}
        </>
    );
}