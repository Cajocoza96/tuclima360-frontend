import React, { useContext, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { WiSnow, WiUmbrella } from "react-icons/wi";
import { ClimaContext } from "../../context/ClimaContext";
import { useFonVivoFormHoraTemp } from "../../context/FonVivoFormHoraTempContext";
import * as Chart from "chart.js";
import { DateTime } from "luxon";

// Registrar todos los componentes necesarios de Chart.js
Chart.Chart.register(...Chart.registerables);

// Función para determinar si es lluvia o nieve
const esNieve = (codigo) => {
    const codigosNieve = [71, 73, 75, 77, 85, 86];
    return codigosNieve.includes(codigo);
};

// Plugin personalizado para mostrar valores arriba de las barras
const pluginValoresArriba = {
    id: 'valoresArriba',
    afterDatasetsDraw: (chart) => {
        const { ctx, data, scales: { x, y } } = chart;

        ctx.save();
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        data.datasets.forEach((dataset, datasetIndex) => {
            chart.getDatasetMeta(datasetIndex).data.forEach((bar, index) => {
                const value = dataset.data[index];
                if (value >= 0) {
                    const barTop = bar.y;
                    const barX = bar.x;

                    // Mostrar el valor con símbolo de porcentaje
                    ctx.fillText(`${value}%`, barX, barTop - 4);
                }
            });
        });

        ctx.restore();
    }
};


// Plugin personalizado para mostrar valores de temperatura
const pluginTemperaturas = (encendidoTemperaturaModo) => ({
    id: 'temperaturas',
    afterDatasetsDraw: (chart) => {
        const { ctx, data, scales: { x, y } } = chart;

        ctx.save();
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        data.datasets.forEach((dataset, datasetIndex) => {
            chart.getDatasetMeta(datasetIndex).data.forEach((bar, index) => {
                const value = dataset.data[index];
                const barTop = bar.y;
                const barX = bar.x;

                // Mostrar el valor con símbolo de temperatura segun el modo
                const unidad = encendidoTemperaturaModo ? '°C' : '°F';
                ctx.fillText(`${value}${unidad}`, barX, barTop - 4);
            });
        });

        ctx.restore();
    }
});

// Componente para el gráfico de barras precipitacion individual
const GraficoPrecipitacion = ({ probabilidadMax, probabilidadMin, esNieveBoolean, index }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const containerRef = useRef(null);
    const resizeObserverRef = useRef(null);

    // Función para redimensionar el gráfico
    const resizeChart = useCallback(() => {
        if (chartRef.current && containerRef.current) {
            try {
                chartRef.current.resize();
            } catch (error) {
                console.warn('Error resizing chart:', error);
            }
        }
    }, []);

    // Función para crear el gráfico
    const createChart = useCallback(() => {
        try {
            // Verificar que el canvas y el contenedor existan
            if (!canvasRef.current || !containerRef.current) return;

            // Destruir el gráfico anterior si existe
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            // Configurar los datos para el gráfico
            const data = {
                labels: ['Max', 'Min'],
                datasets: [{
                    data: [probabilidadMax || 0, probabilidadMin || 0],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)', // Azul para Max
                        'rgba(147, 197, 253, 0.8)'  // Azul claro para Min
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(147, 197, 253, 1)'
                    ],
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            };

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false // Deshabilitar tooltips
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            },
                            callback: function (value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                // Agregar padding superior para dar espacio a los valores
                layout: {
                    padding: {
                        top: 20
                    }
                }
            };

            // Crear el nuevo gráfico con el plugin personalizado
            chartRef.current = new Chart.Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [pluginValoresArriba] // Agregar el plugin personalizado
            });

        } catch (error) {
            console.warn('Error creating chart:', error);
        }
    }, [probabilidadMax, probabilidadMin, esNieveBoolean]);

    useEffect(() => {
        let timeoutId;

        // Crear el gráfico con un pequeño delay
        timeoutId = setTimeout(createChart, 100);

        // Configurar ResizeObserver para detectar cambios de tamaño
        if (containerRef.current && 'ResizeObserver' in window) {
            resizeObserverRef.current = new ResizeObserver((entries) => {
                // Debounce para evitar múltiples llamadas
                setTimeout(resizeChart, 50);
            });
            resizeObserverRef.current.observe(containerRef.current);
        }

        // Listener para cambios de orientación
        const handleOrientationChange = () => {
            // Esperar a que la orientación se complete
            setTimeout(() => {
                resizeChart();
            }, 250);
        };

        // Listener para redimensionamiento de ventana
        const handleResize = () => {
            setTimeout(resizeChart, 100);
        };

        // Agregar event listeners
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleResize);

            if (chartRef.current) {
                try {
                    chartRef.current.destroy();
                    chartRef.current = null;
                } catch (error) {
                    console.warn('Error destroying chart:', error);
                }
            }
        };
    }, [createChart, resizeChart]);

    return (
        <div ref={containerRef} className="w-full h-24 sm:h-28 lg:h-32 2xl:h-36 relative">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                key={`chart-${index}-${probabilidadMax}-${probabilidadMin}`}
            />
        </div>
    );
};



// Componente para el gráfico de barras de temperatura
const GraficoTemperatura = ({ temperaturaMax, temperaturaMin, index, encendidoTemperaturaModo }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const containerRef = useRef(null);
    const resizeObserverRef = useRef(null);

    // Función para redimensionar el gráfico
    const resizeChart = useCallback(() => {
        if (chartRef.current && containerRef.current) {
            try {
                chartRef.current.resize();
            } catch (error) {
                console.warn('Error resizing temperature chart:', error);
            }
        }
    }, []);

    // Función para crear el gráfico de temperatura
    const createChart = useCallback(() => {
        try {
            // Verificar que el canvas y el contenedor existan
            if (!canvasRef.current || !containerRef.current) return;

            // Destruir el gráfico anterior si existe
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            // Configurar los datos para el gráfico de temperatura
            const data = {
                labels: ['Max', 'Min'],
                datasets: [{
                    data: [temperaturaMax || 0, temperaturaMin || 0],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',  // Rojo para temperatura máxima
                        'rgba(255, 115, 115, 0.5)'  // Azul para temperatura mínima
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(255, 115, 115, 0.7)'
                    ],
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            };

            // Calcular el rango dinámico para el eje Y
            const minTemp = Math.min(temperaturaMax, temperaturaMin);
            const maxTemp = Math.max(temperaturaMax, temperaturaMin);
            const padding = Math.max(5, Math.abs(maxTemp - minTemp) * 0.2);
            const yMin = Math.floor(minTemp - padding);
            const yMax = Math.ceil(maxTemp + padding);

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false // Deshabilitar tooltips
                    }
                },
                scales: {
                    y: {
                        min: yMin,
                        max: yMax,
                        ticks: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            },
                            callback: function (value) {
                                return value + (encendidoTemperaturaModo ? '°C' : '°F');
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                // Agregar padding superior para dar espacio a los valores
                layout: {
                    padding: {
                        top: 20
                    }
                }
            };

            // Crear el nuevo gráfico con el plugin personalizado de temperaturas
            chartRef.current = new Chart.Chart(ctx, {
                type: 'bar',
                data: data,
                options: options,
                plugins: [pluginTemperaturas(encendidoTemperaturaModo)]
            });

        } catch (error) {
            console.warn('Error creating temperature chart:', error);
        }
    }, [temperaturaMax, temperaturaMin, encendidoTemperaturaModo]);

    useEffect(() => {
        let timeoutId;

        // Crear el gráfico con un pequeño delay
        timeoutId = setTimeout(createChart, 100);

        // Configurar ResizeObserver para detectar cambios de tamaño
        if (containerRef.current && 'ResizeObserver' in window) {
            resizeObserverRef.current = new ResizeObserver((entries) => {
                // Debounce para evitar múltiples llamadas
                setTimeout(resizeChart, 50);
            });
            resizeObserverRef.current.observe(containerRef.current);
        }

        // Listener para cambios de orientación
        const handleOrientationChange = () => {
            setTimeout(() => {
                resizeChart();
            }, 250);
        };

        // Listener para redimensionamiento de ventana
        const handleResize = () => {
            setTimeout(resizeChart, 100);
        };

        // Agregar event listeners
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleResize);

            if (chartRef.current) {
                try {
                    chartRef.current.destroy();
                    chartRef.current = null;
                } catch (error) {
                    console.warn('Error destroying temperature chart:', error);
                }
            }
        };
    }, [createChart, resizeChart]);

    return (
        <div ref={containerRef} className="w-full h-24 sm:h-28 lg:h-32 2xl:h-36 relative">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                key={`temp-chart-${index}-${temperaturaMax}-${temperaturaMin}`}
            />
        </div>
    );
};

export default function GraficoDiarioClima() {
    const { pronosticoDiario, clima,
        obtenerTemperaturaMaxConvertida,
        obtenerTemperaturaMinConvertida } = useContext(ClimaContext);

    const { encendidoTemperaturaModo } = useFonVivoFormHoraTemp();
    const swiperRef = useRef(null);

    // Esperar a que los datos estén disponibles para evitar parpadeo
    if (!clima || !pronosticoDiario) {
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

    // Efecto para manejar cambios de orientación en el Swiper
    useEffect(() => {
        const handleOrientationChange = () => {
            setTimeout(() => {
                if (swiperRef.current && swiperRef.current.swiper) {
                    swiperRef.current.swiper.update();
                }
            }, 300);
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    return (
        <div className="w-full flex flex-col gap-4 z-30">
            <div className="bg-black/40 w-full flex flex-col items-center justify-center gap-1">
                <p className="text-white text-base md:text-xl 2xl:text-4xl font-bold text-center">
                    Daily precipitations
                </p>
                <Swiper
                    ref={swiperRef}
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        el: "#custom-swiper-pagination-3"
                    }}
                    spaceBetween={6}
                    slidesPerView={2}
                    className="w-full mb-4 cursor-pointer"
                >
                    {dias.map((dia, index) => {
                        const probabilidadMax = dia.probabilidadMax || 0;
                        const probabilidadMin = dia.probabilidadMin || 0;
                        const esNieveBoolean = esNieve(dia.weathercode);

                        return (
                            <SwiperSlide className="" key={`${dia.fecha}-${index}`}>
                                <div className="flex flex-col items-center justify-center gap-3">

                                    {/* Indicador del tipo de precipitación */}
                                    <div className="flex flex-row items-center gap-2">
                                        {esNieveBoolean ? (
                                            <WiSnow className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-white" />
                                        ) : (
                                            <WiUmbrella className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-white" />
                                        )}
                                        <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-white font-medium">
                                            {esNieveBoolean ? 'Snow' : 'Rain'}
                                        </p>
                                    </div>

                                    {/* Gráfico de barras */}
                                    {(probabilidadMax >= 0 && probabilidadMin >= 0) && (
                                        <div className="w-full px-1">
                                            <GraficoPrecipitacion
                                                probabilidadMax={probabilidadMax}
                                                probabilidadMin={probabilidadMin}
                                                esNieveBoolean={esNieveBoolean}
                                                index={`${index}-${dia.fecha}`}
                                            />
                                        </div>
                                    )}

                                    {/* Fecha y día */}
                                    <div className="flex flex-col gap-1 items-center justify-center">
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {dia.dia}/{dia.mes}
                                        </p>

                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {dia.nombreDia}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                    <div className="w-full flex justify-center mt-2"
                        id="custom-swiper-pagination-3"></div>

                </Swiper>
            </div>



            <div className="p-2 bg-black/40 w-full flex flex-col items-center justify-center gap-1">
                <p className="text-white text-base md:text-xl 2xl:text-4xl font-bold text-center">
                    Daily temperatures
                </p>
                <Swiper
                    ref={swiperRef}
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        el: "#custom-swiper-pagination-3"
                    }}
                    spaceBetween={6}
                    slidesPerView={2}
                    className="w-full mb-4 cursor-pointer"
                >
                    {dias.map((dia, index) => {
                        const temperaturaMaxConvertida = obtenerTemperaturaMaxConvertida(dia.temperaturaMax, encendidoTemperaturaModo);
                        const temperaturaMinConvertida = obtenerTemperaturaMinConvertida(dia.temperaturaMin, encendidoTemperaturaModo);
                        return (
                            <SwiperSlide className="" key={`${dia.fecha}-${index}`}>
                                <div className="flex flex-col items-center justify-center gap-3">
                                    {/* Gráfico de barras */}
                                    {(temperaturaMaxConvertida >= 0 && temperaturaMinConvertida >= 0) && (
                                        <div className="w-full px-1">
                                            <GraficoTemperatura
                                                temperaturaMax={temperaturaMaxConvertida}
                                                temperaturaMin={temperaturaMinConvertida}
                                                encendidoTemperaturaModo={encendidoTemperaturaModo}
                                                index={`${index}-${dia.fecha}`}
                                            />
                                        </div>
                                    )}

                                    {/* Fecha y día */}
                                    <div className="flex flex-col gap-1 items-center justify-center">
                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {dia.dia}/{dia.mes}
                                        </p>

                                        <p className="text-xs sm:text-base lg:text-xl 2xl:text-3xl text-white">
                                            {dia.nombreDia}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                    <div className="w-full flex justify-center mt-2"
                        id="custom-swiper-pagination-3"></div>

                </Swiper>
            </div>

            <style>
                {`
                    #custom-swiper-pagination-3 .swiper-pagination-bullet {
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 9999px;
                        background-color: #c4bec4;
                        opacity: 0.5;
                        transition: all 0.3s ease;
                    }

                    @media (min-width: 1024px) {
                        #custom-swiper-pagination-3 .swiper-pagination-bullet {
                            width: 0.8rem;
                            height: 0.8rem;
                        }
                    }

                    #custom-swiper-pagination-3 .swiper-pagination-bullet-active {
                        background-color: #ffffff;
                        opacity: 1;
                    }
 
                    .dark #custom-swiper-pagination-3 .swiper-pagination-bullet  {
                        background-color: #797579;
                    }

                    .dark #custom-swiper-pagination-3 .swiper-pagination-bullet-active {
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
        </div>
    );
}