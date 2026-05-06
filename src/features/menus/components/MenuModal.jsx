import { useState, useEffect } from "react";
import { useSaveMenu } from "../hooks/useSaveMenu.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";

export const MenuModal = ({ isOpen, onClose, menu }) => {
    const { saveMenu } = useSaveMenu();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        prepTime: "",
        availableFrom: "",
        availableTo: "",
        restaurant: ""
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
                    restaurant: menu.restaurant || ""
                });
            } else {
                setFormData({ 
                    name: "", 
                    description: "", 
                    price: "", 
                    stock: "",
                    prepTime: "",
                    availableFrom: "",
                    availableTo: "",
                    restaurant: "" 
                });
            }
        }
    }, [menu, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await saveMenu(formData, menu?._id || menu?.id);
            showSuccess(menu ? "Platillo actualizado exitosamente" : "Platillo agregado al menú");
            onClose();
        } catch (error) {
            showError(menu ? "Error al actualizar el platillo" : "Error al agregar el platillo");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {menu ? "Editar Platillo" : "Nuevo Platillo"}
                        </h2>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="text-3xl text-[#EADDCA] hover:text-white transition-transform hover:scale-110"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <div className="p-8 overflow-y-auto space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Nombre del Platillo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ej. Desayuno Chapín"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none shadow-inner focus:border-[#8B4513]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Precio (Q)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Restaurante</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.restaurant}
                                    onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                    placeholder="ID de Referencia"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none focus:border-[#8B4513]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Stock</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="10"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Tiempo de preparación (min)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.prepTime}
                                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                                    placeholder="15"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Disponible desde</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.availableFrom}
                                    onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Disponible hasta</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.availableTo}
                                    onChange={(e) => setFormData({ ...formData, availableTo: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Descripción / Ingredientes</label>
                                <textarea
                                    rows="3"
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Ej. Huevos, frijoles y plátano"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none resize-none focus:border-[#8B4513]"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest flex items-center justify-center min-h-[50px]"
                        >
                            {loading ? "Cargando..." : (menu ? "Guardar Cambios" : "Agregar al Menú")}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="w-full py-2 mt-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};