import { useState, useEffect } from "react";
import { useUsersStore } from "../../users/store/userStore"; // Asegúrate de que la ruta sea correcta
import { showError, showSuccess } from "../../../shared/utils/toast.js";

export const UserModal = ({ isOpen, onClose, user }) => {
    // Extraemos las funciones para crear y actualizar directamente del store
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
                    password: "", // Contraseña vacía por seguridad al editar
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
                // Actualizamos el usuario
                await updateUser(user._id || user.id, formData);
                showSuccess("Usuario actualizado exitosamente");
            } else {
                // Creamos el nuevo usuario
                await createUser(formData);
                showSuccess("Usuario creado exitosamente");
            }
            onClose();
        } catch (error) {
            showError(user ? "Error al actualizar el usuario" : "Error al crear el usuario");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {user ? "Editar Perfil" : "Nuevo Usuario"}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-3xl text-[#EADDCA] hover:text-white transition-transform hover:scale-110"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <div className="p-8 overflow-y-auto space-y-4">

                        {/* Auth ID */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Auth ID</label>
                            <input
                                type="text"
                                required
                                value={formData.auth_id}
                                onChange={(e) => setFormData({ ...formData, auth_id: e.target.value })}
                                placeholder="Ej. auth-12345"
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        {/* Nombre */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Nombre Completo</label>
                            <input
                                type="text"
                                required
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
                                required
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
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest flex items-center justify-center min-h-[50px]"
                        >
                            {loading ? "Cargando..." : (user ? "Guardar Cambios" : "Crear Cuenta")}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-2 mt-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};