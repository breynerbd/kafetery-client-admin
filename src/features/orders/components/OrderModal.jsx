import { useState, useEffect } from "react";

export const OrderModal = ({ isOpen, onClose, order }) => {
    const [formData, setFormData] = useState({
        user: "",
        restaurant: "",
        items: [{ menu: "", quantity: 1 }],
        totalPrice: ""
    });

    useEffect(() => {
        if (order) {
            setFormData({
                user: order.user || "",
                restaurant: order.restaurant || "",
                items: order.items || [{ menu: "", quantity: 1 }],
                totalPrice: order.totalPrice || ""
            });
        } else {
            setFormData({ user: "", restaurant: "", items: [{ menu: "", quantity: 1 }], totalPrice: "" });
        }
    }, [order, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {order ? "Resumen de Comanda" : "Nueva Orden"}
                        </h2>
                        <button onClick={onClose} className="text-3xl text-[#EADDCA] hover:text-white">&times;</button>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto">
                    <div className="space-y-6">
                        {/* IDs de cabecera */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Cliente</label>
                                <input
                                    type="text"
                                    value={formData.user}
                                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none focus:border-[#8B4513]"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Restaurante</label>
                                <input
                                    type="text"
                                    value={formData.restaurant}
                                    onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                                />
                            </div>
                        </div>

                        {/* Listado de Items */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-3 block tracking-[0.15em]">Productos en la Orden</label>
                            <div className="space-y-3">
                                {formData.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-end bg-[#FDF8F3] p-4 rounded-2xl border border-[#EADDCA]/30">
                                        <div className="flex-1">
                                            <label className="text-[9px] font-bold text-[#8B4513] uppercase mb-1 block">ID Menú</label>
                                            <input
                                                type="text"
                                                value={item.menu}
                                                className="w-full bg-transparent text-xs font-mono outline-none text-[#4A3728]"
                                                placeholder="69949b86..."
                                            />
                                        </div>
                                        <div className="w-20">
                                            <label className="text-[9px] font-bold text-[#8B4513] uppercase mb-1 block">Cant.</label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                className="w-full bg-transparent text-sm font-black outline-none text-[#4A3728]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Precio Total */}
                        <div className="pt-4 border-t border-[#EADDCA]/30">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Monto Total a Cobrar</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#4A3728]">Q</span>
                                <input
                                    type="number"
                                    value={formData.totalPrice}
                                    onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-4 bg-[#4A3728] text-white rounded-2xl font-black text-xl outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                    <button className="w-full py-3.5 rounded-xl bg-[#8B4513] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest">
                        {order ? "Actualizar Orden" : "Generar Ticket de Venta"}
                    </button>
                </div>
            </div>
        </div>
    );
};