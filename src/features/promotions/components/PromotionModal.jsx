import { useState, useEffect } from "react";

export const PromotionModal = ({ isOpen, onClose, promotion }) => {
    const [formData, setFormData] = useState({
        title: "",
        code: "",
        description: "",
        discount: 0,
        restaurant: "",
        validFrom: "",
        validTo: ""
    });

    useEffect(() => {
        if (promotion) {
            setFormData({
                title: promotion.title || "",
                code: promotion.code || "",
                description: promotion.description || "",
                discount: promotion.discount || 0,
                restaurant: promotion.restaurant || "",
                validFrom: promotion.validFrom ? new Date(promotion.validFrom).toISOString().slice(0, 16) : "",
                validTo: promotion.validTo ? new Date(promotion.validTo).toISOString().slice(0, 16) : ""
            });
        } else {
            setFormData({ title: "", code: "", description: "", discount: 0, restaurant: "", validFrom: "", validTo: "" });
        }
    }, [promotion, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {promotion ? "Editar Promoción" : "Nueva Promoción"}
                        </h2>
                        <button onClick={onClose} className="text-3xl text-[#EADDCA] hover:text-white transition-transform hover:scale-110">&times;</button>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Título de la Campaña</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej. Descuento de Hamburguesa"
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Código de Cupón</label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="PROMO50"
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Porcentaje (%)</label>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Restaurante</label>
                            <input
                                type="text"
                                value={formData.restaurant}
                                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-xs outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Válido Desde</label>
                            <input
                                type="datetime-local"
                                value={formData.validFrom}
                                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-xs outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Válido Hasta</label>
                            <input
                                type="datetime-local"
                                value={formData.validTo}
                                onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-xs outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Descripción</label>
                            <textarea
                                rows="2"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none resize-none focus:border-[#8B4513]"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                    <button className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest">
                        {promotion ? "Actualizar Campaña" : "Lanzar Promoción"}
                    </button>
                    <button onClick={onClose} className="w-full py-2 mt-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]">
                        Descartar
                    </button>
                </div>
            </div>
        </div>
    );
};