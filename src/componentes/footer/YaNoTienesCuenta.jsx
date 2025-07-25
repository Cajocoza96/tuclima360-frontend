import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

export default function YaNoTienesCuenta({ footerInfoCuenta, footerAccion, footerAccionInvisible, controls }) {
    const navigate = useNavigate();
    const hiddenSpanRef = useRef(null);

    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = async () => {
        if (isAnimating) return;

        setIsAnimating(true);

        const direction = footerAccionInvisible === "Login" ? -100 : 100;

        await controls.start({
            x: `${direction}%`,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        });

        if (footerAccionInvisible === "Login") {
            navigate("/login");
        } else if (footerAccionInvisible === "Register") {
            navigate("/register");
        }
    };

    const handleVisibleClick = () => {
        // Simular clic en el elemento invisible
        if (hiddenSpanRef.current) {
            hiddenSpanRef.current.click();
        }
    };

    return (
        <div
            className="w-full p-4 bg-gray-300 dark:bg-gray-800 
                        flex items-center justify-center"
        >
            <motion.p
                className="font-bold text-black dark:text-white text-center
                    text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl relative"
                animate={controls}
                initial={{ x: 0, opacity: 1 }}
            >
                {footerInfoCuenta} {""}
                <span translate="no"></span>
                <span className="text-red-600 cursor-pointer" onClick={handleVisibleClick}>
                    {footerAccion}
                </span>
                <span translate="no"></span>
                <span 
                    ref={hiddenSpanRef}
                    className="text-red-600 cursor-pointer absolute top-0 left-0 w-full h-full opacity-0 pointer-events-auto"
                    onClick={handleClick}
                    translate="no"
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        zIndex: 10
                    }}
                >
                    {footerAccionInvisible}
                </span>
            </motion.p>
        </div>
    )
}