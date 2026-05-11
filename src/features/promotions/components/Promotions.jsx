import { useState, useEffect } from "react";
import { usePromotionsStore } from "../store/promotionStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { PromotionModal } from "./PromotionModal.jsx";
import { Plus, Edit3, Trash2, Tag, Fingerprint, Copy } from "lucide-react";

export const Promotions = () => {
    const { promotions = [], getPromotions, deactivatePromotion } = usePromotionsStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);

    useEffect(() => { getPromotions(); }, [getPromotions]);

    const handleCreate = () => { setSelectedPromo(null); setIsModalOpen(true); };
    const handleManage = (promo) => { setSelectedPromo(promo); setIsModalOpen(true); };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        showSuccess("ID copiado al portapapeles");
    };

    const handleDelete = (promoId, promoTitle) => {
        showConfirmToast({
            title: "¿Desactivar?",
            message: `¿Deseas quitar la promoción "${promoTitle}"?`,
            onConfirm: async () => {
                try {
                    await deactivatePromotion(promoId);
                    showSuccess("Promoción eliminada");
                    getPromotions();
                } catch (err) { showError("Error al eliminar"); }
            }
        });
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
               <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#4A3728] uppercase tracking-tighter italic">Sala de Control</h1>
                    <p className="text-[#D2B48C] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                        <span className="w-8 h-[2px] bg-[#8B4513]"></span> Gestión de Promociones
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="group bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#8B4513] transition-all shadow-xl shadow-[#4A3728]/20 flex items-center justify-center gap-3 active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="uppercase tracking-widest text-xs">Nuevo Cupón</span>
                </button>
            </div>

            {/* VISTA MÓVIL / TABLET (Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
                {promotions.map((promo) => (
                    <div key={promo._id || promo.id} className="bg-white p-6 rounded-[2.5rem] border border-[#EADDCA]/50 shadow-sm">
                        {/* ID COMPLETO EN MÓVIL */}
                        <div className="mb-4 p-3 bg-[#FDF8F3] rounded-xl border border-[#EADDCA]/30 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-[#D2B48C] uppercase tracking-widest">ID</span>
                                <code className="text-[11px] font-mono font-bold text-[#8B4513] break-all">
                                    {promo._id || promo.id}
                                </code>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-black text-[#4A3728] text-lg uppercase tracking-tight">{promo.title}</h3>
                            <span className="text-[#8B4513] font-black text-xl italic">{promo.value}%</span>
                        </div>
                        
                        <p className="text-xs text-[#6F4E37] mb-4 line-clamp-2">{promo.description}</p>
                        
                        <div className="flex items-center gap-2 mb-6 bg-[#4A3728] w-fit px-3 py-1.5 rounded-xl">
                            <Tag size={12} className="text-[#EADDCA]" />
                            <span className="text-white font-mono font-bold text-xs tracking-widest">{promo.code}</span>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-[#EADDCA]/30">
                            <button onClick={() => handleManage(promo)} className="flex-1 py-3 rounded-xl bg-[#4A3728] text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                                <Edit3 size={14}/> Editar
                            </button>
                            <button onClick={() => handleDelete(promo._id || promo.id, promo.title)} className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-100">
                                <Trash2 size={18}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* VISTA DESKTOP (Tabla) */}
            <div className="hidden lg:block bg-white rounded-[3rem] shadow-2xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#FDF8F3]">
                        <tr>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-widest">ID del Sistema</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-widest">Campaña</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-widest">Código</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EADDCA]/20">
                        {promotions.map((promo) => (
                            <tr key={promo._id || promo.id} className="hover:bg-[#FDF8F3]/40 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <code className="text-[11px] font-mono font-bold text-[#8B4513] bg-[#FDF8F3] px-3 py-1 rounded-lg border border-[#EADDCA]/50">
                                            {promo._id || promo.id}
                                        </code>
                                        <button onClick={() => copyToClipboard(promo._id || promo.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D2B48C] hover:text-[#8B4513]">
                                            <Copy size={12} />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="font-bold text-[#4A3728] uppercase text-sm">{promo.title}</p>
                                    <p className="text-[10px] text-[#6F4E37] truncate max-w-[150px]">{promo.description}</p>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="bg-[#4A3728] text-white px-3 py-1.5 rounded-lg font-mono font-bold text-xs uppercase tracking-widest">
                                        {promo.code}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleManage(promo)} className="p-2.5 bg-[#FDF8F3] text-[#4A3728] rounded-xl hover:bg-[#4A3728] hover:text-white transition-all"><Edit3 size={18}/></button>
                                        <button onClick={() => handleDelete(promo._id || promo.id, promo.title)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PromotionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} promotion={selectedPromo} />
        </div>
    );
};