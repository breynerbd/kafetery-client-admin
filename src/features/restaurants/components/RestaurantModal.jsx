import { useState, useEffect } from "react";
import { useRestaurantStore } from "../store/restaurantStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const RestaurantModal = ({ isOpen, onClose, restaurant }) => {
    const { createRestaurant, updateRestaurant, error } = useRestaurantStore();
    
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        owner: "",
        openingTime: "",
        closingTime: "",
        description: ""
    });

    useEffect(() => {
        if (isOpen) {
            if (restaurant) {
                setFormData({
                    name: restaurant.name || "",
                    address: restaurant.address || "",
                    phone: restaurant.phone || "",
                    email: restaurant.email || "",
                    owner: restaurant.owner?._id || restaurant.owner || "",
                    openingTime: restaurant.openingTime || "",
                    closingTime: restaurant.closingTime || "",
                    description: restaurant.description || ""
                });
            } else {
                setFormData({
                    name: "",
                    address: "",
                    phone: "",
                    email: "",
                    owner: "",
                    openingTime: "",
                    closingTime: "",
                    description: ""
                });
            }
        }
    }, [restaurant, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (restaurant) {
                await updateRestaurant(restaurant._id || restaurant.id, formData);
                showSuccess("Restaurante actualizado exitosamente");
            } else {
                await createRestaurant(formData);
                showSuccess("Restaurante registrado exitosamente");
            }
            onClose();
        } catch (err) {
            showError(restaurant ? "Error al actualizar el restaurante" : "Error al crear el restaurante");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                {/* Header: Fijo arriba */}
                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {restaurant ? "Editar Información" : "Nuevo Restaurante"}
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

                {/* Cuerpo con Scroll */}
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Nombre del Establecimiento</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej. La Parrilla Rural"
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none shadow-inner focus:border-[#8B4513]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Correo de Contacto</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="sucursal@kafetery.com"
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Teléfono</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+502 5555-1234"
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Hora de Apertura</label>
                            <input
                                type="time"
                                value={formData.openingTime}
                                onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Hora de Cierre</label>
                            <input
                                type="time"
                                value={formData.closingTime}
                                onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID del Propietario (Owner)</label>
                            <input
                                type="text"
                                value={formData.owner}
                                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                                placeholder="Ej. 60c72b2f9b1d8b2d744f1a23"
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-xs outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Ubicación Exacta</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Ej. 10 Avenida 14-25, Zona 10"
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Descripción</label>
                            <textarea
                                rows="2"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Escribe un breve resumen sobre el restaurante..."
                                required
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#6F4E37] text-sm outline-none resize-none focus:border-[#8B4513]"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Footer de Acciones: Fijo abajo */}
                <div className="p-6 sm:p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                    <div className="flex flex-col gap-3">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg text-sm uppercase tracking-widest transition-all ${
                                loading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-[#4A3728] hover:bg-[#6F4E37]"
                            }`}
                        >
                            {loading ? "GUARDANDO..." : restaurant ? "ACTUALIZAR SUCURSAL" : "REGISTRAR EN SISTEMA"}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="w-full py-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};