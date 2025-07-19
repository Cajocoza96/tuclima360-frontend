import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BusquedaContext } from './BusquedaContext';

export const ClimaContext = createContext();

export const ClimaProvider = ({ children }) => {
    const { ciudadSeleccionada, obtenerCoordenadas } = useContext(BusquedaContext);
    const [clima, setClima] = useState(null);
    const [pronosticoHora, setPronosticoHora] = useState([]);
    const [pronosticoDiario, setPronosticoDiario] = useState([]);

    const [cargandoClima, setCargandoClima] = useState(false);

    // Funciones de conversión de temperatura
    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9/5) + 32;
    };

    // Función para convertir temperatura basada en el modo
    const convertirTemperatura = (temperatura, esCelsius) => {
        if (esCelsius) {
            return Math.round(temperatura); // Mantener celsius original
        } else {
            return Math.round(celsiusToFahrenheit(temperatura)); // Convertir a fahrenheit
        }
    };

    // Función para obtener temperatura convertida
    const obtenerTemperaturaConvertida = (temperatura, esCelsius) => {
        return convertirTemperatura(temperatura, esCelsius);
    };

    // Función para obtener temperatura máxima convertida
    const obtenerTemperaturaMaxConvertida = (temperaturaMax, esCelsius) => {
        return convertirTemperatura(temperaturaMax, esCelsius);
    };

    // Función para obtener temperatura mínima convertida
    const obtenerTemperaturaMinConvertida = (temperaturaMin, esCelsius) => {
        return convertirTemperatura(temperaturaMin, esCelsius);
    };

    const obtenerClima = async () => {
        if (!ciudadSeleccionada) return;

        setCargandoClima(true);
        const coords = await obtenerCoordenadas(
            ciudadSeleccionada.ciudad,
            ciudadSeleccionada.departamento,
            ciudadSeleccionada.pais
        );

        if (!coords) {
            setCargandoClima(false);
            return;
        }

        try {
            // Llamada al backend en lugar de directamente a Open-Meteo
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/openmeteo/clima`, {
                params: {
                    latitude: coords.lat,
                    longitude: coords.lon
                }
            });

            // Validar respuesta del backend
            if (!response.data.success) {
                throw new Error(response.data.error || 'Error al obtener datos del clima');
            }

            const { clima: climaData, pronosticoHora: pronosticoHoraData, pronosticoDiario: pronosticoDiarioData } = response.data.data;

            // Guardar en localStorage igual que antes
            localStorage.setItem('climaActual', JSON.stringify(climaData));
            
            // Actualizar estados
            setClima(climaData);
            setPronosticoHora(pronosticoHoraData);
            setPronosticoDiario(pronosticoDiarioData);

        } catch (error) {
            console.error('Error al obtener clima:', error);
            // Opcionalmente, puedes mostrar un mensaje de error al usuario
        } finally {
            setCargandoClima(false);
        }
    };

    useEffect(() => {
        obtenerClima();
        const interval = setInterval(obtenerClima, 600000); // 10 minutos
        return () => clearInterval(interval);
    }, [ciudadSeleccionada]);

    return (
        <ClimaContext.Provider value={{ 
            clima, 
            pronosticoHora, 
            pronosticoDiario, 
            cargandoClima,
            obtenerTemperaturaConvertida,
            obtenerTemperaturaMaxConvertida,
            obtenerTemperaturaMinConvertida,
            convertirTemperatura
        }}>
            {children}
        </ClimaContext.Provider>
    );
};