import React, { useState } from "react";
import { HiOutlineUser, HiHome, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import ValorValorValor from "../cabecera/ValorValorValor";

import iconoGoogle from "../../assets/iconos/iconoGoogle.svg";
import iconoFacebook from "../../assets/iconos/iconoFacebook.svg";

import FooterCompleto from "../footer/FooterCompleto";

import { motion, useAnimation } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Toast from "../toast/Toast";

import ConexionSinConexion from "../conexion_sin_conexion/ConexionSinConexion";

import useIsMobile from "../../hooks/useIsMobile";

export default function RegisIniSeccion({ titulo, lema, iconoUsuario, continuarComoInvitado,
    footerInfoCuenta, footerAccion, footerAccionInvisible, ...props }) {

    const controls = useAnimation();
    const MotionHiHome = motion.create(HiHome);
    const MotionHiOutlineQuestionMarkCircle = motion.create(HiOutlineQuestionMarkCircle);

    const isMobile = useIsMobile();

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInvitadoLogin = () => {
        login("guest");
        navigate("/");
    };

    const handleHelp = () => navigate("/help");

    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [showToast3, setShowToast3] = useState(false);

    const handleToastNumeroCorreo = () => {
        setShowToast1(true);
        setTimeout(() => setShowToast1(false), 2500);
    }

    const handleToastGoogle = () => {
        setShowToast2(true);
        setTimeout(() => setShowToast2(false), 2500);
    }

    const handleToastFacebook = () => {
        setShowToast3(true);
        setTimeout(() => setShowToast3(false), 2500);
    }

    return (
        <div className="bg-amber-50 dark:bg-black w-full h-[100svh] 
                        flex flex-col items-center 
                        justify-start gap-3 
                        overflow-y-auto overflow-x-hidden">
            
            <ConexionSinConexion />

            <Toast
                show1={showToast1} message1="Phone and email not available"
                show2={showToast2} message2="Google not available"
                show3={showToast3} message3="Facebook not available"
            />

            <ValorValorValor

                valor1={<Link to="/">
                    <MotionHiHome
                        className="text-black dark:text-gray-200"
                        whileHover={{ scale: 1.25 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }} />
                </Link>}


                valor3={<MotionHiOutlineQuestionMarkCircle
                    className="
                        text-black dark:text-gray-200"
                    onClick={handleHelp}
                    whileHover={{ scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />}

            />

            <div className="w-full h-[100svh] flex flex-col justify-between gap-1">

                <div className="flex flex-col items-center gap-3">
                    <motion.div
                        className="w-[95%] flex flex-col items-center gap-1"
                        animate={controls}
                        initial={{ x: 0, opacity: 1 }}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-bold text-center
                                text-black dark:text-gray-200 
                                text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-5xl">
                                {titulo}
                            </p>

                            <p className="font-extrabold text-transparent bg-clip-text 
                                        bg-gradient-to-r from-blue-500 to-green-400
                                    text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-5xl"
                            >
                                <span translate="no">TuClima360</span>
                            </p>

                        </div>

                        <div className="w-[85%]">
                            <p className="text-gray-900 dark:text-gray-500 text-center
                                        text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl">
                                {lema}
                            </p>
                        </div>

                    </motion.div>

                    <div className="w-[95%] flex flex-col gap-4 md:gap-7 lg:gap-7 xl:gap-7 2xl:gap-8">

                        <motion.div
                            onClick={handleToastNumeroCorreo}
                            className="p-2 bg-red-600 dark:bg-gray-900 
                                    active:bg-red-400 dark:active:bg-gray-700
                                    border border-gray-600 rounded-md 
                                    flex flex-row items-center justify-between gap-2 cursor-pointer"
                            animate={controls}
                            initial={{ x: 0, opacity: 1 }}
                        >

                            <div className="h-auto overflow-hidden flex flex-col items-center justify-center
                                        w-[5%] sm:w-[4%] md:w-[4%] lg:w-[3%] xl:w-[3%] 2xl:w-[3%]">
                                <HiOutlineUser className="text-white text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl" />
                            </div>

                            <div className="">
                                <p className="font-bold text-white text-center
                                        text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl">
                                    {iconoUsuario}
                                </p>
                            </div>

                            <div className=""></div>

                        </motion.div>

                        <motion.div
                            onClick={handleToastGoogle}
                            className="border border-gray-600 p-2 
                                    bg-white dark:bg-gray-700 
                                    active:bg-gray-200 dark:active:bg-gray-600
                                    rounded-md flex flex-row items-center justify-between 
                                    gap-2 cursor-pointer"
                            animate={controls}
                            initial={{ x: 0, opacity: 1 }}
                        >

                            <div className="w-[5%] sm:w-[4%] md:w-[4%] lg:w-[3%] xl:w-[3%] 2xl:w-[3%]
                                        h-auto overflow-hidden flex flex-col items-center justify-center">
                                <img className="max-w-full object-contain" src={iconoGoogle} alt={iconoGoogle} />
                            </div>

                            <div className="">
                                <p className="font-bold text-center text-black dark:text-white 
                                            text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl">
                                    Continue with Google
                                </p>
                            </div>

                            <div className=""></div>

                        </motion.div>

                        <motion.div
                            onClick={handleToastFacebook}
                            className="border  border-gray-600 p-2 
                                    bg-white dark:bg-gray-700 
                                    active:bg-gray-200 dark:active:bg-gray-600
                                    rounded-md flex flex-row items-center justify-between 
                                    gap-2 cursor-pointer"
                            animate={controls}
                            initial={{ x: 0, opacity: 1 }}
                        >

                            <div className="w-[5%] sm:w-[4%] md:w-[4%] lg:w-[3%] xl:w-[3%] 2xl:w-[3%]
                                        h-auto overflow-hidden flex flex-col items-center justify-center">
                                <img className="max-w-full object-contain" src={iconoFacebook} alt={iconoFacebook} />
                            </div>

                            <div className="">
                                <p className="font-bold text-black text-center dark:text-white 
                                        text-base  md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl">
                                    Continue with Facebook
                                </p>
                            </div>

                            <div className=""></div>

                        </motion.div>

                        {continuarComoInvitado && (
                            <motion.div
                                onClick={handleInvitadoLogin}
                                className="border  border-violet-600 p-2 
                                    bg-violet-600 dark:bg-violet-900  
                                    active:bg-violet-500 dark:active:bg-violet-600
                                    rounded-md flex flex-row items-center justify-center cursor-pointer"
                                animate={controls}
                                initial={{ x: 0, opacity: 1 }}
                            >

                                <div className="">
                                    <p className="font-bold text-white text-center 
                                        text-base  md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl">
                                        Continue with guest
                                    </p>
                                </div>

                            </motion.div>
                        )}

                    </div>

                </div>

                <div className="w-full">
                    <FooterCompleto
                        footerInfoCuenta={footerInfoCuenta}
                        footerAccion={footerAccion}
                        footerAccionInvisible={footerAccionInvisible}
                        controls={controls}
                    />
                </div>

            </div>

        </div>
    );
}