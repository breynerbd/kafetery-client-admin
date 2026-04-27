import { useState, useEffect } from "react";

export const TableModal = ({ isOpen, onClose, table }) => {
    const [formData, setFormData] = useState({
        tableNumber: "",
        capacity: "",
        restaurant: ""
    });

    useEffect(() => {
        if (table) {
            setFormData({
                tableNumber: table.tableNumber || "",
                capacity: table.capacity || "",
                restaurant: table.restaurant || ""
            });
        } else {
            setFormData({ tableNumber: "", capacity: "", restaurant: "" });
        }
    }, [table, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                {/* Header Dinámico */}
                <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {table ? `Editar Mesa ${table.tableNumber}` : "Nueva Mesa"}
                        </h2>
                        <button onClick={onClose} className="text-3xl text-[#EADDCA] hover:text-white transition-transform hover:scale-110">&times;</button>
                    </div>
                </div>

                <div className="p-8 space-y-5">
                    {/* Número de Mesa */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Número Identificador</label>
                        <input
                            type="number"
                            value={formData.tableNumber}
                            onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                            placeholder="Ej. 5"
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513] shadow-inner"
                        />
                    </div>

                    {/* Capacidad */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Capacidad (Asientos)</label>
                        <input
                            type="number"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            placeholder="Ej. 4"
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                        />
                    </div>

                    {/* Restaurant ID */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID de Restaurante</label>
                        <input
                            type="text"
                            value={formData.restaurant}
                            onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                            placeholder="ID de referencia"
                            className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-xs outline-none focus:border-[#8B4513]"
                        />
                    </div>

                    {/* Footer de Acciones */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-[#EADDCA]/30">
                        <button className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest">
                            {table ? "Guardar Cambios" : "Habilitar Mesa"}
                        </button>
                        <button onClick={onClose} className="w-full py-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};