import { useState, useEffect } from "react";
import { useSaveMenu } from "../hooks/useSaveMenu.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { X, Utensils, DollarSign, Package, Clock, MapPin } from "lucide-react";

export const MenuModal = ({ isOpen, onClose, menu }) => {
    const { saveMenu } = useSaveMenu();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "", description: "", price: "", stock: "",
        prepTime: "", availableFrom: "", availableTo: "", restaurant: ""
    });

    useEffect(() => {
        if (isOpen) {
            if (menu) {
                setFormData({
                    name: menu.name || "",
                    description: menu.description || "",
                    price: menu.price || "",
                    stock: menu.stock || "",
                    prepTime: menu.prepTime || "",
                    availableFrom: menu.availableFrom || "",
                    availableTo: menu.availableTo || "",
                    restaurant: menu.restaurant?._id || menu.restaurant || ""
                });
            } else {
                setFormData({ name: "", description: "", price: "", stock: "", prepTime: "", availableFrom: "", availableTo: "", restaurant: "" });
            }
        }
    }, [menu, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveMenu(formData, menu?._id || menu?.id);
            showSuccess(menu ? "Actualizado correctamente" : "Platillo creado");
            onClose();
        } catch (error) {
            showError("Ocurrió un problema");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/80 backdrop-blur-md flex justify-center items-end md:items-center z-[100] p-0 md:p-4">
            <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl w-full max-w-xl max-h-[95vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 border border-[#EADDCA]/50">
                
                {/* Header Modal */}
                <div className="p-6 md:p-8 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black uppercase tracking-tighter leading-none italic">
                                {menu ? "Editar Menú" : "Nuevo Menú"}
                            </h2>
                            <p className="text-[10px] text-[#EADDCA] font-bold uppercase tracking-widest opacity-80">Configuración de carta</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-[#FDF8F3]/30">
                    <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                        
                        {/* Nombre */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1 flex items-center gap-2">
                                <Utensils size={12}/> Nombre del Platillo
                            </label>
                            <input
                                type="text" required value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513] transition-all shadow-sm"
                                placeholder="Ej. Pepián Tradicional"
                            />
                        </div>

                        {/* Grid 2 Columnas */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1 flex items-center gap-2">
                                    <DollarSign size={12}/> Precio
                                </label>
                                <input
                                    type="number" step="0.01" required value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1 flex items-center gap-2">
                                    <Package size={12}/> Stock
                                </label>
                                <input
                                    type="number" required value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                    placeholder="20"
                                />
                            </div>
                        </div>

                        {/* Sucursal ID */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1 flex items-center gap-2">
                                <MapPin size={12}/> Sucursal (ID)
                            </label>
                            <input
                                type="text" required value={formData.restaurant}
                                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#8B4513] font-mono text-xs outline-none focus:border-[#8B4513]"
                                placeholder="ID del restaurante"
                            />
                        </div>

                        {/* Tiempos y Horarios */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1 flex items-center gap-2 italic">
                                    <Clock size={12}/> Prep. (Min)
                                </label>
                                <input
                                    type="number" required value={formData.prepTime}
                                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[#4A3728] font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1">Desde</label>
                                <input
                                    type="time" required value={formData.availableFrom}
                                    onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[#4A3728] font-bold text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1">Hasta</label>
                                <input
                                    type="time" required value={formData.availableTo}
                                    onChange={(e) => setFormData({ ...formData, availableTo: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[#4A3728] font-bold text-xs"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] tracking-widest ml-1 italic">Descripción / Ingredientes</label>
                            <textarea
                                rows="3" required value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#6F4E37] text-sm outline-none resize-none focus:border-[#8B4513]"
                                placeholder="Describe el platillo..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 bg-white border-t border-[#EADDCA]/30 shrink-0">
                        <button 
                            type="submit" disabled={loading}
                            className="w-full py-4 rounded-2xl bg-[#4A3728] text-white hover:bg-[#8B4513] transition-all font-black text-xs uppercase tracking-[0.25em] shadow-2xl active:scale-95 flex items-center justify-center min-h-[60px]"
                        >
                            {loading ? "PROCESANDO..." : (menu ? "GUARDAR CAMBIOS" : "AGREGAR A CARTA")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};