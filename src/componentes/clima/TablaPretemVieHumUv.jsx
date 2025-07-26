import React, { useContext } from "react";
import { WiThermometer, WiHumidity, WiStrongWind, WiDaySunny } from "react-icons/wi";
import { ClimaContext } from "../../context/ClimaContext";
import {
    obtenerEstadoPrecipitacion, formatearHumedad,
    obtenerDireccionViento, obtenerIndiceUV
} from "../../utils/formato";

import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";

import MensajesClimaticos from "./MensajesClimaticos";

export default function TablaPretemVieHumUv() {
    const { clima, obtenerTemperaturaConvertida } = useContext(ClimaContext);
    const { encendidoTemperaturaModo } = useFonVivoFormHoraTemp();

    // Obtener la temperatura convertida según el modo seleccionado
    const temperaturaConvertida = obtenerTemperaturaConvertida(clima.temperatura, encendidoTemperaturaModo);

    if (!clima) return <p className="text-white">Loading climate...</p>;

    return (
        <div className="mt-2 mb-4 w-full flex flex-col items-center gap-2 2xl:gap-4">
            <>
                <div className="w-full p-1 flex flex-row 
                            items-center justify-center 2xs:justify-start gap-2 2xl:gap-4">
                    <p className="text-base md:text-xl 2xl:text-4xl text-white text-center">
                        Precipitations: {obtenerEstadoPrecipitacion(clima.codigoClima)}
                    </p>
                </div>

                <div className="w-full grid grid-cols-2 justify-center gap-3 2xl:gap-6">

                    <div className="p-1 w-full flex flex-row items-center gap-2 2xl:gap-4">
                        <WiThermometer className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-white" />

                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                Temperature
                            </p>
                            <div className="flex flex-row items-center">
                                <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                    <span translate="no">{temperaturaConvertida}</span>
                                </p>
                                {encendidoTemperaturaModo ? (
                                    <>
                                        <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                            <span translate="no">°</span>
                                        </p>
                                        <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                            <span translate="no">C</span>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                            <span translate="no">°</span>
                                        </p>
                                        <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                            <span translate="no">F</span>
                                        </p>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="p-1 w-full flex flex-row items-center gap-2 2xl:gap-4">
                        <WiHumidity className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-white" />

                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                Humidity
                            </p>
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                {formatearHumedad(clima.humedad)}
                            </p>
                        </div>
                    </div>

                    <div className="p-1 w-full flex flex-row items-center gap-2 2xl:gap-4">
                        <WiStrongWind className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-white" />

                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                Wind
                            </p>
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                {obtenerDireccionViento(clima.viento.direccion, clima.viento.velocidad)}
                            </p>
                        </div>
                    </div>

                    <div className="p-1 w-full flex flex-row items-center gap-2 2xl:gap-4">
                        <WiDaySunny className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-white" />

                        <div className="flex flex-col gap-1 2xl:gap-2">
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                UV Index
                            </p>
                            <p className="text-base md:text-xl 2xl:text-4xl text-white">
                                {obtenerIndiceUV(clima.uv)}
                            </p>
                        </div>
                    </div>

                </div>

            </>

            <MensajesClimaticos />
        </div>
    );
}