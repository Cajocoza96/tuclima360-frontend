import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Error({numeroError, iconoError, tituloError, mensajeError}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-3 2xs:gap-1 lg:gap-6 justify-center min-h-[100dvh] 
                  bg-amber-50 dark:bg-black px-6 py-10 text-center">
      
      <h1 className="text-[4.5rem] md:text-[5.5rem] 2xl:text-[6.5rem] font-extrabold text-transparent 
                    bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
        {numeroError}
      </h1>
      <h1 className="text-[4.5rem] md:text-[5.5rem] 2xl:text-[6.5rem]
                    text-black dark:text-white">
        {iconoError}
      </h1>
      <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold text-gray-800 dark:text-white mb-4">
        {tituloError}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg 2xl:text-2xl max-w-md mb-4">
        {mensajeError}
      </p>

      <div className="flex flex-col 2xs:flex-row gap-4">
        <button
          onClick={handleHome}
          className="px-7 py-4 text-base md:text-xl 2xl:text-3xl bg-blue-600 hover:bg-blue-700 text-white rounded-full 
                      transition duration-200 cursor-pointer">
          Go to home
        </button>
      </div>
    </div>
  );
}