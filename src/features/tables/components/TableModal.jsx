import { useState, useEffect } from "react";
import { useTableStore } from "../store/tableStore";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { X, Hash, Users, Store } from "lucide-react";

export const TableModal = ({ isOpen, onClose, table }) => {
    const { createTable, updateTable } = useTableStore();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        tableNumber: "",
        capacity: "",
        restaurant: "69a7073eb039051343b9d993"
    });

    useEffect(() => {
        if (isOpen) {
            if (table) {
                setFormData({
                    tableNumber: table.tableNumber || "",
                    capacity: table.capacity || "",
                    restaurant: table.restaurant?._id || table.restaurant || "69a7073eb039051343b9d993"
                });
            } else {
                setFormData({ tableNumber: "", capacity: "", restaurant: "69a7073eb039051343b9d993" });
            }
        }
    }, [table, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                tableNumber: Number(formData.tableNumber),
                capacity: Number(formData.capacity),
                restaurant: formData.restaurant
            };

            if (table) {
                await updateTable(table._id || table.id, payload);
                showSuccess("Mesa actualizada exitosamente");
            } else {
                await createTable(payload);
                showSuccess("Mesa creada exitosamente");
            }
            onClose();
        } catch (error) {
            showError("Error al procesar la mesa");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/80 backdrop-blur-md flex justify-center items-end md:items-center z-[100] p-0 md:p-4">
            <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl w-full max-w-lg max-h-[94vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 border border-[#EADDCA]/50">
                
                {/* Header Estilo OrderModal */}
                <div className="p-6 md:p-8 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                                {table ? "Editar Mesa" : "Nueva Mesa"}
                            </h2>
                            {table && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[9px] font-black uppercase bg-white/20 px-2 py-0.5 rounded tracking-widest text-[#EADDCA]">Mesa ID:</span>
                                    <code className="text-[10px] font-mono text-white opacity-80">{table._id || table.id}</code>
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-2xl leading-none">&times;</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-[#FDF8F3]/30">
                    <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                        
                        {/* Grid de Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* NÚMERO DE MESA */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest">
                                    <Hash size={12}/> No. Mesa
                                </label>
                                <input 
                                    type="number" 
                                    required 
                                    value={formData.tableNumber} 
                                    onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })} 
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-sm font-bold text-[#4A3728] outline-none focus:border-[#8B4513] transition-colors" 
                                    placeholder="00" 
                                />
                            </div>

                            {/* CAPACIDAD */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest">
                                    <Users size={12}/> Capacidad
                                </label>
                                <input 
                                    type="number" 
                                    required 
                                    value={formData.capacity} 
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} 
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-sm font-bold text-[#4A3728] outline-none focus:border-[#8B4513] transition-colors" 
                                    placeholder="Personas" 
                                />
                            </div>
                        </div>

                        {/* ID RESTAURANTE (Estilo ID Cliente) */}
                        <div className="space-y-2 pt-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest">
                                <Store size={12}/> ID de Sucursal
                            </label>
                            <input 
                                type="text" 
                                required 
                                value={formData.restaurant} 
                                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })} 
                                className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[10px] font-mono outline-none focus:border-[#8B4513] transition-colors" 
                                placeholder="ID Restaurante" 
                            />
                        </div>
                    </div>

                    {/* Botón de Acción Estilo OrderModal */}
                    <div className="p-8 md:p-10 bg-white border-t border-[#EADDCA]/30 shrink-0">
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full py-4 rounded-2xl bg-[#4A3728] text-white hover:bg-[#8B4513] transition-all font-black text-xs uppercase tracking-[0.25em] shadow-2xl active:scale-95 flex items-center justify-center min-h-[60px]"
                        >
                            {loading ? "PROCESANDO..." : (table ? "GUARDAR CAMBIOS" : "CREAR MESA")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};