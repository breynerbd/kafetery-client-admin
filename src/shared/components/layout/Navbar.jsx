import imgLogo from "../../../assets/img/Kafetery_logo.png";
import { Menu, Bell } from "lucide-react";
import { AvatarUser } from "../ui/AvatarUser";
import { useAuthStore } from "../../../features/auth/store/authStore.js";

export const Navbar = ({ onMenuClick }) => {
    const { user } = useAuthStore();

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[60] border-b border-[#EADDCA]/60 shadow-sm">
            <div className="w-full mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

                {/* IZQUIERDA: Botón Móvil + Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-[#4A3728] hover:bg-[#FDF8F3] rounded-xl transition-colors"
                    >
                        <Menu size={28} />
                    </button>

                    <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                        <div className="bg-[#FDF8F3] p-1.5 md:p-2 rounded-xl border border-[#EADDCA] transition-transform group-hover:scale-105 shadow-sm">
                            <img src={imgLogo} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-black text-[#4A3728] text-lg md:text-xl tracking-tighter leading-none">
                                KAFETERY
                            </h1>
                            <span className="text-[8px] md:text-[10px] font-bold text-[#8B4513] uppercase tracking-[0.2em] mt-1 hidden xs:block">
                                Management System
                            </span>
                        </div>
                    </div>
                </div>

                {/* DERECHA: Notificaciones + Perfil */}
                <div className="flex items-center gap-3 md:gap-6">
                    {/* Botón de Notificaciones */}
                    <button className="relative group p-2 text-[#8B4513] hover:bg-[#FDF8F3] rounded-xl transition-all">
                        <Bell size={24} strokeWidth={1.8} />
                        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 border-2 border-white"></span>
                        </span>
                    </button>

                    <div className="h-8 w-[1px] bg-[#EADDCA] hidden md:block"></div>

                    {/* Información de Usuario + Avatar Component */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden lg:block">
                            <p className="text-xs font-black text-[#4A3728] uppercase tracking-tighter">
                                {user?.username || "Admin"}
                            </p>
                            <p className="text-[9px] font-bold text-[#D2B48C] uppercase tracking-widest">
                                {user?.role || "Gerencia"}
                            </p>
                        </div>

                        {/* El componente AvatarUser que maneja el menú y el logo */}
                        <AvatarUser />
                    </div>
                </div>
            </div>
        </nav>
    );
};