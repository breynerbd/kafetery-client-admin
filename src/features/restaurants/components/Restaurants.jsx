import { useState, useEffect } from "react";
import { useEffect as useToastEffect } from "react";

import { useRestaurantStore } from "../store/restaurantStore.js"; 
import { useUIStore } from "../../auth/store/uiStore";

import { showError, showSuccess } from "../../../shared/utils/toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { RestaurantModal } from "./RestaurantModal.jsx";

export const Restaurants = () => {
    const { 
        restaurants = [], 
        loading, 
        error, 
        getRestaurants, 
        deactivateRestaurant 
    } = useRestaurantStore();
    
    const { openConfirm } = useUIStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {
        getRestaurants();
    }, [getRestaurants]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedRestaurant(null);
        setIsModalOpen(true);
    };

    const handleManage = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
    };

    const handleDelete = (restaurantId, restaurantName) => {
        showConfirmToast({
            title: "¿Desactivar restaurante?",
            message: `¿Estás seguro de que deseas eliminar al restaurante "${restaurantName}"?`,
            onConfirm: async () => {
                try {
                    await deactivateRestaurant(restaurantId);
                    showSuccess("Restaurante desactivado exitosamente");
                    await getRestaurants();
                } catch (err) {
                    showError("Error al desactivar el restaurante");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Gestión de Restaurantes
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Administración centralizada de sedes y propietarios
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Registrar Restaurante
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Restaurante</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] hidden md:table-cell">Contacto</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] hidden sm:table-cell">ID Propietario</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {restaurants.length > 0 ? (
                                restaurants.map((res, index) => (
                                    <tr key={res._id || res.id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <code className="text-[10px] bg-[#FDF8F3] px-2 py-1 rounded border border-[#EADDCA] text-[#8B4513]">
                                                {res._id || res.id}
                                            </code>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#4A3728]">{res.name}</span>
                                                <span className="text-[10px] text-[#6F4E37] truncate max-w-[200px]">{res.address}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 hidden md:table-cell">
                                            <div className="flex flex-col text-xs">
                                                <span className="text-[#8B4513] font-bold">{res.phone}</span>
                                                <span className="text-[#6F4E37]">{res.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 hidden sm:table-cell">
                                            <code className="text-[10px] bg-[#FDF8F3] px-2 py-1 rounded border border-[#EADDCA] text-[#8B4513]">
                                                {res.owner?._id || res.owner}
                                            </code>
                                        </td>
                                        <td className="px-8 py-5 flex items-center gap-2">
                                            <button
                                                onClick={() => handleManage(res)}
                                                className="bg-[#EADDCA] text-[#4A3728] px-2 py-1 rounded-md text-xs font-extrabold hover:bg-[#D2B48C] transition-all"
                                                title="Gestionar restaurante"
                                            >
                                                Gestionar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(res._id || res.id, res.name)}
                                                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-extrabold hover:bg-red-200 transition-all"
                                                title="Eliminar restaurante"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        {loading ? "Cargando restaurantes..." : "No se encontraron restaurantes en el sistema."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <RestaurantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                restaurant={selectedRestaurant}
            />
        </div>
    );
};