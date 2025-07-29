import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { BusquedaContext } from "../../context/BusquedaContext";
import { normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula } from "../../utils/normalizarURL";

export default function ResultadoBusqueda() {
    const { resultados, setCiudadSeleccionada, limpiarBusqueda } = useContext(BusquedaContext);
    const navigate = useNavigate();

    const manejarSeleccion = (item) => {
        setCiudadSeleccionada(item);
        limpiarBusqueda();

        const ciudad = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(item.ciudad);
        const departamento = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(item.departamento);
        const pais = normalizarURLConGuionesSinEspaciosCaracterEspecialEnMinuscula(item.pais);

        navigate(`/${ciudad}/${departamento}/${pais}`);
    };

    return (
        <div className="w-full max-h-[40svh] overflow-y-auto
                        rounded-md flex flex-col gap-3 sm:gap-4
                        absolute left-0 top-full
                        border-t border-t-gray-700 dark:border-t-white
                        bg-white dark:bg-gray-900 z-50">

            {resultados.map((item, index) => (
                <div
                    className="
                            w-full p-2 flex flex-row items-center 
                            justify-around cursor-pointer
                            hover:bg-gray-400 dark:hover:bg-gray-700
                            active:bg-gray-300 dark:active:bg-gray-600"
                    key={index}
                    onClick={() => manejarSeleccion(item)}
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
    );
}