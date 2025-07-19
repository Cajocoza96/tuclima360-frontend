import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem("tipoUsuario") || "");

    useEffect(() => {
        const storedTipoUsuario = localStorage.getItem("tipoUsuario");
        if (storedTipoUsuario) {
            setTipoUsuario(storedTipoUsuario);
        }
    }, []);

    const login = (userType) => {
        localStorage.setItem("tipoUsuario", userType);
        setTipoUsuario(userType);
    };

    const logout = () => {
        localStorage.removeItem("tipoUsuario");
        setTipoUsuario("");
    };

    const capitalizedNombreUsuario = tipoUsuario ? tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1) : "";

    return (
        <AuthContext.Provider value={{ tipoUsuario, capitalizedNombreUsuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);