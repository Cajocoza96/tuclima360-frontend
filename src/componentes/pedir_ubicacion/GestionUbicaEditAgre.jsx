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

const MotionBoton = motion.create(BotonAccion);

export default function GestionUbicaEditAgre() {
    const [modoEdicion, setModoEdicion] = useState(false);
    const { obtenerUbicacionesValidas } = useVariasUbicaciones();

    const manejarEditar = () => {
        setModoEdicion(true);
    };

    const manejarHecho = () => {
        setModoEdicion(false);
    };

    const ubicacionesValidas = obtenerUbicacionesValidas();
    const mostrarBotonEditar = ubicacionesValidas.length > 0;

    const mensajeNoConexion = InfoEstadoCargaConexion.conexion.sinConexion;

    const { isOnline } = useConexionInternet();

    return (
        <div className="bg-blue-950 dark:bg-gray-800 mx-auto min-h-[100svh]">

            <div className="w-full mx-auto min-h-[100svh] max-h-[100svh] flex flex-col items-center">

                {/* Contenido superior fijo */}
                <div className="w-full mx-auto flex flex-col items-center justify-center gap-2 flex-shrink-0">

                    <ValorValorValor

                        valor1={
                            <Link to="/">
                                <HiHome className="text-white" />
                            </Link>
                        }

                        valor2={<p className="text-white">Manage location</p>}
                    />

                    <div className={`bg-blue-700 dark:bg-gray-900
                                            w-full overflow-hidden
                                            py-2 h-12 md:14 2xl:h-16
                                            flex items-center ${!isOnline ? "justify-center" : ""}`}>

                        {isOnline ? (
                            <AdvDeteccionAutoClima />
                        ) : (
                            <AdvDeteccionAutoClima mensajeNoConexion={mensajeNoConexion} />
                        )}

                    </div>

                </div>

                {/* Contenido del medio que crece para ocupar el espacio disponible */}
                <div className="flex-1 w-[95%] mx-auto overflow-y-auto overflow-x-hidden rounded-md my-2"
                    style={{
                        minHeight: '20px'
                    }}>

                    <div className="mx-auto w-full overflow-hidden 
                                        flex flex-col items-center">
                        <ClimasUbicados
                            iconoEliminar={modoEdicion ? <HiTrash /> : null}
                            modoEdicion={modoEdicion}
                        />
                    </div>

                </div>

                {/* Botones fijos en la parte inferior */}
                <div className="flex-shrink-0 w-[90%] mx-auto mb-3 lg:mb-4
                                grid gap-4 overflow-hidden"
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
                                active:bg-gray-100 dark:active:bg-gray-700
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
                                active:bg-gray-100 dark:active:bg-gray-700
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
                            active:bg-gray-100 dark:active:bg-gray-700
                            text-blue-700 dark:text-white
                            rounded-md cursor-pointer"
                        />
                    )}
                </div>

            </div>

        </div>
    );
}