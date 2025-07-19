import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BusquedaContext } from "../../context/BusquedaContext";
import { motion } from "framer-motion";
import { normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula } from "../../utils/normalizarURL";

export default function BotonCiudadClima({ ciudad, departamento, pais }) {
    const { setCiudadSeleccionada } = useContext(BusquedaContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setCiudadSeleccionada({ ciudad, departamento, pais });

        const ciudadURL = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ciudad); 
        const departamentoURL = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(departamento);
        const paisURL = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(pais);

        navigate(`/${ciudadURL}/${departamentoURL}/${paisURL}`);
    }

    return (
        <motion.button
            onClick={handleClick}
            className="border border-none rounded-md p-2 
                                        bg-blue-950 hover:bg-green-950 active:bg-green-700
                                        dark:bg-gray-950 dark:hover:bg-gray-900
                                        dark:active:bg-gray-600
                                        py-2  flex flex-col items-center justify-center 
                                        gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <p className="xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl
                                        text-white">
                <span>{ciudad}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-1">
                <p className="xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl
                                        text-gray-200">
                    <span>{departamento}<span translate="no">,</span></span>
                </p>

                <p className="xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl
                                        text-gray-200">
                    <span>{pais}</span>
                </p>
            </div>
        </motion.button>

    );
}