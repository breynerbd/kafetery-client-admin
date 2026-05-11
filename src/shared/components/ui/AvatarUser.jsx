import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import imgLogo from "../../../assets/img/Kafetery_logo.png"; // Usamos tu logo como avatar por defecto

export const AvatarUser = () => {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    // Prioridad: Foto de perfil del usuario > Logo de Kafetery
    const avatarSrc = user?.profilePicture && user.profilePicture.trim() !== ""
        ? user.profilePicture : imgLogo;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Contenedor del Avatar Estilizado */}
            <div 
                onClick={toggleMenu}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EADDCA] to-[#D2B48C] p-[2px] shadow-sm cursor-pointer hover:scale-105 transition-transform active:scale-95"
            >
                <div className="w-full h-full rounded-[10px] bg-white overflow-hidden flex items-center justify-center">
                    <img
                        src={avatarSrc}
                        alt={user?.username}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = imgLogo;
                        }}
                    />
                </div>
            </div>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-[#EADDCA]/60 rounded-2xl shadow-xl shadow-[#4A3728]/10 animate-fadeIn z-[70] overflow-hidden">
                    {/* Header del Dropdown */}
                    <div className="px-5 py-4 bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                        <p className="font-black text-[#4A3728] text-sm uppercase tracking-tight">
                            {user?.username || "Usuario"}
                        </p>
                        <p className="text-[10px] font-bold text-[#8B4513] truncate uppercase tracking-wider opacity-70">
                            {user?.email}
                        </p>
                    </div>

                    {/* Links */}
                    <ul className="p-2 text-xs font-bold uppercase tracking-widest text-[#4A3728]">
                        <li>
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#FDF8F3] hover:text-[#8B4513] transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]"></span>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/users"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 p-3 rounded-xl hover:bg-[#FDF8F3] hover:text-[#8B4513] transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]"></span>
                                Usuarios
                            </Link>
                        </li>
                        
                        <li className="mt-1 border-t border-[#EADDCA]/30 pt-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full text-left p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};