import React, { useContext } from "react";
import { WiThermometer, WiHumidity, WiStrongWind, WiDaySunny } from "react-icons/wi";
import { ClimaContext } from "../../context/ClimaContext";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";
import { obtenerMensajeTemperatura, obtenerMensajeHumedad, obtenerMensajeViento,
        obtenerMensajeUV, obtenerDireccionViento } from "../../utils/formato";

export default function MensajesClimaticos() {
    const { clima, obtenerTemperaturaConvertida } = useContext(ClimaContext);
    const { encendidoTemperaturaModo } = useFonVivoFormHoraTemp();

    if (!clima) return <p className="text-white">Loading climate messages...</p>;

    // Obtener la temperatura convertida según el modo seleccionado
    const temperaturaConvertida = obtenerTemperaturaConvertida(clima.temperatura, encendidoTemperaturaModo);

    const direccionCompleta = obtenerDireccionViento(clima.viento.direccion, clima.viento.velocidad);
    const direccionViento = direccionCompleta.split(' ')[0];

    const mensajes = [
        {
            id: 'temperatura',
            icono: WiThermometer,
            titulo: 'Temperature',
            mensaje: obtenerMensajeTemperatura(parseFloat(temperaturaConvertida)),
            color: 'text-red-400'
        },
        {
            id: 'humedad',
            icono: WiHumidity,
            titulo: 'Humidity',
            mensaje: obtenerMensajeHumedad(clima.humedad),
            color: 'text-blue-400'
        },
        {
            id: 'viento',
            icono: WiStrongWind,
            titulo: 'Wind',
            mensaje: obtenerMensajeViento(direccionViento, clima.viento.velocidad),
            color: 'text-cyan-400'
        },
        {
            id: 'uv',
            icono: WiDaySunny,
            titulo: 'UV index',
            mensaje: obtenerMensajeUV(clima.uv),
            color: 'text-orange-400'
        }
    ];

    return (
        <div className="rounded-md p-2 mt-4 mb-4 w-full flex flex-col gap-3 2xl:gap-4 bg-black/40 overflow-hidden">

            {/* Título de la sección */}
            <div className="w-full flex flex-row items-center justify-center gap-2 mb-2">
                <p className="text-base md:text-xl 2xl:text-4xl text-white">
                    Climate Recommendations
                </p>
            </div>

            {/* Mensajes informativos */}
            <div className="w-full space-y-3 2xl:space-y-4">
                {mensajes.map((item) => {
                    const IconComponent = item.icono;
                    return (
                        <div
                            key={item.id}
                            className="w-full rounded-lg 
                                        p-3 2xl:p-4"
                        >
                            <div className="flex flex-row items-start gap-3 2xl:gap-4">

                                {/* Icono */}
                                <div className="flex-shrink-0 mt-1">
                                    <IconComponent
                                        className={`text-xl md:text-2xl lg:text-3xl 2xl:text-4xl ${item.color}`}
                                    />
                                </div>

                                {/* Contenido */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-base md:text-xl 2xl:text-4xl font-medium mb-1 2xl:mb-2 ${item.color}`}>
                                        {item.titulo}
                                    </p>
                                    <p className="text-base md:text-xl 2xl:text-4xl text-white text-opacity-90 leading-relaxed">
                                        {item.mensaje}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}