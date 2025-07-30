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
    // Nueva ref para el contenedor de scroll
    const scrollContainerRef = useRef(null);
    
    const { isOnline } = useConexionInternet();

    // Pasar la referencia del contenedor al hook
    useCloseKeyboardOnScroll({
        container: scrollContainerRef,
        delay: 100 // Pequeño delay para mejor UX
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
            // Prevenir el scroll del fondo cuando el overlay está activo
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

    return (
        <>
            {mostrarFondo && resultados && resultados.length > 0 && (
                <div 
                    ref={overlayRef}
                    className="fixed inset-0 w-screen h-[100svh] bg-black/70 overscroll-none z-40"
                    style={{ 
                        touchAction: 'none',
                        overscrollBehavior: 'none'
                    }}
                    onClick={cerrarFondo}
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