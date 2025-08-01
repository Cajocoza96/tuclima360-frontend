import React, { useContext } from "react";
import Lottie from "lottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { WiUmbrella, WiThermometer, WiSnow, WiHumidity, WiStrongWind, WiDaySunny } from "react-icons/wi";
import { ClimaContext } from "../../context/ClimaContext";
import { FechaHoraContext } from "../../context/FechaHoraContext";
import {
    obtenerDescripcionClima,
    formatearHumedad, obtenerDireccionViento,
    obtenerIndiceUV
} from "../../utils/formato";
import { obtenerAnimacionClima } from "../../utils/animacionesLottie";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";

import { DateTime } from "luxon";

const formatearHora = (horaISO) => {
    const date = new Date(horaISO);
    let horas = date.getHours();
    const ampm = horas >= 12 ? "p.m" : "a.m";
    horas = horas % 12;
    horas = horas ? horas : 12; // 0 => 12
    return `${horas}:00 ${ampm}`;
};

const formatearHora24 = (horaISO) => {
    const date = new Date(horaISO);
    const horas = date.getHours();
    return `${horas.toString().padStart(2, "0")}:00`;
}

// Función para extraer la hora en formato 24h de una fecha ISO
const obtenerHora24DeISO = (horaISO) => {
    const date = new Date(horaISO);
    return date.getHours();
};

// Función para determinar si es lluvia o nieve
const esNieve = (codigo) => {
    const codigosNieve = [71, 73, 75, 77, 85, 86];
    return codigosNieve.includes(codigo);
};

export default function CarruselHoraDiaClima() {
    const { pronosticoHora, pronosticoDiario, clima,
        obtenerTemperaturaConvertida,
        obtenerTemperaturaMaxConvertida,
        obtenerTemperaturaMinConvertida } = useContext(ClimaContext);

    const { hora24 } = useContext(FechaHoraContext);
    const { encendidoFormatoHora, encendidoTemperaturaModo } = useFonVivoFormHoraTemp();

    // Esperar a que los datos estén disponibles para evitar parpadeo
    if (!clima || !pronosticoHora || !pronosticoDiario || hora24 === null || hora24 === undefined) {
        return null;
    }

    const obtenerDiasConNombre = () => {
        return pronosticoDiario.map((item, index) => {
            const fechaConZona = DateTime.fromISO(item.fecha, { zone: clima?.zonaHoraria || "UTC" });

            const nombreDia = fechaConZona.setLocale('en').toFormat("cccc"); // ejemplo: "domingo"
            const dia = fechaConZona.day;
            const mes = fechaConZona.month;

            return {
                ...item,
                nombreDia: index === 0 ? "Today" : nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1),
                dia,
                mes
            };
        });
    };

    const dias = obtenerDiasConNombre();

    return (
        <div className="w-full flex flex-col gap-4 z-30">

            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                    clickable: true,
                    el: "#custom-swiper-pagination"
                }}
                spaceBetween={4}
                slidesPerView={4}
                className="w-full mb-4 cursor-pointer"
            >
                {pronosticoHora.map((hora, index) => {
                    const descripcion = obtenerDescripcionClima(hora.codigoClima);

                    // Obtener la hora en formato 24h de la fecha ISO
                    const horaDelPronostico = obtenerHora24DeISO(hora.hora);

                    // Obtener la animación correcta según la hora específica del pronóstico
                    const animacion = obtenerAnimacionClima(hora.codigoClima, horaDelPronostico);

                    const probabilidad = hora.probabilidad || 0;

                    const temperaturaConvertida = obtenerTemperaturaConvertida(hora.temperatura, encendidoTemperaturaModo);

                    const humedadFormateada = formatearHumedad(hora.humedad);
                    const datosViento = obtenerDireccionViento(hora.viento.direccion, hora.viento.velocidad);
                    const datosUV = obtenerIndiceUV(hora.uv.textoUv, hora.uv.valorUv);

                    return (

                        <SwiperSlide className="" key={index}>
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                    <span translate="no">
                                        {encendidoFormatoHora ? formatearHora24(hora.hora) : formatearHora(hora.hora)}
                                    </span>
                                </p>

                                <div className="w-[60%] 2xl:w-[55%] h-auto overflow-hidden 
                                                flex flex-col items-center justify-center">
                                    {animacion && (
                                        <Lottie
                                            className="w-full object-cover"
                                            animationData={animacion}
                                            loop={true}
                                        />
                                    )}
                                </div>

                                <div className="h-20 flex flex-col items-center justify-center">
                                    <p className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        {descripcion}
                                    </p>
                                </div>

                                {/* Mostrar icono solo si hay probabilidad >= 0 */}
                                {probabilidad >= 0 && (
                                    <div className="flex flex-row items-center gap-1">
                                        {esNieve(hora.codigoClima) ? (
                                            <WiSnow className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />
                                        ) : (
                                            <WiUmbrella className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />
                                        )}
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {probabilidad || 0}%
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-row items-center justify-center">
                                    <WiThermometer className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        <span translate="no">{temperaturaConvertida}</span>
                                    </p>
                                    {encendidoTemperaturaModo ? (
                                        <>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">°</span>
                                            </p>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">C</span>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">°</span>
                                            </p>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">F</span>
                                            </p>
                                        </>
                                    )}

                                </div>

                                <div className="flex flex-row items-center justify-center">
                                    <WiHumidity className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        <span translate="no">{humedadFormateada}</span>
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <WiStrongWind className="text-center text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="h-10 flex flex-col justify-center">
                                            <p className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                {datosViento.direccion}
                                            </p>
                                        </div>

                                        <p className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            <span translate="no">{datosViento.velocidad}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap flex-col 2xs:flex-row items-center justify-center">
                                    <WiDaySunny className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="h-10 flex flex-col justify-center">
                                            <p className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                {datosUV.textoUv}
                                            </p>
                                        </div>

                                        <p className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            <span translate="no">{datosUV.valorUv}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    );
                })}

                <div className="w-full flex justify-center mt-2"
                    id="custom-swiper-pagination"></div>

            </Swiper>


            <div className="flex flex-col items-center justify-center">

                <div className="flex flex-row items-center gap-2">
                    <WiUmbrella className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />

                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                        Chance of rain
                    </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <WiSnow className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />

                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                        Chance of snow
                    </p>
                </div>
            </div>


            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                    clickable: true,
                    el: "#custom-swiper-pagination-2"
                }}
                spaceBetween={4}
                slidesPerView={4}
                className="w-full mb-4 cursor-pointer"
            >
                {dias.map((dia, index) => {
                    // Para los días, usar animaciones de día por defecto (mediodía)
                    const animacionDia = obtenerAnimacionClima(dia.weathercode, 12); // 12:00 = mediodía
                    const probabilidadMax = dia.probabilidadMax || 0;
                    const probabilidadMin = dia.probabilidadMin || 0;
                    // Convertir temperaturas máxima y mínima según el modo actual
                    const temperaturaMaxConvertida = obtenerTemperaturaMaxConvertida(dia.temperaturaMax, encendidoTemperaturaModo);
                    const temperaturaMinConvertida = obtenerTemperaturaMinConvertida(dia.temperaturaMin, encendidoTemperaturaModo);
                    // UV Max
                    const uvMaxFormateado = obtenerIndiceUV(dia.uvMax);
                    return (
                        <SwiperSlide className="" key={index}>
                            <div className="flex flex-col items-center justify-center gap-3">

                                <div className="flex flex-col gap-1 items-center justify-center">
                                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        {dia.nombreDia}
                                    </p>

                                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        {dia.dia}/{dia.mes}
                                    </p>
                                </div>

                                <div className="w-[60%] 
                                                2xl:w-[55%] h-auto overflow-hidden 
                                                flex flex-col items-center justify-center">
                                    {animacionDia && (
                                        <Lottie
                                            className="w-full object-cover"
                                            animationData={animacionDia}
                                            loop={true}
                                        />
                                    )}
                                </div>

                                <div className="h-20 flex flex-col items-center justify-center">
                                    <p className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        {obtenerDescripcionClima(dia.weathercode)}
                                    </p>
                                </div>

                                {probabilidadMax >= 0 && (
                                    <div className="flex flex-row items-center gap-1">
                                        {esNieve(dia.weathercode) ? (
                                            <WiSnow className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />
                                        ) : (
                                            <WiUmbrella className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />
                                        )}
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            <span translate="no">Max</span>
                                        </p>
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {probabilidadMax}%
                                        </p>
                                    </div>
                                )}

                                {probabilidadMin >= 0 && (
                                    <div className="flex flex-row items-center gap-1">
                                        {esNieve(dia.weathercode) ? (
                                            <WiSnow className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />
                                        ) : (
                                            <WiUmbrella className="text-xl 2xs:text-2xl lg:text-4xl 2xl:text-5xl text-white" />
                                        )}
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            <span translate="no">Min</span>
                                        </p>
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {probabilidadMin}%
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-row items-center justify-center">
                                    <WiThermometer className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        <span translate="no">Max {temperaturaMaxConvertida}</span>
                                    </p>
                                    {encendidoTemperaturaModo ? (
                                        <>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">°</span>
                                            </p>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">C</span>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">°</span>
                                            </p>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">F</span>
                                            </p>
                                        </>
                                    )}

                                </div>

                                <div className="flex flex-row items-center justify-center">
                                    <WiThermometer className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                    <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        <span translate="no">Min {temperaturaMinConvertida}</span>
                                    </p>
                                    {encendidoTemperaturaModo ? (
                                        <>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">°</span>
                                            </p>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">C</span>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">°</span>
                                            </p>
                                            <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                                <span translate="no">F</span>
                                            </p>
                                        </>
                                    )}

                                </div>

                                <div className="flex flex-wrap flex-col 2xs:flex-row items-center justify-center gap-1">
                                    <div className="flex flex-row items-center">
                                        <WiDaySunny className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-white" />
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            <span translate="no">Max</span>
                                        </p>
                                    </div>
                                    <span className="text-center text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                        <span translate="no">{uvMaxFormateado}</span>
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}

                <div className="w-full flex justify-center mt-2"
                    id="custom-swiper-pagination-2"></div>

                <style>
                    {`
                    #custom-swiper-pagination .swiper-pagination-bullet,
                    #custom-swiper-pagination-2 .swiper-pagination-bullet {
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 9999px;
                        background-color: #c4bec4;
                        opacity: 0.5;
                        transition: all 0.3s ease;
                    }

                    @media (min-width: 1024px) {
                        #custom-swiper-pagination .swiper-pagination-bullet,
                        #custom-swiper-pagination-2 .swiper-pagination-bullet {
                            width: 0.8rem;
                            height: 0.8rem;
                        }
                    }

                    #custom-swiper-pagination .swiper-pagination-bullet-active,
                    #custom-swiper-pagination-2 .swiper-pagination-bullet-active {
                        background-color: #ffffff;
                        opacity: 1;
                    }

                    .dark #custom-swiper-pagination .swiper-pagination-bullet, 
                    .dark #custom-swiper-pagination-2 .swiper-pagination-bullet  {
                        background-color: #797579;
                    }

                    .dark #custom-swiper-pagination .swiper-pagination-bullet-active,
                    .dark #custom-swiper-pagination-2 .swiper-pagination-bullet-active {
                        background-color: #ffffff;
                    }


                    .swiper-button-prev, .swiper-button-next {
                        color: #ffffff;
                        
                    }

                    .swiper-button-prev::after, .swiper-button-next::after {
                        font-size: 1rem;   
                    }

                    @media (min-width: 1024px) {
                        .swiper-button-prev::after, .swiper-button-next::after {
                            font-size: 1.5rem;
                        }
                    }

                `}
                </style>

            </Swiper>
        </div>
    );
}