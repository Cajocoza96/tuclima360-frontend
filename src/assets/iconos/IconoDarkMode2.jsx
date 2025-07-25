import React, { useEffect, useState } from "react";
import { HiDesktopComputer, HiSun, HiMoon } from "react-icons/hi";

const themeKeys = {
    system: "system",
    light: "light",
    dark: "dark",
}

function IconoDarkMode2() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || themeKeys.system);
    const [open, setOpen] = useState(false);

    const options = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "System (default)", value: "system" },
    ];

    useEffect(() => {
        const root = document.documentElement;
        const mediaquery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            root.classList.toggle(
                "dark",
                theme === themeKeys.dark ||
                (theme === themeKeys.system && mediaquery.matches)
            );
            localStorage.setItem("theme", theme);
        };

        applyTheme();

        mediaquery.addEventListener("change", applyTheme);

        return () => {
            mediaquery.removeEventListener("change", applyTheme);
        }
    }, [theme]);

    const getThemeLabel = () => {
        switch(theme) {
            case "light":
                return "Light";
            case "dark":
                return "Dark";
            case "system":
                return "System (default)";
            default:
                return "System (default)";
        }
    };

    return (
        <div className="relative inline-block text-center cursor-pointer">

            <div className="flex flex-row gap-2" onClick={() => setOpen(!open)}>
                <button
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded cursor-pointer"
                >
                    {theme === "light" && <HiSun className="text-black dark:text-white text-base
                                                        md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl  "/>}

                    {theme === "dark" && <HiMoon className="text-black dark:text-white text-base 
                                                        md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl  "/>}

                    {theme === "system" && <HiDesktopComputer className="text-black dark:text-white text-base 
                                                        md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl "/>}

                </button>

                <div className="cursor-pointer">
                    <p className="text-base md:text-xl lg:text-xl xl:text-xl 2xl:text-3xl 
                            text-black dark:text-gray-300">
                        Color scheme
                    </p>

                    <div className="text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl 
                            text-black dark:text-gray-300 text-left">
                        {getThemeLabel()}
                    </div>
                </div>
            </div>

            {open && (
                <div className="absolute mt-2 w-auto
                                bg-white dark:bg-gray-700 shadow-lg rounded overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                setTheme(opt.value);
                                setOpen(false);
                            }}
                            className={`w-full p-1 text-center text-black dark:text-gray-300 
                                    hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer
                                    text-xs md:text-base lg:text-base xl:text-base 2xl:text-2xl  ${theme === opt.value ? "font-bold" : ""
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
}
export default IconoDarkMode2;