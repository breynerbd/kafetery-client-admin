import { useState, useEffect } from "react";

export const UserModal = ({ isOpen, onClose, user }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CLIENT"
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "", // Contraseña vacía por seguridad al editar
                role: user.role || "CLIENT"
            });
        } else {
            setFormData({ name: "", email: "", password: "", role: "CLIENT" });
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {user ? "Editar Perfil" : "Nuevo Usuario"}
                        </h2>
                        <button onClick={onClose} className="text-3xl text-[#EADDCA] hover:text-white transition-transform hover:scale-110">&times;</button>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Nombre Completo</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ej. Carlos Perez"
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Correo Electrónico</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="usuario@gmail.com"
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] text-sm outline-none focus:border-[#8B4513]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Contraseña</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder={user ? "Dejar en blanco para no cambiar" : "******"}
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] text-sm outline-none focus:border-[#8B4513]"
                        />
                    </div>

                    {/* Rol */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Asignar Rol</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-black text-xs uppercase tracking-wider outline-none focus:border-[#8B4513] appearance-none cursor-pointer"
                        >
                            <option value="CLIENT">CLIENT</option>
                            <option value="RESTAURANT_ADMIN">RESTAURANT_ADMIN</option>
                            <option value="PLATFORM_ADMIN">PLATFORM_ADMIN</option>
                        </select>
                    </div>
                </div>

                <div className="p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                    <button className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest">
                        {user ? "Guardar Cambios" : "Crear Cuenta"}
                    </button>
                    <button onClick={onClose} className="w-full py-2 mt-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};