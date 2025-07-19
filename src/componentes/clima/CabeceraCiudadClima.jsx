import React, { useContext } from "react";
import MenuHamburguesa from "../menu_hamburguesa/MenuHamburguesa";
import { HiPlus } from "react-icons/hi";
import ValorValorValor from "../cabecera/ValorValorValor";
import { motion } from "framer-motion";
import { BusquedaContext } from "../../context/BusquedaContext";
import { useNavigate } from "react-router-dom";

const MotionHiPlus = motion.create(HiPlus);

export default function CabeceraCiudadClima({ onOpenUbicacion }) {
    const { ciudadSeleccionada } = useContext(BusquedaContext);

    const navigate = useNavigate();

    const handleAgregarCiudadClima = () => navigate("/add-city-weather");

    return (
        <div className="flex flex-row items-center justify-between z-40">
            <ValorValorValor
                valor1={<MenuHamburguesa />}
                valor2={
                    <p
                        className="text-center text-white cursor-pointer"
                        onClick={onOpenUbicacion} // <<< clic que abre GestioUbicaPrincipal
                    >
                        <span>{ciudadSeleccionada?.ciudad || null}</span>
                    </p>
                }
                valor3={
                        <MotionHiPlus
                            onClick={handleAgregarCiudadClima}
                            className="text-white focus:outline-none cursor-pointer"
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            aria-hidden="false"
                        />
                }
            />
        </div>
    );
}
