import React from "react";
import Lottie from "lottie-react";
import bienvenida1 from "../../assets/animaciones/lottie_animation/bienvenida/bienvenida1.json";
import bienvenida2 from "../../assets/animaciones/lottie_animation/bienvenida/bienvenida2.json";
import { Link, useNavigate } from "react-router-dom";
import BotonAccion from "../botones/BotonAccion";
import { motion } from "framer-motion";
import MenuHamburguesa from "../menu_hamburguesa/MenuHamburguesa";
import { useAuth } from "../../context/AuthContext";

import useIsMobile from "../../hooks/useIsMobile";
import bienvenidaVistaVertical from "../../assets/img/bienvenida/bienvenidaVistaVertical.png";
import bienvenidaVistaHorizontal from "../../assets/img/bienvenida/bienvenidaVistaHorizontal.png";

import ValorValorValor from "../cabecera/ValorValorValor";

import { useVariasUbicaciones } from "../../context/VariasUbicacionesContext";
import { normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula } from "../../utils/normalizarURL";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";

import ConexionSinConexion from "../conexion_sin_conexion/ConexionSinConexion";

const MotionBotonAccion = motion.create(BotonAccion);

export default function AnimacionBienvenida() {
    const { tipoUsuario } = useAuth();
    const { encendidoFondoVivo } = useFonVivoFormHoraTemp();

    const isMobile = useIsMobile();
    const imgUrl = isMobile ? bienvenidaVistaVertical : bienvenidaVistaHorizontal;

    const { ubicaciones, ubicacionActiva } = useVariasUbicaciones();
    const navigate = useNavigate();

    const handleExplorarClick = () => {
        if (ubicaciones.length === 0) {
            navigate("/add-city-weather");
        } else if (ubicacionActiva) {
            const ciudad = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacionActiva.ciudad);
            const departamento = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacionActiva.departamento);
            const pais = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(ubicacionActiva.pais);
            navigate(`/${ciudad}/${departamento}/${pais}`);
        }
    };

    const backgroundClasses = encendidoFondoVivo
        ? "fixed w-screen h-[100svh]  inset-0 bg-cover bg-center bg-no-repeat brightness-60 dark:brightness-50"
        : "fixed w-screen h-[100svh]  inset-0 bg-cover bg-center bg-no-repeat brightness-60 dark:brightness-50 bg-blue-500 dark:bg-black";

    const backgroundStyle = encendidoFondoVivo
        ? { backgroundImage: `url(${imgUrl})` }
        : {};

    return (
        <div className="min-h-[100svh] w-full overflow-y-auto touch-pan-y">
            <ConexionSinConexion />

            <div
                className={backgroundClasses}
                style={backgroundStyle}>
            </div>

            <motion.div
                className="mt-3 absolute left-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.1 }}>
                <ValorValorValor
                    valor1={
                        <MenuHamburguesa />
                    } />
            </motion.div>

            <div className="w-full min-h-[100svh] flex flex-col
                        items-center justify-between relative touch-pan-y">

                <motion.div
                    className="mt-2 w-full
                                    flex items-center justify-center gap-2 flex-col 
                                    xs4:flex-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}>

                    <motion.div
                        className="w-[45%] h-auto overflow-hidden 
                                            xss:w-[54%]
                                            xs4:w-[27%]
                                            2xs:w-[27%] sm:w-[32%] 
                                            md:w-[33%] lg:w-[33%] 
                                            xl:w-[33%] 2xl:w-[38%]
                                            flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.05, rotate: -1
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <Lottie className="w-full object-cover" animationData={bienvenida1} loop={true} />
                    </motion.div>

                    <motion.div
                        className="w-[45%] h-auto overflow-hidden 
                                            xss:w-[54%]
                                            xs4:w-[27%]
                                            2xs:w-[27%] sm:w-[32%] 
                                            md:w-[33%] lg:w-[33%] 
                                            xl:w-[33%] 2xl:w-[38%]
                                            flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.05, rotate: -1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        <Lottie className="w-full object-cover" animationData={bienvenida2} loop={true} />
                    </motion.div>

                </motion.div>

                <motion.div
                    className="mb-1 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <p className="font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-blue-500 to-green-400
                        text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-5xl">
                        <span translate="no">TuClima360</span>
                    </p>
                </motion.div>

                {!tipoUsuario && (
                    <motion.div className="mb-3 lg:mb-5 w-full flex flex-row items-center justify-around z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}>

                        <Link to="/register">
                            <MotionBotonAccion
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                nombre="Register" className="border border-amber-400 p-1 2xl:p-3
                                            bg-amber-300 active:bg-amber-200
                                            rounded-md cursor-pointer"/>
                        </Link>

                        <Link to="/login">
                            <MotionBotonAccion
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                nombre="Login" className="border border-amber-400 p-1 2xl:p-3
                                            bg-amber-300 active:bg-amber-200
                                            rounded-md cursor-pointer"/>
                        </Link>
                    </motion.div>
                )}

                {tipoUsuario && (
                    <motion.div className="mb-3 lg:mb-5 w-full flex flex-row items-center justify-around z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}>

                        <MotionBotonAccion
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            nombre="Explore Weather"
                            className="border border-blue-800 p-1 2xl:p-3
                                            bg-blue-800 active:bg-blue-500
                                            text-white
                                            rounded-md cursor-pointer"
                            onClick={handleExplorarClick}
                        />
                    </motion.div>
                )}

            </div>

        </div>
    );
}