import React, { useState, useRef, useContext, useEffect } from "react";
import ResultadoBusqueda from "./ResultadoBusqueda";
import { HiX, HiHome } from "react-icons/hi";
import { BusquedaContext } from "../../context/BusquedaContext";
import useConexionInternet from "../../hooks/useConexionInternet"; 

import { Link } from "react-router-dom";

export default function BarraBusqueda() {
    const { buscarCiudades, limpiarBusqueda } = useContext(BusquedaContext);
    const [mostrarFondo, setMostrarFondo] = useState(true);
    const inputRef = useRef(null);
    
    const { isOnline } = useConexionInternet();

    useEffect(() => {
        if (!isOnline) {
            limpiarBusqueda();
            setMostrarFondo(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [isOnline, limpiarBusqueda]);

    useEffect(() => {
        const body = document.body;
    
        if (!mostrarFondo) {
            // Evita el scroll cuando el fondo no está activo (input visible)
            body.classList.add("overflow-hidden", "touch-none", "overscroll-none");
        } else {
            body.classList.remove("overflow-hidden", "touch-none", "overscroll-none");
        }
    
        return () => {
            body.classList.remove("overflow-hidden", "touch-none", "overscroll-none");
        };
    }, [mostrarFondo]);

    useEffect(() => {
        const input = inputRef.current;
    
        const handleFocus = () => {
            setTimeout(() => {
                input?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300); 
        };
    
        input?.addEventListener("focus", handleFocus);
    
        return () => {
            input?.removeEventListener("focus", handleFocus);
        };
    }, []);
    

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
            {mostrarFondo && (
                <div className="fixed inset-0 w-screen h-screen bg-black/70 touch-none overscroll-none"></div>
            )}
            <div className="my-1 p-2 w-[99%] bg-white dark:bg-gray-900 rounded-md
                                        flex flex-row items-center justify-between relative gap-2">
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

                <ResultadoBusqueda /> 

            </div>
        </>
    );
}