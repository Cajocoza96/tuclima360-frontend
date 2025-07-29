import React, { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { BusquedaContext } from "../../context/BusquedaContext";
import { normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula } from "../../utils/normalizarURL";

export default function ResultadoBusqueda({ scrollContainerRef }) {
    const { resultados, setCiudadSeleccionada, limpiarBusqueda } = useContext(BusquedaContext);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    // Usar la ref pasada como prop o crear una local como fallback
    const internalScrollRef = useRef(null);
    const scrollRef = scrollContainerRef || internalScrollRef;

    const manejarSeleccion = (item) => {
        setCiudadSeleccionada(item);
        limpiarBusqueda();

        const ciudad = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(item.ciudad);
        const departamento = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(item.departamento);
        const pais = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(item.pais);

        navigate(`/${ciudad}/${departamento}/${pais}`);
    };

    // Manejo de eventos touch más simplificado
    useEffect(() => {
        const container = containerRef.current;
        const scrollContainer = scrollRef.current;

        if (!container || !scrollContainer) return;

        const preventPropagation = (e) => {
            e.stopPropagation();
        };

        const handleTouchStart = (e) => {
            e.stopPropagation();
        };

        const handleTouchMove = (e) => {
            e.stopPropagation();
            
            const scrollContainer = scrollRef.current;
            if (!scrollContainer) return;
            
            // Permitir scroll normal dentro del contenedor
            const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight;
            if (!isScrollable) {
                // Solo prevenir si no es scrollable
                e.preventDefault();
            }
        };

        const handleTouchEnd = (e) => {
            e.stopPropagation();
        };

        // Añadir event listeners
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: false });
        container.addEventListener('touchcancel', preventPropagation, { passive: false });

        // Prevenir eventos de mouse también
        container.addEventListener('mousedown', preventPropagation);
        container.addEventListener('mousemove', preventPropagation);
        container.addEventListener('mouseup', preventPropagation);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', preventPropagation);
            container.removeEventListener('mousedown', preventPropagation);
            container.removeEventListener('mousemove', preventPropagation);
            container.removeEventListener('mouseup', preventPropagation);
        };
    }, [resultados, scrollRef]);

    // Si no hay resultados, no renderizar nada
    if (!resultados || resultados.length === 0) {
        return null;
    }

    return (
        <div 
            ref={containerRef}
            className="w-full max-h-[30svh] 2xs:max-h-[50svh]
                        rounded-md flex flex-col
                        absolute left-0 top-full
                        border-t border-t-gray-700 dark:border-t-white
                        bg-white dark:bg-gray-900 z-50
                        overflow-hidden touch-none overscroll-none
                        isolate"
            style={{ 
                touchAction: 'pan-y',
                overscrollBehavior: 'contain',
                position: 'absolute',
                willChange: 'transform'
            }}
        >
            
            {/* Contenedor con scroll controlado */}
            <div 
                ref={scrollRef}
                className="max-h-[30svh] 2xs:max-h-[50svh]
                            overflow-y-auto overscroll-contain
                            flex flex-col gap-3 sm:gap-4 p-0
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                style={{ 
                    touchAction: 'pan-y',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch'
                }}
            >

                {resultados.map((item, index) => (
                    <div
                        className="w-full p-2 flex flex-row items-center 
                                justify-around cursor-pointer flex-shrink-0
                                hover:bg-gray-400 dark:hover:bg-gray-700
                                active:bg-gray-300 dark:active:bg-gray-600
                                touch-manipulation"
                        key={index}
                        onClick={() => manejarSeleccion(item)}
                        style={{ touchAction: 'manipulation' }}
                    >
                        <HiLocationMarker className="text-base xss:text-base 2xs:text-base 
                                                        md:text-xl 2xl:text-3xl 
                                                    text-black dark:text-gray-300"/>
                        <div className="w-[90%]">
                            <span className="text-base xss:text-base 2xs:text-base 
                                                        md:text-xl 2xl:text-3xl 
                                                    text-black dark:text-gray-300">
                                <span translate="no">{item.ciudad} - </span>
                            </span> <span className="text-base xss:text-base 2xs:text-base 
                                                        md:text-xl 2xl:text-3xl
                                                    text-black dark:text-gray-300">
                                <span translate="no">{item.departamento} / </span>
                            </span>
                            <span className="text-base xss:text-base 2xs:text-base 
                                                        md:text-xl 2xl:text-3xl
                                                    text-black dark:text-gray-300">
                                <span translate="no"> {item.pais} </span>
                            </span>
                        </div>

                        <div className=""></div>

                    </div>
                ))}
            </div>
        </div>
    );
}