import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useConexionInternet from "../../hooks/useConexionInternet";
import InfoEstadoCargaConexion from "../../data/InfoEstadoCargaConexion.json";

export default function ConexionSinConexion() {
    const { isOnline, justReconnected, resetReconnectionState } = useConexionInternet();
    const [showReconnected, setShowReconnected] = useState(false);

    const mensajeSinConexion = InfoEstadoCargaConexion.conexion.sinConexion;
    const mensajeConexion = InfoEstadoCargaConexion.conexion.conConexion;

    useEffect(() => {
        // Cuando se reconecta, mostrar mensaje de conexión
        if (justReconnected) {
            setShowReconnected(true);

            // Después de 3 segundos, ocultar el mensaje y resetear el estado
            const timer = setTimeout(() => {
                setShowReconnected(false);
                resetReconnectionState();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [justReconnected, resetReconnectionState]);

    return (
        <AnimatePresence>
            {/* Overlay sin conexión - bloquea toda interacción */}
            {!isOnline && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        backgroundColor: [
                            'rgba(239, 68, 68, 0.3)',
                            'rgba(239, 68, 68, 0.5)',
                            'rgba(239, 68, 68, 0.3)',
                            'rgba(239, 68, 68, 0.5)'
                        ]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 0.3 },
                        backgroundColor: {
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                    className="fixed inset-0 bg-red-500/40 flex items-center justify-center z-100"
                    style={{
                        pointerEvents: 'all'
                    }}
                >
                    <div className="bg-yellow-500 py-2 px-2 rounded-md shadow-lg">
                        <p className="text-black text-center font-semibold
                                        text-xl 2xs:text-2xl 2xl:text-3xl">
                            {mensajeSinConexion}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Overlay de reconexión - se muestra 3 segundos */}
            {showReconnected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        backgroundColor: [
                            'rgba(34, 197, 94, 0.3)',
                            'rgba(34, 197, 94, 0.5)',
                            'rgba(34, 197, 94, 0.4)',
                            'rgba(34, 197, 94, 0.5)'
                        ]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 0.3 },
                        backgroundColor: {
                            duration: 0.8,
                            ease: "easeInOut",
                            repeat: 3,
                            repeatType: "loop"
                        }
                    }}
                    className="fixed inset-0 bg-green-500/40 flex items-center justify-center z-100"
                >
                    <div className="bg-yellow-500 py-2 px-2 rounded-md shadow-lg">
                        <p className="text-black text-center font-semibold
                                        text-xl 2xs:text-2xl 2xl:text-3xl">
                            {mensajeConexion}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}