import React, { useState, useRef, useContext, useEffect } from "react";
import ResultadoBusqueda from "./ResultadoBusqueda";
import { HiX, HiHome } from "react-icons/hi";
import { BusquedaContext } from "../../context/BusquedaContext";
import useConexionInternet from "../../hooks/useConexionInternet"; 

import { Link } from "react-router-dom";

import { useCloseKeyboardOnScroll } from "../../hooks/useCloseKeyboardOnScroll";

export default function BarraBusqueda({ 
    shouldShowReconnectionMessage = false, 
    shouldShowLoading = false 
}) {
    const { buscarCiudades, limpiarBusqueda, resultados, cargandoCiudadesColombia } = useContext(BusquedaContext);
    const [mostrarFondo, setMostrarFondo] = useState(true);
    const inputRef = useRef(null);
    const overlayRef = useRef(null);
    const scrollContainerRef = useRef(null);
    
    const { isOnline } = useConexionInternet();

    // Pasar la referencia del contenedor al hook
    useCloseKeyboardOnScroll({
        container: scrollContainerRef,
        delay: 100
    });

    useEffect(() => {
        if (!isOnline) {
            limpiarBusqueda();
            setMostrarFondo(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [isOnline, limpiarBusqueda]);

    // Controlar el overlay cuando hay resultados
    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const handleTouchMove = (e) => {
            if (resultados && resultados.length > 0) {
                e.preventDefault();
            }
        };

        const handleTouchStart = (e) => {
            if (resultados && resultados.length > 0) {
                e.preventDefault();
            }
        };

        if (mostrarFondo && resultados && resultados.length > 0) {
            overlay.addEventListener('touchmove', handleTouchMove, { passive: false });
            overlay.addEventListener('touchstart', handleTouchStart, { passive: false });
        }

        return () => {
            overlay.removeEventListener('touchmove', handleTouchMove);
            overlay.removeEventListener('touchstart', handleTouchStart);
        };
    }, [mostrarFondo, resultados]);

    // Nuevo useEffect para sincronizar el placeholder traducido
    useEffect(() => {
        if (inputRef.current) {
            const input = inputRef.current;
            
            // Función para obtener el placeholder apropiado basado en el estado
            const updatePlaceholder = () => {
                let targetElement = null;
                
                if (!isOnline) {
                    targetElement = input.parentElement?.querySelector('[data-translate="no-connection"]');
                } else if (shouldShowReconnectionMessage) {
                    targetElement = input.parentElement?.querySelector('[data-translate="reconnected"]');
                } else if (shouldShowLoading) {
                    targetElement = input.parentElement?.querySelector('[data-translate="loading"]');
                } else {
                    targetElement = input.parentElement?.querySelector('[data-translate="search-city"]');
                }
                
                if (targetElement) {
                    input.placeholder = targetElement.textContent || targetElement.getAttribute('data-original');
                }
            };
            
            // Actualizar inmediatamente
            updatePlaceholder();
            
            // Observer para detectar cambios en el DOM (traducción)
            const observer = new MutationObserver(() => {
                updatePlaceholder();
            });
            
            // Observar cambios en los elementos de traducción
            const translateElements = input.parentElement?.querySelectorAll('[data-translate]');
            translateElements?.forEach(el => {
                observer.observe(el, { childList: true, subtree: true, characterData: true });
            });
            
            return () => observer.disconnect();
        }
    }, [isOnline, shouldShowReconnectionMessage, shouldShowLoading]);

    const manejarCambio = (e) => {
        if (isOnline && !shouldShowLoading && !shouldShowReconnectionMessage) {
            buscarCiudades(e.target.value);
            setMostrarFondo(true);
        }
    };

    const cerrarFondo = () => {
        limpiarBusqueda();
        setMostrarFondo(false);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const getInputState = () => {
        return !isOnline || shouldShowLoading || shouldShowReconnectionMessage;
    };

    return (
        <>
            {mostrarFondo && resultados && resultados.length > 0 && (
                <div 
                    ref={overlayRef}
                    className="fixed inset-0 w-screen h-[100dvh] bg-black/70 touch-none overscroll-none z-40"
                    style={{ 
                        overscrollBehavior: 'none'
                    }}
                ></div>
            )}
            <div className={`${getInputState() ? 'bg-gray-500 dark:bg-gray-700' : 'bg-white dark:bg-gray-900'}
                            my-1 p-2 w-[99%]  rounded-md
                            flex flex-row items-center 
                            justify-around relative gap-3 z-50`}>
                
                {/* Elementos ocultos para que el navegador los traduzca */}
                <span data-translate="no-connection" data-original="No internet connection" style={{ display: 'none' }}>
                    No internet connection
                </span>
                <span data-translate="reconnected" data-original="Connection has been re-established" style={{ display: 'none' }}>
                    Connection has been re-established
                </span>
                <span data-translate="loading" data-original="Loading cities... please wait" style={{ display: 'none' }}>
                    Loading cities... please wait
                </span>
                <span data-translate="search-city" data-original="Write the name of the city" style={{ display: 'none' }}>
                    Write the name of the city
                </span>

                <Link to="/">
                <HiHome className="text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl 
                                    text-black dark:text-gray-300 cursor-pointer"/>
                </Link>

                <input 
                    ref={inputRef}
                    className={`${getInputState() ? 'bg-gray-500 dark:bg-gray-700 placeholder:text-gray-800 dark:placeholder:text-gray-400' : 'bg-white dark:bg-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-500'} 
                                    w-[85%] border-none
                                    focus:outline-none focus:ring-0
                                    text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl
                                    text-black dark:text-gray-200
                                    placeholder:text-base placeholder:xss:text-base
                                    placeholder:2xs:text-base placeholder:md:text-xl
                                    placeholder:2xl:text-3xl`}
                    type="text"
                    placeholder="Write the name of the city" // Placeholder inicial
                    onChange={manejarCambio}
                    disabled={getInputState()}
                />

                <HiX 
                    onClick={cerrarFondo}
                    className="text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl
                            text-black dark:text-gray-300 cursor-pointer"/>

                <div data-search-results>
                    <ResultadoBusqueda scrollContainerRef={scrollContainerRef} /> 
                </div>

            </div>
        </>
    );
}