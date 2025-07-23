import React, { useState, useRef, useEffect } from "react";
import { HiMenu, HiUserCircle, HiExclamationCircle } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CerrarSesion from "../cerrar_sesion/CerrarSesion";
import IconoDarkMode2 from "../../assets/iconos/IconoDarkMode2";
import IconoFondoVivo from "../../assets/iconos/IconoFondoVivo";
import IconoFormatoHoras from "../../assets/iconos/IconoFormatoHoras";
import IconoTemperatura from "../../assets/iconos/IconoTemperatura";

import { useAuth } from "../../context/AuthContext";
import { useVariasUbicaciones } from "../../context/VariasUbicacionesContext";

const MotionHiMenu = motion.create(HiMenu);

export default function MenuHamburguesa({ className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [menuAnimationComplete, setMenuAnimationComplete] = useState(true);
    const menuRef = useRef();

    const { capitalizedNombreUsuario, tipoUsuario } = useAuth();
    const { limpiarUbicaciones, hayUbicacionesDisponibles } = useVariasUbicaciones();
    const location = useLocation();

    const isRootPathInicio = location.pathname === "/";

    const navigate = useNavigate();

    const handleInicio = () => navigate("/");

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const toggleMenu = () => {
        if (menuAnimationComplete) {
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
                setIsOpen(prev => !prev);
                setMenuAnimationComplete(false);
            }, 300)

        }
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            closeMenu();
        }
    };

    // La función handleDeleteAllWeathers permite eliminar todas las ubicaciones
    const handleDeleteAllWeathers = () => {
        limpiarUbicaciones();
        closeMenu();
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    // Crear un array de items con keys únicos
    const menuItems = [];

    if (tipoUsuario) {
        const labelUsuario = tipoUsuario === "guest" ?
            (
                <div className="flex flex-row items-center gap-2 2xl:gap-3 w-fit">
                    <HiUserCircle className="xss:text-xs 2xs:text-base md:text-xl 2xl:text-3xl 
                                    text-black dark:text-gray-300"/>
                    <p className="text-black dark:text-gray-300">{capitalizedNombreUsuario}</p>
                </div>
            )
            : capitalizedNombreUsuario;

        menuItems.push(
            { id: "darkmode", label: <IconoDarkMode2 /> },
            { id: "livebackground", label: <IconoFondoVivo /> },
            { id: "hourformat", label: <IconoFormatoHoras /> },
            { id: "temperaturamode", label: <IconoTemperatura /> },
        );

        if (isRootPathInicio) {
            menuItems.push(
                { id: "addweather", label: "Add Weather", path: "/add-city-weather" },
                { id: "managelocation", label: "Manage Location", path: "/manage-location" }
            );

            // Solo mostrar "Delete All Weathers" si hay ubicaciones disponibles
            if (hayUbicacionesDisponibles()) {
                menuItems.push({
                    id: "deleteAllweathers",
                    label: (
                        <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
                            <span className="text-red-700">Delete All Weathers</span>
                            <span className="text-red-700">
                                (Fixes Redirect With Wrong Default Location)
                            </span>
                        </div>
                    ),
                    action: handleDeleteAllWeathers
                });
            }
        }


        if (isRootPathInicio) {
            menuItems.push(
                { id: "termsofservice", label: "Terms Of Service", path: "/terms-of-service" },
                { id: "privacypolicy", label: "Privacy Policy", path: "/privacy-policy" }
            );
        }
        menuItems.push(
            {
                id: "known-issues",
                label: (
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "4px"}}>
                        <p className="text-red-700">Known Issues</p>
                        <HiExclamationCircle className="xss:text-xs 2xs:text-base 
                                                        md:text-xl 2xl:text-3xl 
                                                        text-black dark:text-gray-300"/>
                    </div>
                ), path: "/known-issues"
            },


            { id: "user", label: labelUsuario },
            { id: "sign-out", label: <CerrarSesion />, path: "/login" }
        );

    } else {
        menuItems.push(
            { id: "noseccion", label: "Please, To Access All Menu Features, Please Log In." }
        );
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.2,
            }
        })
    };

    return (
        <>
            <MotionHiMenu
                className={`text-xl md:text-2xl 2xl:text-4xl 
                        text-white cursor-pointer z-50 ${className}`}
                whileHover={{ scale: 1.25 }}
                animate={{ rotate: isClicked ? 90 : (isOpen ? 90 : 0) }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: isClicked ? 0 : 0.3 }}
                onClick={toggleMenu}
            />


            <AnimatePresence
                onExitComplete={() => setMenuAnimationComplete(true)}
            >
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-gray-300/30 dark:bg-gray-700/60 
                                        backdrop-blur-md z-50"
                            onClick={closeMenu}
                        />

                        <motion.aside
                            ref={menuRef}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="fixed top-0 left-0 h-full overflow-y-auto 
                                        w-65
                                        xss:w-70 sm:w-100 md:w-120 
                                        lg:w-150 xl:w-170 2xl:w-175
                                bg-amber-100 dark:bg-black shadow-2xl z-50 p-6 flex flex-col gap-8 cursor-default"
                        >
                            <p onClick={handleInicio} className="w-fit 
                                        text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-5xl
                                        font-extrabold text-transparent bg-clip-text 
                                        bg-gradient-to-r from-blue-500 to-green-400 cursor-pointer">
                                <span translate="no">TuClima360</span>
                            </p>

                            <motion.ul className="flex flex-col items-start gap-6 2xl:gap-15  mt-4 w-fit">
                                {menuItems.map((item, index) => (
                                    <motion.li
                                        key={item.id}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={itemVariants}
                                        className="capitalize text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                                            text-black dark:text-gray-300 hover:text-blue-500 w-fit"
                                    >

                                        {item.path ? (
                                            <Link to={item.path} className="w-fit inline-flex 
                                                                            items-center cursor-pointer">
                                                {item.label}
                                            </Link>
                                        ) : item.action ? (
                                            <div
                                                className="w-fit inline-flex items-center cursor-pointer"
                                                onClick={item.action}
                                            >
                                                {item.label}
                                            </div>
                                        ) : (
                                            <div className="w-fit inline-flex items-center">
                                                {item.label}
                                            </div>
                                        )}

                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.aside>
                    </>

                )}
            </AnimatePresence>
        </>
    );
}