import React, { useState, useContext } from "react";
import { HiCheck } from "react-icons/hi";
import { motion } from "framer-motion";
import { BusquedaContext } from "../../context/BusquedaContext";
import { useVariasUbicaciones } from "../../context/VariasUbicacionesContext";

import { useNavigate } from "react-router-dom";

import { normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula } from "../../utils/normalizarURL";

import ModalConfirmacion from "../modal/ModalConfirmacion";
import ModalExitoError from "../modal/ModalExitoError";
import useConexionInternet from "../../hooks/useConexionInternet";

import infoModal from "../../data/infoModal.json";

const infoDelModalEliminacion = infoModal.eliminarUbicacion.mensaje;
const infoDelModalUbiPredeter = infoModal.ubicacionPredeterminada.mensaje;
const infoDelModalElimExitosa = infoModal.eliminacionExitosaUbicacion.mensaje;
const infoDelModalElimErronea = infoModal.eliminacionErroneaUbicacion.mensaje;

export default function ClimasUbicados({ onClose, iconoEliminar, miUbicacion }) {

    const { ubicaciones, ubicacionActiva, obtenerClimaUbicacion,
        cambiarUbicacionActiva, eliminarUbicacion, obtenerUbicacionesValidas,
        tieneClimaValido } = useVariasUbicaciones();

    const { setCiudadSeleccionada } = useContext(BusquedaContext);
    const { isOnline } = useConexionInternet();

    const navigate = useNavigate();

    // Estados para el modal de eliminación
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [ubicacionAEliminar, setUbicacionAEliminar] = useState(null);

    // Estados para el modal de ubicación predeterminada
    const [mostrarModalPredeterminada, setMostrarModalPredeterminada] = useState(false);
    const [ubicacionPredeterminada, setUbicacionPredeterminada] = useState(null);

    // Estados para el modal de éxito/error al eliminar
    const [mostrarModalResultado, setMostrarModalResultado] = useState(false);
    const [ciudadEliminada, setCiudadEliminada] = useState("");
    const [esError, setEsError] = useState(false);

    // Obtener solo las ubicaciones con clima válido
    const ubicacionesValidas = obtenerUbicacionesValidas();

    const manejarClickUbicacion = (ubicacion) => {
        // Verificar que la ubicación tenga clima válido antes de cualquier acción
        if (!tieneClimaValido(ubicacion.id)) {
            return; // No hacer nada si no tiene clima válido
        }

        // Si está en modo eliminación
        if (iconoEliminar) {
            setUbicacionAEliminar(ubicacion);
            setMostrarModalEliminar(true);
            return;
        }

        // Si la ubicación ya es la activa, navegar directamente sin modal
        const esActiva = ubicacionActiva?.id === ubicacion.id;
        if (esActiva) {
            // Actualizar la ciudad seleccionada para disparar la lógica de actualización
            setCiudadSeleccionada({
                ciudad: ubicacion.ciudad,
                departamento: ubicacion.departamento,
                pais: ubicacion.pais,
                lat: ubicacion.lat,
                lon: ubicacion.lon
            });

            // Cambiar la ubicación activa
            cambiarUbicacionActiva(ubicacion);

            // Navegar a la ubicación
            const ciudad = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacion.ciudad);
            const departamento = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacion.departamento);
            const pais = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacion.pais);

            navigate(`/${ciudad}/${departamento}/${pais}`);
            onClose && onClose();

            // Forzar actualización del contexto para ubicaciones activas
            setTimeout(() => {
                setCiudadSeleccionada(null);
                setTimeout(() => {
                    setCiudadSeleccionada({
                        ciudad: ubicacion.ciudad,
                        departamento: ubicacion.departamento,
                        pais: ubicacion.pais,
                        lat: ubicacion.lat,
                        lon: ubicacion.lon
                    });
                }, 10);
            }, 10);
            return;
        }

        // Si no es la activa, mostrar modal de confirmación
        setUbicacionPredeterminada(ubicacion);
        setMostrarModalPredeterminada(true);
    };

    // Funciones para el modal de eliminación
    const cancelarEliminacion = () => {
        setMostrarModalEliminar(false);
        setUbicacionAEliminar(null);
    }

    const confirmarEliminacion = async () => {
        if (ubicacionAEliminar) {
            // Guardar el nombre de la ciudad antes de eliminar
            const ciudadAEliminar = ubicacionAEliminar.ciudad;
            setCiudadEliminada(ciudadAEliminar);
            
            try {
                // Verificar conexión a internet
                if (!isOnline) {
                    throw new Error("No hay conexión a internet");
                }

                // Intentar eliminar la ubicación
                const resultado = await eliminarUbicacion(ubicacionAEliminar.id);

                // Verificar si la eliminación fue exitosa
                if (resultado === false) {
                    throw new Error("Error al eliminar la ubicación");
                }

                // Cerrar modal de confirmación
                setMostrarModalEliminar(false);
                setUbicacionAEliminar(null);

                // Mostrar modal de éxito
                setEsError(false);
                setMostrarModalResultado(true);

            } catch (error) {
                console.error("Error al eliminar ubicación:", error);

                // Cerrar modal de confirmación
                setMostrarModalEliminar(false);
                setUbicacionAEliminar(null);

                // Mostrar modal de error
                setEsError(true);
                setMostrarModalResultado(true);
            }
        }
    }

    // Función para cerrar el modal de resultado (éxito o error)
    const cerrarModalResultado = () => {
        setMostrarModalResultado(false);
        setCiudadEliminada("");
        setEsError(false);
    }

    // Funciones para el modal de ubicación predeterminada
    const cancelarUbicacionPredeterminada = () => {
        setMostrarModalPredeterminada(false);
        setUbicacionPredeterminada(null);
    }

    const confirmarUbicacionPredeterminada = () => {
        if (ubicacionPredeterminada && tieneClimaValido(ubicacionPredeterminada.id)) {
            // Actualizar la ciudad seleccionada en el contexto
            setCiudadSeleccionada({
                ciudad: ubicacionPredeterminada.ciudad,
                departamento: ubicacionPredeterminada.departamento,
                pais: ubicacionPredeterminada.pais,
                lat: ubicacionPredeterminada.lat,
                lon: ubicacionPredeterminada.lon
            });

            // Cambiar la ubicación activa
            cambiarUbicacionActiva(ubicacionPredeterminada);

            // Navegar a la nueva ubicación
            const ciudad = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacionPredeterminada.ciudad);
            const departamento = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacionPredeterminada.departamento);
            const pais = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacionPredeterminada.pais);

            navigate(`/${ciudad}/${departamento}/${pais}`);

            // Cerrar modal y componente
            setMostrarModalPredeterminada(false);
            setUbicacionPredeterminada(null);
            onClose && onClose();
        }
    }

    // Si no hay ubicaciones válidas, mostrar un mensaje
    if (ubicacionesValidas.length === 0 && !mostrarModalResultado) {
        return (
            <div className="z-50 p-3 absolute top-1/2 left-1/2 transform 
                            -translate-x-1/2  -translate-y-1/2
                            w-[90%] h-auto">
                <p className="text-center text-gray-500 dark:text-gray-400
                                text-base md:text-xl 2xl:text-2xl">
                    No locations added
                </p>
            </div>
        );
    }

    return (
        <div className="w-[95%] my-4 grid grid-cols-1 items-center gap-5">

            {/* Modal para confirmar ubicación predeterminada */}
            {mostrarModalPredeterminada && (
                <ModalConfirmacion
                    ciudad={ubicacionPredeterminada?.ciudad}
                    mensaje={infoDelModalUbiPredeter}
                    onCancelar={cancelarUbicacionPredeterminada}
                    onAceptar={confirmarUbicacionPredeterminada}
                />
            )}

            {/* Modal para eliminar ubicación */}
            {mostrarModalEliminar && (
                <ModalConfirmacion
                    ciudad={ubicacionAEliminar?.ciudad}
                    mensaje={infoDelModalEliminacion}
                    onCancelar={cancelarEliminacion}
                    onAceptar={confirmarEliminacion}
                />
            )}

            {/* Modal de resultado al eliminar ubicación (éxito o error) */}
            {mostrarModalResultado && (
                <ModalExitoError
                    ciudad={ciudadEliminada}
                    mensaje={esError ? infoDelModalElimErronea : infoDelModalElimExitosa}
                    onCerrar={cerrarModalResultado}
                    esError={esError}
                />
            )}

            {/* Solo mostrar ubicaciones con clima válido */}
            {[...ubicacionesValidas].sort((a, b) =>
            (a.id === ubicacionActiva?.id ? -1 :
                b.id === ubicacionActiva?.id ? 1 : 0)).map((ubicacion) => {
                    const esActiva = ubicacionActiva?.id === ubicacion.id;
                    const clima = obtenerClimaUbicacion(ubicacion.id);

                    // Verificación adicional: solo renderizar si tiene clima válido
                    if (!tieneClimaValido(ubicacion.id)) {
                        return null;
                    }

                    return (
                        <motion.div
                            key={ubicacion.id}
                            className={`border-2 2xl:border-4 rounded-lg relative ${esActiva
                                ? 'border-green-400'
                                : 'border-violet-900 dark:border-gray-900'}`}
                            whileHover={{ scale: iconoEliminar ? 1 : 1.02 }}
                            whileTap={{ scale: iconoEliminar ? 1 : 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={() => manejarClickUbicacion(ubicacion)}
                        >

                            {/* Indicador de ubicación activa */}
                            {esActiva && !iconoEliminar && (
                                <div className="bg-green-400 w-fit absolute right-0 bottom-0">
                                    <HiCheck className="text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl text-white" />
                                </div>
                            )}

                            <div className={`bg-violet-900 dark:bg-gray-900
                                                h-23 2xs:h-19 md:h-19 lg:h-18 2xl:h-23 overflow-hidden
                                    ${!iconoEliminar ? 'hover:bg-violet-700 dark:hover:bg-gray-700 active:bg-violet-600 dark:active:bg-gray-600' : 'hover:bg-red-800 dark:hover:bg-blue-900'}
                                    w-full p-1 rounded-lg
                                    flex flex-row items-center justify-around
                                    gap-1 cursor-pointer`}>

                                <div className="w-[90%] h-auto flex flex-wrap items-center gap-2">

                                    <div className="flex flex-row items-center gap-1">
                                        {iconoEliminar && (
                                            <div className="w-fit text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl text-white">
                                                {iconoEliminar}
                                            </div>
                                        )}

                                        <p className="font-bold text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl text-white">
                                            {miUbicacion}
                                        </p>

                                    </div>
                                    <p className="text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl text-white">
                                        <span>{ubicacion?.ciudad || null}</span>
                                    </p>

                                    <p className="text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl text-white">
                                        <span>{ubicacion?.departamento || null}<span translate="no">,</span></span> <span>{ubicacion?.pais || null}</span>
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    );
                })}

        </div>
    );
}