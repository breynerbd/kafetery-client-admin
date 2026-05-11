import { useState, useEffect } from "react";
import { useUsersStore } from "../../users/store/userStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { UserModal } from "./UserModal.jsx";
import { UserPlus, Edit3, Trash2, Mail, Award, Hash } from "lucide-react";

export const Users = () => {
    const { users = [], getUsers, deactivateUser } = useUsersStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    {/* Carga inicial de datos */}
    useEffect(() => { getUsers(); }, [getUsers]);

    {/* Handlers para apertura de Modal */}
    const handleCreate = () => { setSelectedUser(null); setIsModalOpen(true); };
    const handleManage = (user) => { setSelectedUser(user); setIsModalOpen(true); };

    {/* Lógica de Eliminación/Desactivación */}
    const handleDelete = (userId, userName) => {
        showConfirmToast({
            title: "¿Desactivar usuario?",
            message: `¿Deseas eliminar a "${userName}"?`,
            onConfirm: async () => {
                try {
                    await deactivateUser(userId);
                    showSuccess("Usuario desactivado");
                    await getUsers();
                } catch (err) { showError("Error al desactivar"); }
            }
        });
    };

    return (
        <div className="p-0 md:p-4 max-w-full overflow-x-hidden">
            
            {/* Header Seccion */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 px-4 md:px-0">
                <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#4A3728] uppercase tracking-tighter italic">Control de Usuarios</h1>
                    <p className="text-[#D2B48C] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                        <span className="w-8 h-[2px] bg-[#8B4513]"></span> Gestión de Accesos
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="group bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#8B4513] transition-all shadow-xl shadow-[#4A3728]/20 flex items-center justify-center gap-3 active:scale-95"
                >
                    <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="uppercase tracking-widest text-xs">Nuevo Usuario</span>
                </button>
            </div>

            {/* Contenedor Principal de la Lista */}
            <div className="bg-white md:rounded-[2rem] shadow-xl border border-[#EADDCA]/50 overflow-hidden">
                
                {/* VISTA DESKTOP: Tabla Detallada */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50 text-[10px] font-black uppercase text-[#D2B48C] tracking-widest">
                            <tr>
                                <th className="px-6 py-5">Información / ID</th>
                                <th className="px-6 py-5">Auth ID</th>
                                <th className="px-6 py-5 text-center">Rol</th>
                                <th className="px-6 py-5 text-center">Puntos</th>
                                <th className="px-6 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-black text-[#4A3728] uppercase tracking-tight">{user.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono bg-[#FDF8F3] px-2 py-0.5 rounded border border-[#EADDCA] text-[#8B4513]">
                                                    ID: {user._id}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-[#6F4E37] opacity-70 italic">{user.auth_id}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-[#EADDCA] text-[#4A3728] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                            {user.role?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-black text-[#6F4E37]">{user.loyaltyPoints ?? 0}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleManage(user)} className="p-2.5 text-[#4A3728] bg-[#FDF8F3] border border-[#EADDCA] hover:bg-[#EADDCA] rounded-xl transition-all active:scale-90 shadow-sm"><Edit3 size={18}/></button>
                                            <button onClick={() => handleDelete(user._id, user.name)} className="p-2.5 text-red-600 bg-red-50 border border-red-100 hover:bg-red-600 hover:text-white rounded-xl transition-all active:scale-90 shadow-sm"><Trash2 size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* VISTA MÓVIL: Tarjetas Compactas */}
                <div className="md:hidden divide-y divide-[#EADDCA]/30">
                    {users.length > 0 ? users.map((user) => (
                        <div key={user._id} className="p-5 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-[#4A3728] text-lg leading-none uppercase italic tracking-tighter truncate">{user.name}</h3>
                                    <div className="flex flex-col gap-1 mt-2">
                                        {/* ID Completo del usuario en móvil */}
                                        <span className="text-[9px] text-[#D2B48C] font-mono break-all bg-[#FDF8F3] p-1 rounded border border-[#EADDCA]/50">
                                            USER_ID: {user._id}
                                        </span>
                                        <span className="text-[9px] text-[#8B4513] font-mono opacity-60">AUTH: {user.auth_id}</span>
                                    </div>
                                </div>
                                <span className="bg-[#EADDCA] text-[#4A3728] px-2 py-1 rounded-md text-[9px] font-black uppercase shadow-sm ml-2">
                                    {user.role?.split('_')[0]}
                                </span>
                            </div>
                            
                            <div className="space-y-1.5 border-l-2 border-[#EADDCA] pl-3">
                                <div className="flex items-center gap-2 text-sm text-[#6F4E37] font-medium">
                                    <Mail size={14} className="text-[#D2B48C]" /> {user.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-black text-[#8B4513]">
                                    <Award size={14} className="text-[#D2B48C]" /> {user.loyaltyPoints ?? 0} Puntos
                                </div>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button onClick={() => handleManage(user)} className="flex-1 py-3 bg-[#FDF8F3] border border-[#EADDCA] rounded-2xl text-[#4A3728] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-sm">
                                    <Edit3 size={16}/> Editar
                                </button>
                                <button onClick={() => handleDelete(user._id, user.name)} className="flex-1 py-3 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-sm">
                                    <Trash2 size={16}/> Eliminar
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="p-20 text-center text-[#D2B48C] italic font-medium">No hay usuarios registrados</div>
                    )}
                </div>
            </div>

            {/* Modal de Creación/Edición */}
            <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={selectedUser} />
        </div>
    );
};