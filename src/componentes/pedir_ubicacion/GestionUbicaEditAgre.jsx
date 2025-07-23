import React, { useState } from "react";
import ValorValorValor from "../cabecera/ValorValorValor";
import { HiTrash, HiHome } from "react-icons/hi";
import AdvDeteccionAutoClima from "../clima/AdvDeteccionAutoClima";
import ClimasUbicados from "../clima/ClimasUbicados";
import BotonAccion from "../botones/BotonAccion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useVariasUbicaciones } from "../../context/VariasUbicacionesContext";
import useConexionInternet from "../../hooks/useConexionInternet";
import InfoEstadoCargaConexion from "../../data/InfoEstadoCargaConexion.json";
import useIsMobile from "../../hooks/useIsMobile";

const MotionBoton = motion.create(BotonAccion);

export default function GestionUbicaEditAgre() {
    const [modoEdicion, setModoEdicion] = useState(false);
    const { ubicaciones } = useVariasUbicaciones();

    const isMobile = useIsMobile();

    const manejarEditar = () => {
        setModoEdicion(true);
    };

    const manejarHecho = () => {
        setModoEdicion(false);
    };

    const mostrarBotonEditar = ubicaciones.length > 0;

    const mensajeNoConexion = InfoEstadoCargaConexion.conexion.sinConexion;

    // Hook para detectar conexión a internet
    const { isOnline } = useConexionInternet();

    return (
        <div className="bg-blue-950 dark:bg-gray-800 mx-auto min-h-[100svh]">

            <div className="w-full mx-auto min-h-[100svh]
                                flex flex-col items-center relative justify-between">

                <div className="mt-2 w-full mx-auto flex flex-col items-center justify-center gap-2">

                    <ValorValorValor

                        valor1={
                            <Link to="/">
                                <HiHome className="text-white" />
                            </Link>
                        }

                        valor2={<p className="text-white">Manage location</p>}
                    />

                    <div className={`bg-blue-700 dark:bg-gray-700
                                            w-full py-2 overflow-hidden
                                            flex items-center ${!isOnline ? "justify-center" : ""}`}>

                        {isOnline ? (
                            <AdvDeteccionAutoClima />
                        ) : (
                            <AdvDeteccionAutoClima mensajeNoConexion={mensajeNoConexion} />
                        )}

                    </div>

                    <div className="w-[95%] h-100 xs:h-120 xs2:h-140
                                2xs:h-43 md:h-50 lg:h-100 2xl:h-190 
                                overflow-y-auto overflow-x-hidden rounded-md">

                        <div className="mx-auto w-full overflow-hidden
                                            flex flex-col items-center">
                            <ClimasUbicados
                                iconoEliminar={modoEdicion ? <HiTrash /> : null}
                                modoEdicion={modoEdicion}
                            />
                        </div>

                    </div>

                </div>

                <div className={`${isMobile ? 'fixed bottom-0 left-1/2 transform -translate-x-1/2' : 'static'} 
                                mt-1 mb-3 lg:mb-4 w-[90%]
                                grid gap-4 overflow-hidden
                                xss:z-50`}
                    style={{
                        gridTemplateColumns: modoEdicion || !mostrarBotonEditar ? '1fr' : '1fr 1fr'
                    }}>

                    {!modoEdicion && (
                        <>
                            {mostrarBotonEditar && (
                                <MotionBoton
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    nombre="Edit"
                                    onClick={manejarEditar}
                                    className="p-1 w-full
                                border border-gray-300  dark:border-gray-800
                                bg-gray-300 dark:bg-gray-950
                                active:bg-gray-100 dark:active:bg-gray-600
                                text-blue-700 dark:text-white
                                rounded-md cursor-pointer"
                                />
                            )}

                            <Link to="/add-city-weather">
                                <MotionBoton
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    nombre="Add location"
                                    className="p-1 w-full
                                border border-gray-300  dark:border-gray-800
                                bg-gray-300 dark:bg-gray-950
                                active:bg-gray-100 dark:active:bg-gray-600
                                text-blue-700 dark:text-white
                                rounded-md cursor-pointer"
                                />
                            </Link>
                        </>
                    )}

                    {modoEdicion && (
                        <MotionBoton
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            nombre="Made"
                            onClick={manejarHecho}
                            className="p-1 w-full
                            border border-gray-300  dark:border-gray-800
                            bg-gray-300 dark:bg-gray-950
                            active:bg-gray-100 dark:active:bg-gray-600
                            text-blue-700 dark:text-white
                            rounded-md cursor-pointer"
                        />
                    )}
                </div>

            </div>

        </div>
    );
}