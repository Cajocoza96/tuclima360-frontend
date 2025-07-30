import React, { useState, useRef, useContext, useEffect } from "react";
import ResultadoBusqueda from "./ResultadoBusqueda";
import { HiX, HiHome } from "react-icons/hi";
import { BusquedaContext } from "../../context/BusquedaContext";
import useConexionInternet from "../../hooks/useConexionInternet"; 

import { Link } from "react-router-dom";

import { useCloseKeyboardOnScroll } from "../../hooks/useCloseKeyboardOnScroll";

export default function BarraBusqueda() {
    const { buscarCiudades, limpiarBusqueda, resultados } = useContext(BusquedaContext);
    const [mostrarFondo, setMostrarFondo] = useState(true);
    const inputRef = useRef(null);
    const overlayRef = useRef(null);
    const scrollContainerRef = useRef(null);
    
    const { isOnline } = useConexionInternet();

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

    const manejarCambio = (e) => {
        if (isOnline) {
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

    // Manejar clics/toques en el overlay
    const manejarClicOverlay = (e) => {
        // Solo cerrar si el clic/toque es directamente en el overlay
        if (e.target === e.currentTarget) {
            cerrarFondo();
        }
    };

    return (
        <>
            {mostrarFondo && resultados && resultados.length > 0 && (
                <div 
                    ref={overlayRef}
                    className="fixed inset-0 w-screen h-[100svh] bg-black/70 z-40"
                    style={{ 
                        overscrollBehavior: 'none',
                        touchAction: 'manipulation' // Permite toques básicos pero previene zoom
                    }}
                    onClick={manejarClicOverlay}
                    onTouchEnd={manejarClicOverlay} // Para dispositivos táctiles
                ></div>
            )}
            <div className="my-1 p-2 w-[99%] bg-white dark:bg-gray-900 rounded-md
                                        flex flex-row items-center 
                                        justify-around relative gap-3 z-50">
                <Link to="/">
                    <HiHome className="text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl 
                                        text-black dark:text-gray-300 cursor-pointer"/>
                </Link>

                <input 
                    ref={inputRef}
                    className="bg-white dark:bg-gray-900 w-[85%] border-none
                                                focus:outline-none focus:ring-0
                                                text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl
                                                text-black dark:text-gray-200
                                                placeholder:text-gray-500 dark:placeholder:text-gray-500
                                                placeholder:text-base placeholder:xss:text-base
                                                placeholder:2xs:text-base placeholder:md:text-xl
                                                placeholder:2xl:text-3xl"
                    type="text"
                    placeholder={isOnline ? "Write the name of the city" : "No internet connection"}
                    onChange={manejarCambio}
                    disabled={!isOnline}
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