import { useState, useEffect } from "react";
import { useUsersStore } from "../../users/store/userStore";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { X, User, Mail, Lock, ShieldCheck, Fingerprint } from "lucide-react";

export const UserModal = ({ isOpen, onClose, user }) => {
    const { createUser, updateUser } = useUsersStore();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        auth_id: "",
        name: "",
        email: "",
        password: "",
        role: "CLIENT"
    });

    useEffect(() => {
        if (isOpen) {
            if (user) {
                setFormData({
                    auth_id: user.auth_id || "",
                    name: user.name || "",
                    email: user.email || "",
                    password: "",
                    role: user.role || "CLIENT"
                });
            } else {
                setFormData({ auth_id: "", name: "", email: "", password: "", role: "CLIENT" });
            }
        }
    }, [user, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (user) {
                await updateUser(user._id || user.id, formData);
                showSuccess("Usuario actualizado");
            } else {
                await createUser(formData);
                showSuccess("Usuario creado");
            }
            onClose();
        } catch (error) {
            showError("Ocurrió un error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/80 backdrop-blur-md flex justify-center items-end md:items-center z-[100] p-0 md:p-4 transition-all duration-300">
            <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl w-full max-w-md max-h-[94vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 border border-[#EADDCA]/50">
                
                {/* Header */}
                <div className="p-6 md:p-8 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-2xl">
                                <User size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                                    {user ? "Editar Perfil" : "Nuevo Usuario"}
                                </h2>
                                <p className="text-[10px] text-[#EADDCA] font-bold uppercase tracking-widest mt-1">Control de Acceso</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-[#FDF8F3]/30">
                    <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                        
                        {/* Auth ID */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <Fingerprint size={12}/> Auth ID (Firebase/UID)
                            </label>
                            <input
                                type="text" required
                                value={formData.auth_id}
                                onChange={(e) => setFormData({ ...formData, auth_id: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#8B4513] font-mono text-xs outline-none focus:ring-4 focus:ring-[#8B4513]/5 focus:border-[#8B4513] transition-all"
                            />
                        </div>

                        {/* Nombre */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <User size={12}/> Nombre Completo
                            </label>
                            <input
                                type="text" required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <Mail size={12}/> Correo Electrónico
                            </label>
                            <input
                                type="email" required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <Lock size={12}/> Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder={user ? "Dejar en blanco para no cambiar" : "••••••"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                            />
                        </div>

                        {/* Rol */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <ShieldCheck size={12}/> Nivel de Permisos
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-black text-[10px] uppercase tracking-widest outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-[#8B4513]/5"
                            >
                                <option value="CLIENT">Client / Comensal</option>
                                <option value="RESTAURANT_ADMIN">Restaurant Admin</option>
                                <option value="PLATFORM_ADMIN">Platform Master</option>
                            </select>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="p-8 md:p-10 bg-white border-t border-[#EADDCA]/30 shrink-0">
                        <button
                            type="submit" disabled={loading}
                            className="w-full py-4 rounded-2xl bg-[#4A3728] text-white hover:bg-[#8B4513] transition-all font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-brown-900/30 active:scale-95 flex items-center justify-center min-h-[60px]"
                        >
                            {loading ? "Procesando..." : (user ? "Guardar Cambios" : "Crear Usuario")}
                        </button>
                        <button
                            type="button" onClick={onClose}
                            className="w-full py-3 mt-3 text-[#D2B48C] hover:text-[#8B4513] transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};