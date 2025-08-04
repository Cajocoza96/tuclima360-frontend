import { useState, useEffect, useRef } from 'react';

const useTimeAgo = () => {
    const [timeAgoData, setTimeAgoData] = useState(() => {
        // Cargar datos del localStorage al inicializar
        const stored = localStorage.getItem('timeAgoData');
        return stored ? JSON.parse(stored) : {};
    });

    const intervalRef = useRef(null);

    // Función para calcular el tiempo transcurrido
    const calculateTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) {
            return { value: diffInSeconds || 1, unit: 'second' };
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return { value: diffInMinutes, unit: 'minute' };
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return { value: diffInHours, unit: 'hour' };
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return { value: diffInDays, unit: 'day' };
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return { value: diffInMonths, unit: 'month' };
        }

        const diffInYears = Math.floor(diffInMonths / 12);
        return { value: diffInYears, unit: 'year' };
    };

    // Función para formatear el texto según el idioma y la unidad
    const formatTimeText = (value, unit) => {
        const isPlural = value > 1;

        const unitTranslations = {
            second: isPlural ? 'seconds' : 'second',
            minute: isPlural ? 'minutes' : 'minute',
            hour: isPlural ? 'hours' : 'hour',
            day: isPlural ? 'days' : 'day',
            month: isPlural ? 'months' : 'month',
            year: isPlural ? 'years' : 'year'
        };

        return unitTranslations[unit] || unit;
    };

    // Función para inicializar o reinicializar el tiempo para una ubicación
    const initializeTimeForLocation = (locationId) => {
        const now = new Date().toISOString();

        setTimeAgoData(prev => {
            const newData = {
                ...prev,
                [locationId]: {
                    createdAt: now,
                    lastUpdated: now
                }
            };

            // Guardar en localStorage
            localStorage.setItem('timeAgoData', JSON.stringify(newData));
            return newData;
        });
    };

    // Función para obtener el tiempo transcurrido para una ubicación específica
    const getTimeAgoForLocation = (locationId) => {
        const locationData = timeAgoData[locationId];

        if (!locationData) {
            return { value: 0, unit: 'second', text: 'second' };
        }

        const timeAgo = calculateTimeAgo(locationData.createdAt);
        const text = formatTimeText(timeAgo.value, timeAgo.unit);

        return {
            ...timeAgo,
            text
        };
    };

    // Función para limpiar el tiempo de una ubicación eliminada
    const removeTimeForLocation = (locationId) => {
        setTimeAgoData(prev => {
            const newData = { ...prev };
            delete newData[locationId];

            // Actualizar localStorage
            localStorage.setItem('timeAgoData', JSON.stringify(newData));
            return newData;
        });
    };

    // Función para limpiar todos los datos de tiempo
    const clearAllTimeData = () => {
        setTimeAgoData({});
        localStorage.removeItem('timeAgoData');
    };

    // Efecto para actualizar cada minuto
    useEffect(() => {
        // Función para actualizar todos los tiempos
        const updateAllTimes = () => {
            setTimeAgoData(prev => {
                const hasData = Object.keys(prev).length > 0;
                if (hasData) {
                    // Solo actualizar si hay datos, para forzar re-render
                    return { ...prev };
                }
                return prev;
            });
        };

        // Iniciar intervalo de actualización cada 30 segundos
        intervalRef.current = setInterval(updateAllTimes, 30000);

        // Cleanup
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Efecto para guardar en localStorage cuando cambia timeAgoData
    useEffect(() => {
        if (Object.keys(timeAgoData).length > 0) {
            localStorage.setItem('timeAgoData', JSON.stringify(timeAgoData));
        }
    }, [timeAgoData]);

    return {
        initializeTimeForLocation,
        getTimeAgoForLocation,
        removeTimeForLocation,
        clearAllTimeData,
        timeAgoData
    };
};

export default useTimeAgo;