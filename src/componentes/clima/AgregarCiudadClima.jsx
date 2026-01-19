import React, { useEffect, useContext, useState, useRef } from "react";
import { BusquedaContext } from "../../context/BusquedaContext";
import BotonCiudadClima from "../botones/BotonCiudadClima";
import BarraBusqueda from "../busqueda/BarraBusqueda";
import AdvDeteccionAutoClima from "./AdvDeteccionAutoClima";
import useConexionInternet from "../../hooks/useConexionInternet";
import { useCloseKeyboardOnScroll } from "../../hooks/useCloseKeyboardOnScroll";

import EstadoCargaConexion from "../estado_de_carga/EstadoCargaConexion";
import InfoEstadoCargaConexion from "../../data/InfoEstadoCargaConexion.json";

export default function AgregarCiudadClima() {
    const { ciudadesColombia, obtenerCiudadesColombia, cargandoCiudadesColombia } = useContext(BusquedaContext);
    const { isOnline, justReconnected, resetReconnectionState } = useConexionInternet();
    const [mostrandoMensajeReconexion, setMostrandoMensajeReconexion] = useState(false);
    const timerRef = useRef(null);
    
    // Estados para mensajes traducidos
    const [mensajeTraducidoSinConexion, setMensajeTraducidoSinConexion] = useState("No connection");
    const [mensajeTraducidoConConexion, setMensajeTraducidoConConexion] = useState("Connection has been re-established");
    const [mensajeTraducidoCarga, setMensajeTraducidoCarga] = useState("Loading suggestion of cities...");
    
    // Ref para el contenedor de scroll donde se mostrará la lista de ciudades
    const scrollContainerRef = useRef(null);

    // Configurar el hook para cerrar el teclado al hacer scroll
    useCloseKeyboardOnScroll({
        container: scrollContainerRef,
        delay: 100 // Pequeño delay para mejor UX
    });

    const mensajeCarga = InfoEstadoCargaConexion.cargando.cargSugeCiudades;
    const mensajeSinConexion = InfoEstadoCargaConexion.conexion.sinConexion;
    const mensajeConConexion = InfoEstadoCargaConexion.conexion.conConexion;

    // Efecto para sincronizar mensajes traducidos
    useEffect(() => {
        // Función para obtener texto traducido de los elementos ocultos
        const updateTranslatedMessages = () => {
            const sinConexionEl = document.querySelector('[data-translate="no-connection-status"]');
            const conConexionEl = document.querySelector('[data-translate="reconnected-status"]');
            const cargaEl = document.querySelector('[data-translate="loading-status"]');
            
            if (sinConexionEl) {
                const newText = sinConexionEl.textContent || sinConexionEl.getAttribute('data-original');
                if (newText !== mensajeTraducidoSinConexion) {
                    setMensajeTraducidoSinConexion(newText);
                }
            }
            
            if (conConexionEl) {
                const newText = conConexionEl.textContent || conConexionEl.getAttribute('data-original');
                if (newText !== mensajeTraducidoConConexion) {
                    setMensajeTraducidoConConexion(newText);
                }
            }
            
            if (cargaEl) {
                const newText = cargaEl.textContent || cargaEl.getAttribute('data-original');
                if (newText !== mensajeTraducidoCarga) {
                    setMensajeTraducidoCarga(newText);
                }
            }
        };

        // Actualizar inmediatamente
        updateTranslatedMessages();

        // Observer para detectar cambios en el DOM (traducción)
        const observer = new MutationObserver(() => {
            updateTranslatedMessages();
        });

        // Observar cambios en los elementos de traducción
        const translateElements = document.querySelectorAll('[data-translate="no-connection-status"], [data-translate="reconnected-status"], [data-translate="loading-status"]');
        translateElements.forEach(el => {
            observer.observe(el, { childList: true, subtree: true, characterData: true });
        });

        return () => observer.disconnect();
    }, [mensajeTraducidoSinConexion, mensajeTraducidoConConexion, mensajeTraducidoCarga]);

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
        <div className="w-full h-[100dvh] bg-blue-950 dark:bg-gray-800 
                        flex flex-col items-center 
                        overflow-hidden touch-none overscroll-none
                        fixed inset-0">

            {/* Elementos ocultos para que el navegador los traduzca */}
            <span data-translate="no-connection-status" data-original="No connection" style={{ display: 'none' }}>
                No connection
            </span>
            <span data-translate="reconnected-status" data-original="Connection has been re-established" style={{ display: 'none' }}>
                Connection has been re-established
            </span>
            <span data-translate="loading-status" data-original="Loading suggestion of cities..." style={{ display: 'none' }}>
                Loading suggestion of cities...
            </span>

            <div className="mt-5 w-full h-full 
                            flex flex-col items-center justify-between gap-2
                            overflow-hidden">

                <div className="w-full flex justify-center flex-shrink-0">
                    <BarraBusqueda 
                        shouldShowReconnectionMessage={shouldShowReconnectionMessage}
                        shouldShowLoading={shouldShowLoading}
                    />
                </div>

                <div className="w-full flex-shrink-0 overflow-hidden bg-blue-700 dark:bg-gray-900 py-2 h-12 md:14 2xl:h-16">
                    <AdvDeteccionAutoClima />
                </div>

                <div 
                    ref={scrollContainerRef}
                    className="flex-1 w-full bg-blue-900 dark:bg-gray-800 py-4 
                                overflow-y-auto overscroll-contain
                                min-h-0">

                    {shouldShowOfflineMessage ? (
                        <EstadoCargaConexion estadoMensajeConexion={mensajeTraducidoSinConexion} />
                    ) : shouldShowReconnectionMessage ? (
                        <EstadoCargaConexion estadoMensajeConexion={mensajeTraducidoConConexion} />
                    ) : shouldShowLoading ? (
                        <EstadoCargaConexion estadoMensajeCargaCiudColom={mensajeTraducidoCarga} />
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