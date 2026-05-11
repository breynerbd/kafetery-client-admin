import { useState, useEffect } from "react";
import { useMenuStore } from "../store/menuStore.js";
import { useUIStore } from "../../auth/store/uiStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { MenuModal } from "./MenuModal.jsx";
import { Edit3, Trash2, Plus, Clock, Package, Utensils } from "lucide-react";

export const Menus = () => {
    const { menus = [], loading, error, getMenus, deactivateMenu } = useMenuStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => { getMenus(); }, [getMenus]);
    useEffect(() => { if (error) showError(error); }, [error]);

    const handleCreate = () => { setSelectedMenu(null); setIsModalOpen(true); };
    const handleManage = (menu) => { setSelectedMenu(menu); setIsModalOpen(true); };

    const handleDelete = (menuId, menuName) => {
        showConfirmToast({
            title: "¿Desactivar platillo?",
            message: `¿Estás seguro de que deseas desactivar "${menuName}"?`,
            onConfirm: async () => {
                try {
                    await deactivateMenu(menuId);
                    showSuccess("Platillo desactivado");
                    await getMenus();
                } catch (err) {
                    showError("Error al desactivar");
                }
            }
        });
    };

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 lg:mb-12">
                <div className="space-y-1 text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#4A3728] uppercase tracking-tighter italic">
                        Sala de Control
                    </h1>
                    <p className="text-[#D2B48C] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-6 md:w-10 h-[2px] bg-[#8B4513]"></span> 
                        Gestión de Menús
                    </p>
                </div>
                
                <button
                    onClick={handleCreate}
                    className="group bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#8B4513] transition-all shadow-xl shadow-[#4A3728]/20 flex items-center justify-center gap-3 active:scale-95 w-full md:w-auto"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="uppercase tracking-widest text-[10px] md:text-xs">Nuevo Menú</span>
                </button>
            </div>

            {/* VISTA MÓVIL (CARDS) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {menus.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-[2.5rem] border border-[#EADDCA]/50 shadow-lg">
                        <div className="mb-4">
                            <div className="font-black text-[#4A3728] uppercase text-sm mb-2">{item.name}</div>
                            <code className="text-[11px] font-mono font-bold text-[#8B4513] bg-[#FDF8F3] px-3 py-1 rounded-lg border border-[#EADDCA]/50 break-all block">
                                {item._id || item.id}
                            </code>
                        </div>

                        <div className="flex justify-between items-center py-3 border-y border-[#EADDCA]/20 mb-4">
                            <span className="bg-[#FDF8F3] px-3 py-1 rounded-full text-[#4A3728] font-black text-sm">
                                Q{item.price?.toFixed(2)}
                            </span>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1 text-[#6F4E37] text-xs font-bold">
                                    <Package size={14} /> {item.stock}
                                </div>
                                <div className="flex items-center gap-1 text-[#6F4E37] text-[10px] font-bold">
                                    <Clock size={14} /> {item.availableFrom}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => handleManage(item)} className="bg-[#FDF8F3] text-[#4A3728] py-3 rounded-xl font-bold text-xs border border-[#EADDCA]/50 flex items-center justify-center gap-2">
                                <Edit3 size={14} /> Editar
                            </button>
                            <button onClick={() => handleDelete(item._id, item.name)} className="bg-red-50 text-red-500 py-3 rounded-xl font-bold text-xs border border-red-100 flex items-center justify-center gap-2">
                                <Trash2 size={14} /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* VISTA TABLETA Y PC (TABLA) */}
            <div className="hidden md:block bg-white rounded-[2.5rem] shadow-2xl shadow-brown-900/10 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.2em]">Referencia / Platillo</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.2em]">Precio</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.2em]">Stock</th>
                                <th className="hidden xl:table-cell px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.2em]">Horario</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.2em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {menus.length > 0 ? (
                                menus.map((item) => (
                                    <tr key={item._id} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            {/* AQUÍ EL ID COMPLETO SEGÚN TU SOLICITUD */}
                                            <div className="space-y-1.5">
                                                <div className="font-black text-[#4A3728] uppercase text-sm leading-none">
                                                    {item.name}
                                                </div>
                                                <code className="inline-block text-[11px] font-mono font-bold text-[#8B4513] bg-[#FDF8F3] px-3 py-1 rounded-lg border border-[#EADDCA]/50">
                                                    {item._id || item.id}
                                                </code>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-black text-[#4A3728] bg-[#FDF8F3] px-3 py-1 rounded-lg border border-[#EADDCA]/50">
                                                Q{item.price?.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-[#6F4E37]">
                                            {item.stock} u.
                                        </td>
                                        <td className="hidden xl:table-cell px-8 py-5 text-[10px] font-bold text-[#D2B48C] uppercase italic">
                                            {item.availableFrom} - {item.availableTo}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleManage(item)} className="p-2.5 bg-[#4A3728] text-white rounded-xl hover:bg-[#8B4513] transition-all shadow-md">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(item._id, item.name)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium uppercase tracking-[0.2em] text-xs">
                                        {loading ? "Sincronizando..." : "Sin registros"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <MenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} menu={selectedMenu} />
        </div>
    );
};