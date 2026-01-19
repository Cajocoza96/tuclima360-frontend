import React from "react";
import ValorValorValor from "../cabecera/ValorValorValor";
import { HiX } from "react-icons/hi";
import ClimasUbicados from "../clima/ClimasUbicados";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function GestioUbicaPrincipal({ visible, onClose }) {

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className="h-[75dvh] w-[90%]
                        bg-blue-900 dark:bg-gray-800
                        absolute top-10 z-70
                        flex flex-col items-center justify-between overflow-hidden">

                    {/* Header fijo */}
                    <div className="w-[95%] sticky top-0 bg-blue-900 dark:bg-gray-800 z-10">
                        <ValorValorValor
                            valor2="Location"
                            className="text-gray-200"
                            valor3={
                                <HiX className="text-gray-200 cursor-pointer" onClick={onClose} />
                            }
                        />
                    </div>

                    {/* Contenido scrollable */}
                    <div className="flex-1 w-[95%] overflow-y-auto px-4">
                        <ClimasUbicados onClose={onClose} />
                    </div>

                    {/* Footer fijo */}
                    <div className="w-fit sticky bottom-0 bg-blue-900 dark:bg-gray-800 z-10 py-1 px-4">
                        <Link to="/manage-location">
                        <p className="mb-2 2xl:mb-4 text-white cursor-pointer
                            text-right text-xl md:text-2xl 2xl:text-4xl ">
                            Manage location
                        </p>
                        </Link>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}