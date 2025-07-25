import React from "react";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CerrarSesion() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="inline-block" onClick={handleCerrarSesion}>
            <div className="flex flex-row items-center gap-2">
                <HiLogout className="text-red-500" />

                <p className="text-red-500">
                    Sign-out
                </p>
            </div>
        </div>

    );
}