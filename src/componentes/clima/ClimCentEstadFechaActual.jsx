import React, { useContext } from "react";
import Lottie from "lottie-react";
import TablaPretemVieHumUv from "./TablaPretemVieHumUv";
import { ClimaContext } from "../../context/ClimaContext";
import { obtenerDescripcionClima } from "../../utils/formato";
import { obtenerAnimacionClima } from "../../utils/animacionesLottie";
import { FechaHoraContext } from "../../context/FechaHoraContext";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";
import { BusquedaContext } from "../../context/BusquedaContext";

export default function ClimCentEstadFechaActual() {
    const { clima, obtenerTemperaturaConvertida } = useContext(ClimaContext);
    const { hora12, ampm, fechaLarga, hora24, hora24Completa, zoneName, abbreviation } = useContext(FechaHoraContext);
    const { encendidoFormatoHora, encendidoTemperaturaModo } = useFonVivoFormHoraTemp();

    const { ciudadSeleccionada } = useContext(BusquedaContext);

    if (!clima || hora24 === null || hora24 === undefined) {
        return (
            <div className="mb-3 grid grid-cols-1 2xs:grid-cols-2 gap-2 z-30">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white">Information Climate...</p>
                </div>
            </div>
        );
    }

    const descripcion = obtenerDescripcionClima(clima.codigoClima);

    // Obtener la animación correcta según la hora del día
    const animacion = obtenerAnimacionClima(clima.codigoClima, hora24);

    // Obtener la temperatura convertida según el modo seleccionado
    const temperaturaConvertida = obtenerTemperaturaConvertida(clima.temperatura, encendidoTemperaturaModo);

    return (
        <div className="mb-3 grid grid-cols-1 2xs:grid-cols-2 gap-2 2xl:gap-4 z-30">

            <div className="flex flex-col items-center gap-2">

                <div className="w-[35%] 2xs:w-[50%] 2xl:w-[55%]
                                h-auto overflow-hidden flex flex-col 
                                items-center justify-center">

                    {animacion && (
                        <Lottie className="w-full object-cover" animationData={animacion} loop={true} />
                    )}
                </div>

                <div className="flex flex-col items-center gap-3 md:gap-5">

                <div className="flex flex-row items-center">
                    <p className="text-4xl 2xs:text-2xl md:text-3xl 2xl:text-4xl text-white">
                        <span translate="no">{temperaturaConvertida}</span>
                    </p>
                    {encendidoTemperaturaModo ? (
                        <>
                            <p className="text-4xl 2xs:text-2xl md:text-3xl 2xl:text-4xl text-white">
                                <span translate="no">°</span>
                            </p>
                            <p className="text-4xl 2xs:text-2xl md:text-3xl 2xl:text-4xl text-white">
                                <span translate="no">C</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-4xl 2xs:text-2xl md:text-3xl 2xl:text-4xl text-white">
                                <span translate="no">°</span>
                            </p>
                            <p className="text-4xl 2xs:text-2xl md:text-3xl 2xl:text-4xl text-white">
                                <span translate="no">F</span>
                            </p>
                        </>
                    )}
                </div>

                <p className="text-center text-xl md:text-2xl 2xl:text-4xl text-white">
                    {descripcion}
                </p>

                <div className="flex flex-col items-center">
                    <p className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                        {encendidoFormatoHora ? (
                            <span translate="no">{hora24Completa}</span>
                        ) : (
                            <>
                                <span translate="no">{hora12} </span>
                                <span translate="no">{ampm}</span>
                            </>
                        )}
                    </p>

                    <p className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                        {fechaLarga}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                        {ciudadSeleccionada?.ciudad || null}
                    </span>
                    <span className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                        {ciudadSeleccionada?.departamento || null}
                    </span>
                    <span className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                        {ciudadSeleccionada?.pais || null}
                    </span>
                </div>

                <div className="flex flex-col items-center">
                    {zoneName && (
                        <p className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                            <span translate="no">{zoneName}</span>
                        </p>
                    )}

                    {abbreviation && (
                        <p className="text-center text-base md:text-xl 2xl:text-4xl text-white">
                            <span translate="no">{abbreviation}</span>
                        </p>
                    )}
                </div>

                </div>

            </div>

            <TablaPretemVieHumUv />

        </div>
    );
}