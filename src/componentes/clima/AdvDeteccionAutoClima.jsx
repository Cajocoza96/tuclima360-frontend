import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import infoTarjetaClima from "../../data/infoTarjetaClima.json";

export default function AdvDeteccionAutoClima({ mensajeNoConexion }) {
    const mensajeAdvertencia = infoTarjetaClima.agregarCiudad.mensajeAdvertenciaSinGPS;

    const [reiniPosText, setReiniPosText] = useState(0);

    useEffect(() => {
        setReiniPosText(prev => prev + 1);
    }, []);

    return (
        <>
            {!mensajeNoConexion && (
                <motion.p
                    className="ml-20 text-white whitespace-nowrap
                                text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl"
                    key={reiniPosText}
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {mensajeAdvertencia}
                </motion.p>
            )}

            {mensajeNoConexion && (
                <p className="text-center text-white 
                                text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl">
                    {mensajeNoConexion}
                </p>
            )}
        </>
    );
}