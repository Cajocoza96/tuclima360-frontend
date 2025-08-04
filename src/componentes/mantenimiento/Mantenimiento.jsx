import React from "react";
import OptimizedImage, { IMAGE_CONFIGS } from "../common/OptimizedImage";
import paginaEnMantenimiento1 from "/assets/img/mantenimiento/paginaEnMantenimiento1.webp";

export default function Mantenimiento() {
    return (
        <div className="bg-white dark:bg-black w-full min-h-[100svh] 
                            flex flex-col items-center">
            <div className="w-[95%] min-h-[100svh] overflow-hidden text-center
                            flex flex-col justify-around items-center">

                <p className="font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-blue-500 to-green-400
                        text-3xl lg:text-4xl 2xl:text-6xl">
                    <span translate="no">TuClima360</span>
                </p>

                <p className="text-center text-xl lg:text-2xl 2xl:text-4xl 
                            text-black dark:text-white">
                    This page is currently under maintenance
                </p>

                {/* Imagen optimizada con skeleton*/}
                <div className="w-60 2xs:w-50 lg:w-70 2xl:w-100">
                    <OptimizedImage
                        src={paginaEnMantenimiento1}
                        alt="Page under maintenance - TuClima360"
                        className="rounded-lg shadow-lg"
                        aspectRatio="auto"
                        showSkeleton={true}
                        skeletonClass="shadow-lg"
                        {...IMAGE_CONFIGS.CRITICAL}
                    />
                </div>

                <p className="text-center text-xl lg:text-2xl 2xl:text-4xl 
                            text-black dark:text-white">
                    We'll be back shortly. Thank you for your patience.
                </p>
            </div>
        </div>
    );
}