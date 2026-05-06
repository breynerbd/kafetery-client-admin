import { useState, useEffect } from "react";
import { usePromotionsStore } from "../store/promotionStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal.jsx";
import { PromotionModal } from "./PromotionModal.jsx";

export const Promotions = () => {
    const { 
        promotions = [], 
        loading, 
        error, 
        getPromotions, 
        deactivatePromotion 
    } = usePromotionsStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);

    useEffect(() => {
        getPromotions();
    }, [getPromotions]);

    const handleCreate = () => {
        setSelectedPromo(null);
        setIsModalOpen(true);
    };

    const handleManage = (promo) => {
        setSelectedPromo(promo);
        setIsModalOpen(true);
    };

    const handleDelete = (promoId, promoTitle) => {
        showConfirmToast({
            title: "¿Desactivar promoción?",
            message: `¿Estás seguro de que deseas desactivar la promoción "${promoTitle}"?`,
            onConfirm: async () => {
                try {
                    await deactivatePromotion(promoId);
                    showSuccess("Promoción desactivada exitosamente");
                    await getPromotions();
                } catch (err) {
                    showError("Error al desactivar la promoción");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Promociones y Cupones
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Administra descuentos y campañas de fidelización
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Nueva Promoción
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Promoción</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Código</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Descuento</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {promotions.length > 0 ? (
                                promotions.map((promo, index) => (
                                    <tr key={promo._id || promo.id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5 text-xs font-mono text-[#4A3728]">
                                            {promo._id || promo.id || index}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#4A3728]">{promo.title}</span>
                                                <span className="text-[10px] text-[#6F4E37] line-clamp-1">{promo.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-[#4A3728] text-white px-3 py-1 rounded font-mono font-bold text-xs">
                                                {promo.code}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-[#8B4513]">
                                            {promo.discount}% OFF
                                        </td>
                                        <td className="px-8 py-5 text-right flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleManage(promo)}
                                                className="text-[#8B4513] font-bold text-xs hover:text-[#4A3728] transition uppercase tracking-widest"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(promo._id || promo.id, promo.title)}
                                                className="text-red-600 font-bold text-xs hover:text-red-800 transition uppercase tracking-widest"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        No hay promociones vigentes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PromotionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                promotion={selectedPromo}
            />
        </div>
    );
};