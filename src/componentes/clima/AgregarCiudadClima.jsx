import React, { useEffect, useContext, useState, useRef } from "react";
import { BusquedaContext } from "../../context/BusquedaContext";
import BotonCiudadClima from "../botones/BotonCiudadClima";
import BarraBusqueda from "../busqueda/BarraBusqueda";
import AdvDeteccionAutoClima from "./AdvDeteccionAutoClima";
import useConexionInternet from "../../hooks/useConexionInternet";

import EstadoCargaConexion from "../estado_de_carga/EstadoCargaConexion";
import InfoEstadoCargaConexion from "../../data/InfoEstadoCargaConexion.json";

export default function AgregarCiudadClima() {
    const { ciudadesColombia, obtenerCiudadesColombia, cargandoCiudadesColombia, resultados } = useContext(BusquedaContext);
    const { isOnline, justReconnected, resetReconnectionState } = useConexionInternet();
    const [mostrandoMensajeReconexion, setMostrandoMensajeReconexion] = useState(false);
    const timerRef = useRef(null);
    const mainContainerRef = useRef(null);

    const mensajeCarga = InfoEstadoCargaConexion.cargando.cargSugeCiudades;
    const mensajeSinConexion = InfoEstadoCargaConexion.conexion.sinConexion;
    const mensajeConConexion = InfoEstadoCargaConexion.conexion.conConexion;

    // Efecto para manejar la carga inicial
    useEffect(() => {
        if (isOnline) {
            obtenerCiudadesColombia();
        }
    }, []);

    // Efecto para manejar la reconexión
    useEffect(() => {
        if (justReconnected && isOnline) {
            console.log("Reconectado a internet, mostrando mensaje...");
            setMostrandoMensajeReconexion(true);

            // Limpiar timer anterior si existe
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Después de 3 segundos, reintentar carga automáticamente
            timerRef.current = setTimeout(() => {
                console.log("3 segundos pasados, reintentando carga...");
                setMostrandoMensajeReconexion(false);
                resetReconnectionState();
                obtenerCiudadesColombia();
            }, 3000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [justReconnected, isOnline, obtenerCiudadesColombia, resetReconnectionState]);

    // Controlar el comportamiento de scroll cuando hay resultados de búsqueda
    useEffect(() => {
        const mainContainer = mainContainerRef.current;
        if (!mainContainer) return;

        const handleTouchMove = (e) => {
            // Si hay resultados de búsqueda activos, prevenir el scroll del contenedor principal
            if (resultados && resultados.length > 0) {
                // Verificar si el touch viene del área de resultados
                const targetElement = e.target.closest('[data-search-results]');
                if (!targetElement) {
                    e.preventDefault();
                }
            }
        };

        if (resultados && resultados.length > 0) {
            mainContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        }

        return () => {
            mainContainer.removeEventListener('touchmove', handleTouchMove);
        };
    }, [resultados]);

    // Determinar qué mostrar
    const shouldShowOfflineMessage = !isOnline;
    const shouldShowReconnectionMessage = mostrandoMensajeReconexion && isOnline;
    const shouldShowLoading = cargandoCiudadesColombia && isOnline && !mostrandoMensajeReconexion;
    const shouldShowCities = !cargandoCiudadesColombia && ciudadesColombia.length > 0 && isOnline && !mostrandoMensajeReconexion;

    // Debug logs
    console.log("Estados actuales:", {
        isOnline,
        justReconnected,
        mostrandoMensajeReconexion,
        cargandoCiudadesColombia,
        ciudadesLength: ciudadesColombia.length
    });

    return (
        <div 
            ref={mainContainerRef}
            className="w-full h-[100svh] bg-blue-950 dark:bg-gray-800 
                        flex flex-col items-center 
                        overflow-hidden touch-none overscroll-none
                        fixed inset-0"
            style={{ 
                overscrollBehavior: 'none',
                touchAction: resultados && resultados.length > 0 ? 'none' : 'pan-y'
            }}
        >

            <div className="mt-7 w-full h-full 
                            flex flex-col items-center justify-between gap-2
                            overflow-hidden">

                {/* Sección fija superior - BarraBusqueda */}
                <div className="flex-shrink-0 w-full relative z-10">
                    <BarraBusqueda />
                </div>

                {/* Sección fija intermedia - AdvDeteccionAutoClima */}
                <div className="flex-shrink-0 w-full bg-blue-700 dark:bg-gray-700 py-2">
                    <AdvDeteccionAutoClima />
                </div>

                {/* Sección con scroll - Lista de ciudades */}
                <div className="flex-1 w-full bg-blue-900 dark:bg-gray-700 py-4 
                                overflow-y-auto overscroll-contain
                                min-h-0"
                     style={{ 
                         touchAction: resultados && resultados.length > 0 ? 'none' : 'pan-y',
                         overscrollBehavior: 'contain'
                     }}>

                    {shouldShowOfflineMessage ? (
                        <EstadoCargaConexion estadoMensajeConexion={mensajeSinConexion} />
                    ) : shouldShowReconnectionMessage ? (
                        <EstadoCargaConexion estadoMensajeConexion={mensajeConConexion} />
                    ) : shouldShowLoading ? (
                        <EstadoCargaConexion estadoMensajeCargaCiudColom={mensajeCarga} />
                    ) : shouldShowCities ? (
                        <div className="mx-auto w-[97%]
                                    grid gap-4 
                                    grid-cols-1
                                    xs:grid-cols-2
                                    sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 
                                    2xl:grid-cols-3">

                            {ciudadesColombia.map((ciudadData, index) => (
                                <BotonCiudadClima
                                    key={index}
                                    ciudad={ciudadData.ciudad}
                                    departamento={ciudadData.departamento}
                                    pais={ciudadData.pais}
                                />
                            ))}

                        </div>
                    ) : null}

                </div>

            </div>

        </div>
    );
}