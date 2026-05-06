import { useState, useEffect } from "react";
import { useEffect as useToastEffect } from "react";

import { useUsersStore } from "../../users/store/userStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError, showSuccess} from "../../../shared/utils/toast";
import { showConfirmToast} from "../../auth/components/ConfirmModal"
import { UserModal } from "./UserModal.jsx";

export const Users = () => {
    const { 
        users = [], 
        loading, 
        error, 
        getUsers, 
        deactivateUser 
    } = useUsersStore();
    
    const { openConfirm } = useUIStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    const handleManage = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (userId, userName) => {
        showConfirmToast({
            title: "¿Desactivar usuario?",
            message: `¿Estás seguro de que deseas eliminar al usuario "${userName}"?`,
            onConfirm: async () => {
                try {
                    await deactivateUser(userId);
                    showSuccess("Usuario desactivado exitosamente");
                    await getUsers();
                } catch (err) {
                    showError("Error al desactivar el usuario");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Control de Usuarios
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Gestión de accesos y perfiles del ecosistema
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Nuevo Usuario
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Usuario</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Auth ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Correo</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Rol</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Puntos</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5 text-xs font-mono text-[#4A3728]">
                                            {user._id || user.id}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-[#4A3728]">{user.name}</span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-[#6F4E37]">
                                            {user.auth_id}
                                        </td>
                                        <td className="px-8 py-5 text-sm text-[#6F4E37]">
                                            {user.email}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                                user.role === 'PLATFORM_ADMIN' ? 'bg-[#EADDCA] text-[#4A3728]' :
                                                user.role === 'RESTAURANT_ADMIN' ? 'bg-[#EADDCA] text-[#4A3728]' :
                                                'bg-[#EADDCA] text-[#4A3728]'
                                            }`}>
                                                {user.role?.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-[#6F4E37]">
                                            {user.loyaltyPoints ?? 0}
                                        </td>
                                        <td className="px-8 py-5 flex items-center gap-2">
                                            <button
                                                onClick={() => handleManage(user)}
                                                className="bg-[#EADDCA] text-[#4A3728] px-2 py-1 rounded-md text-xs font-extrabold hover:bg-[#D2B48C] transition-all"
                                                title="Editar usuario"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id || user.id, user.name)}
                                                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-extrabold hover:bg-red-200 transition-all"
                                                title="Eliminar usuario"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        {loading ? "Cargando usuarios..." : "No hay usuarios registrados."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
};