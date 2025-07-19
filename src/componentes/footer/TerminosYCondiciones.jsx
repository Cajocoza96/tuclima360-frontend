import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function TerminosYCondiciones({controls}) {

    const navigate = useNavigate();

    const handleTermsOfService = () => navigate("/terms-of-service");
    const handlePrivacyPolicy = () => navigate("/privacy-policy");

    return (
        <div className="mb-1 w-[95%]">
            <motion.p
                className="text-gray-800 dark:text-gray-400 text-center
                            text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl"
                animate={controls}
                initial={{ x: 0, opacity: 1 }}
            >
                By continuing, you confirm that you agree with the <span className="text-black dark:text-gray-200 font-bold cursor-pointer" onClick={handleTermsOfService}>Terms of Service </span>
                de <span translate="no"> TuClima360 </span> and that you have read the <span className="text-black dark:text-gray-200 font-bold cursor-pointer" onClick={handlePrivacyPolicy}>Privacy Policy</span> of <span translate="no"> TuClima360</span>
            </motion.p>
        </div>
    );
}
export default TerminosYCondiciones;