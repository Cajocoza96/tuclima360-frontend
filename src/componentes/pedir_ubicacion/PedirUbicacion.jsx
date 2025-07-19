import React, { useEffect } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import pedirUbiVistaVertical from "../../assets/img/pedir_ubicacion/pedirUbiVistaVertical.png";
import pedirUbiVistaHorizontal from "../../assets/img/pedir_ubicacion/pedirUbiVistaHorizontal.png";
import Lottie from "lottie-react";
import iconoUbicacion from "../../assets/animaciones/lottie_animation/ubicacion/iconoUbicacion.json";
import infoTarjetaClima from "../../data/infoTarjetaClima.json";
import BotonAccion from "../botones/BotonAccion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useGeolocation from "../../hooks/useGeolocation";
import ConexionSinConexion from "../conexion_sin_conexion/ConexionSinConexion";

const MotionBotonAccion = motion.create(BotonAccion);

export default function PedirUbicacion() {
    const isMobile = useIsMobile();
    const imgUrl = isMobile ? pedirUbiVistaVertical : pedirUbiVistaHorizontal;

    const pedirUbicacion = infoTarjetaClima.pedirUbicacion;

    const { requestLocation, position, status, error } = useGeolocation();

    useEffect(() => {
        console.log("Estado actual:", status);
        console.log("Hay Error:", error);
        console.log("Esta es la Posición:", position);

        if (status === "granted") {
            alert("Ubicación obtenida con éxito.");
            console.log("Posición:", position);
        } else if (status === "denied") {
            alert("El usuario rechazó el permiso de ubicación.");
        } else if (status === "unavailable") {
            alert("La geolocalización no es compatible con este navegador.");
        } else if (status === "error") {
            alert("Error al obtener la ubicación: " + error);
        }
    }, [status]);

    return (
        <div className="flex flex-col items-center">

            <ConexionSinConexion />

            <div
                className="fixed inset-0 w-screen h-screen 
                            bg-cover bg-center bg-no-repeat
                            flex flex-col items-center 
                            brightness-40 dark:brightness-30"
                style={{ backgroundImage: `url(${imgUrl})` }}>
            </div>


            <div className="w-[95%] h-screen flex flex-col overflow-y-auto overflow-x-hidden
                            2xs:flex-row sm:flex-row md:flex-row 
                            lg:flex-row xl:flex-row 2xl:flex-row
                            items-center justify-around sm:gap-2 z-50">

                <div className="my-2 flex flex-col items-center gap-3 z-50">
                    <div className=" rounded-[50%] bg-blue-500
                                    mx-auto w-[30%] sm:w-[30%] md:w-[20%] 
                                    lg:w-[20%] xl:w-[25%] 2xl:w-[30%]
                                    h-auto overflow-hidden flex flex-col items-center justify-center z-50"
                    >
                        <Lottie className="w-full object-cover" animationData={iconoUbicacion} loop={true} />
                    </div>

                    <div className="w-[95%] text-justify flex flex-col items-center gap-3">
                        <p className="font-bold text-white text-center
                                            text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl"
                            style={{ textShadow: "1px 1px 1px black" }}>
                            {pedirUbicacion.titulo}
                        </p>

                        <div className="flex flex-col items-center gap-2">
                            <p className="font-bold text-white
                                            text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl"
                                style={{ textShadow: "1px 1px 1px black" }}>
                                {pedirUbicacion.parrafo1}
                            </p>

                            <p className="font-bold text-white
                                            text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl"
                                style={{ textShadow: "1px 1px 1px black" }}>
                                {pedirUbicacion.parrafo2}
                            </p>
                        </div>

                        <p className="text-center font-bold text-yellow-500 underline
                                            text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl
                                            cursor-pointer"
                            style={{ textShadow: "1px 1px 1px black" }}>
                            {pedirUbicacion.politicaDePrivacidad}
                        </p>
                    </div>

                </div>


                <div className="my-3 w-full flex flex-col items-center gap-1 z-50">

                    <div className="w-full">
                        <MotionBotonAccion nombre="Permitir"
                            className="border border-blue-600 p-1 w-full
                                            bg-blue-600 active:bg-blue-500
                                            text-white
                                            rounded-lg cursor-pointer"
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={requestLocation}
                        />
                    </div>

                    <p className="font-bold text-white 
                                            text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl"
                        style={{ textShadow: "1px 1px 1px black" }}>
                        O
                    </p>

                    <Link to="/agregar-ciudad-clima" className="w-full">
                        <MotionBotonAccion nombre="Búsqueda manual"
                            className="border border-blue-600 p-1 w-full
                                            bg-blue-600 active:bg-blue-500
                                            text-white
                                            rounded-lg cursor-pointer"
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}