import { useState, useEffect } from "react";
import { useMenuStore } from "../store/menuStore.js";
import { useUIStore } from "../../auth/store/uiStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { MenuModal } from "./MenuModal.jsx";

export const Menus = () => {
    const { 
        menus = [], 
        loading, 
        error, 
        getMenus, 
        deactivateMenu 
    } = useMenuStore();

    const { openConfirm } = useUIStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        getMenus();
    }, [getMenus]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedMenu(null);
        setIsModalOpen(true);
    };

    const handleManage = (menu) => {
        setSelectedMenu(menu);
        setIsModalOpen(true);
    };

    const handleDelete = (menuId, menuName) => {
        showConfirmToast({
            title: "¿Desactivar platillo?",
            message: `¿Estás seguro de que deseas desactivar el platillo "${menuName}"?`,
            onConfirm: async () => {
                try {
                    await deactivateMenu(menuId);
                    showSuccess("Platillo desactivado exitosamente");
                    await getMenus();
                } catch (err) {
                    showError("Error al desactivar el platillo");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Cartas y Menús
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Gestiona los platillos y precios disponibles
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Agregar Platillo
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Platillo</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Precio</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Restaurante ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Stock</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Disponibilidad</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {menus.length > 0 ? (
                                menus.map((item, index) => (
                                    <tr key={item._id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5 text-xs font-mono text-[#4A3728]">
                                            {item._id || item.id}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#4A3728]">{item.name}</span>
                                                <span className="text-[10px] text-[#6F4E37] line-clamp-1">{item.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-[#4A3728]">
                                            Q{item.price?.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-5 text-xs font-mono text-[#6F4E37]">
                                            {item.restaurant?.name || item.restaurant?._id || item.restaurant}
                                        </td>
                                        <td className="px-8 py-5 text-sm text-[#6F4E37] font-bold">
                                            {item.stock}
                                        </td>
                                        <td className="px-8 py-5 text-xs font-mono text-[#6F4E37]">
                                            {item.availableFrom} - {item.availableTo}
                                        </td>
                                        <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleManage(item)}
                                                className="bg-[#EADDCA] text-[#4A3728] px-2 py-1 rounded-md text-xs font-extrabold hover:bg-[#D2B48C] transition-all"
                                                title="Editar"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id || item.id, item.name)}
                                                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-extrabold hover:bg-red-200 transition-all"
                                                title="Eliminar"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        {loading ? "Cargando menús..." : "No hay menús registrados."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <MenuModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                menu={selectedMenu} 
            />
        </div>
    );
};