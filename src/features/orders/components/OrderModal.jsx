import { useState, useEffect } from "react";
import { useSaveOrder } from "../hooks/useSaveOrder.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { X, User, Utensils, Hash, Plus, Trash2, Fingerprint, Activity } from "lucide-react";

export const OrderModal = ({ isOpen, onClose, order }) => {
    const { saveOrder } = useSaveOrder();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user: "", 
        restaurant: "", 
        table: "", 
        items: [{ menu: "", quantity: 1 }],
        status: "PENDING"
    });

    const statusOptions = [
        { value: 'PENDING', label: 'Pendiente' },
        { value: 'CONFIRMED', label: 'Confirmada' },
        { value: 'PREPARING', label: 'En Preparación' },
        { value: 'READY', label: 'Listo para Entrega' },
        { value: 'DELIVERED', label: 'Entregado' },
        { value: 'CANCELED', label: 'Cancelado' }
    ];

    useEffect(() => {
        if (isOpen) {
            if (order) {
                setFormData({
                    user: order.user?._id || order.user || "",
                    restaurant: order.restaurant?._id || order.restaurant || "",
                    table: order.table || "",
                    status: order.status || "PENDING",
                    items: order.items?.map(item => ({
                        menu: item.menu?._id || item.menu || "",
                        quantity: item.quantity || 1
                    })) || [{ menu: "", quantity: 1 }]
                });
            } else {
                setFormData({ 
                    user: "", 
                    restaurant: "", 
                    table: "", 
                    items: [{ menu: "", quantity: 1 }],
                    status: "PENDING" 
                });
            }
        }
    }, [order, isOpen]);

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { menu: "", quantity: 1 }]
        });
    };

    const handleRemoveItem = (index) => {
        const newItems = formData.items.filter((_, idx) => idx !== index);
        setFormData({ ...formData, items: newItems });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = field === "quantity" ? Number(value) : value;
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveOrder(formData, order?._id || order?.id);
            showSuccess(order ? "Orden actualizada exitosamente" : "Orden creada exitosamente");
            onClose();
        } catch (error) {
            showError(order ? "Error al actualizar" : "Error al crear");
        } finally { setLoading(false); }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/80 backdrop-blur-md flex justify-center items-end md:items-center z-[100] p-0 md:p-4">
            <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[94vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 border border-[#EADDCA]/50">
                
                {/* Header */}
                <div className="p-6 md:p-8 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                                {order ? "Editar Orden" : "Nueva Orden"}
                            </h2>
                            {order && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[9px] font-black uppercase bg-white/20 px-2 py-0.5 rounded tracking-widest text-[#EADDCA]">System ID:</span>
                                    <code className="text-[10px] font-mono text-white opacity-80">{order._id || order.id}</code>
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-2xl leading-none">&times;</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-[#FDF8F3]/30">
                    <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest"><User size={12}/> ID Cliente</label>
                                <input 
                                    type="text" required value={formData.user} 
                                    onChange={(e) => setFormData({ ...formData, user: e.target.value })} 
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[10px] font-mono outline-none focus:border-[#8B4513] transition-colors" 
                                    placeholder="ID de Cliente" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest"><Fingerprint size={12}/> Restaurante</label>
                                <input 
                                    type="text" required value={formData.restaurant} 
                                    onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })} 
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[10px] font-mono outline-none focus:border-[#8B4513] transition-colors" 
                                    placeholder="ID Restaurante" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest"><Hash size={12}/> Mesa</label>
                                <input 
                                    type="text" required value={formData.table} 
                                    onChange={(e) => setFormData({ ...formData, table: e.target.value })} 
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-xs font-bold outline-none focus:border-[#8B4513] transition-colors" 
                                    placeholder="No. Mesa" 
                                />
                            </div>
                        </div>

                        {/* ESTADO DE LA ORDEN */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-widest"><Activity size={12}/> Estado de la Orden</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-xs font-bold text-[#4A3728] outline-none focus:border-[#8B4513] appearance-none transition-colors"
                            >
                                {statusOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* SECCIÓN ITEMS */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 tracking-widest"><Utensils size={12}/> Comanda (Menú)</label>
                                <button type="button" onClick={handleAddItem} className="text-[#8B4513] text-[10px] font-black uppercase flex items-center gap-1 hover:bg-brown-50 px-2 py-1 rounded-lg transition-colors">
                                    <Plus size={12}/> Agregar Item
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {formData.items.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-center bg-white p-3 rounded-2xl border border-[#EADDCA]/50 shadow-sm animate-in slide-in-from-left-2">
                                        <input 
                                            placeholder="ID del Menú" 
                                            value={item.menu} 
                                            onChange={(e) => handleItemChange(index, "menu", e.target.value)}
                                            className="flex-1 bg-transparent text-[11px] font-mono outline-none px-2"
                                            required
                                        />
                                        <div className="flex items-center bg-[#FDF8F3] rounded-xl border border-[#EADDCA]/30">
                                            <input 
                                                type="number" min="1"
                                                value={item.quantity} 
                                                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                                className="w-12 bg-transparent text-center font-bold text-[#8B4513] py-2 text-xs outline-none"
                                                required
                                            />
                                        </div>
                                        <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-colors">
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 bg-white border-t border-[#EADDCA]/30 shrink-0">
                        <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-[#4A3728] text-white hover:bg-[#8B4513] transition-all font-black text-xs uppercase tracking-[0.25em] shadow-2xl active:scale-95 flex items-center justify-center min-h-[60px]">
                            {loading ? "PROCESANDO..." : (order ? "GUARDAR CAMBIOS" : "LANZAR ORDEN")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};