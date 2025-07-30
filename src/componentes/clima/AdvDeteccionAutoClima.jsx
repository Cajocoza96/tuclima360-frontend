import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import infoTarjetaClima from "../../data/infoTarjetaClima.json";

export default function AdvDeteccionAutoClima({ mensajeNoConexion }) {
    const mensajeAdvertencia = infoTarjetaClima.agregarCiudad.mensajeAdvertenciaSinGPS;
    const [reiniPosText, setReiniPosText] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    // Función para medir dimensiones
    const measureDimensions = () => {
        if (containerRef.current && textRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const textRect = textRef.current.getBoundingClientRect();
            
            setContainerWidth(containerRect.width);
            setTextWidth(textRect.width);
        }
    };

    useEffect(() => {
        setReiniPosText(prev => prev + 1);
        
        // Medir dimensiones después de que el componente se monte
        const timer = setTimeout(() => {
            measureDimensions();
        }, 100);

        // Listener para cambios de tamaño de ventana
        const handleResize = () => {
            measureDimensions();
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Calcular posiciones iniciales y finales
    const initialX = containerWidth;
    const finalX = -textWidth;

    return (
        <div 
            ref={containerRef}
            className="relative w-full overflow-hidden h-8 md:h-10 2xl:h-12"
        >
            {!mensajeNoConexion && (
                <>
                    {/* Texto invisible para medir dimensiones */}
                    <p
                        ref={textRef}
                        className="invisible absolute ml-20 text-white whitespace-nowrap
                                    text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl"
                        aria-hidden="true"
                    >
                        {mensajeAdvertencia}
                    </p>
                    
                    {/* Texto animado visible */}
                    {containerWidth > 0 && textWidth > 0 && (
                        <motion.p
                            className="ml-20 text-white whitespace-nowrap
                                        text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl"
                            key={`${reiniPosText}-${containerWidth}-${textWidth}`}
                            initial={{ x: initialX }}
                            animate={{ x: finalX }}
                            transition={{
                                duration: Math.max(10, (containerWidth + textWidth) / 50), // Duración dinámica
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {mensajeAdvertencia}
                        </motion.p>
                    )}
                </>
            )}

            {mensajeNoConexion && (
                <p className="text-center text-white 
                                text-base xss:text-base 2xs:text-base md:text-xl 2xl:text-3xl">
                    {mensajeNoConexion}
                </p>
            )}
        </div>
    );
}