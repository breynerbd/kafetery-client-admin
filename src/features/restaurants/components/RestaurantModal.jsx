import { useState, useEffect } from "react";
import { useRestaurantStore } from "../store/restaurantStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { X, Store, MapPin, Phone, Mail, Clock, User, AlignLeft, Fingerprint } from "lucide-react";

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
                    name: "", address: "", phone: "", email: "",
                    owner: "", openingTime: "", closingTime: "", description: ""
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
                showSuccess("Establecimiento actualizado");
            } else {
                await createRestaurant(formData);
                showSuccess("Sede registrada con éxito");
            }
            onClose();
        } catch (err) {
            showError(restaurant ? "Error al actualizar" : "Error al registrar");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/80 backdrop-blur-md flex justify-center items-end md:items-center z-[100] p-0 md:p-4 transition-all duration-300">
            <div className="bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[94vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 border border-[#EADDCA]/50">
                
                {/* Header */}
                <div className="p-6 md:p-8 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-2xl">
                                <Store size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                                    {restaurant ? "Editar Sucursal" : "Nueva Sucursal"}
                                </h2>
                                <p className="text-[10px] text-[#EADDCA] font-bold uppercase tracking-widest mt-1">Configuración del Local</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-[#FDF8F3]/30">
                    <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                        
                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-r-xl">
                                Error del Sistema: {error}
                            </div>
                        )}

                        {/* Nombre del local */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <Store size={12}/> Nombre del Establecimiento
                            </label>
                            <input
                                type="text" required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                                placeholder="Ej. Kafetery Central"
                            />
                        </div>

                        {/* Contacto */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                    <Mail size={12}/> Email Público
                                </label>
                                <input
                                    type="email" required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                    <Phone size={12}/> Teléfono
                                </label>
                                <input
                                    type="text" required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                                />
                            </div>
                        </div>

                        {/* Horarios */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                    <Clock size={12}/> Apertura
                                </label>
                                <input
                                    type="time" required
                                    value={formData.openingTime}
                                    onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                                    className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                    <Clock size={12}/> Cierre
                                </label>
                                <input
                                    type="time" required
                                    value={formData.closingTime}
                                    onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                                    className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold outline-none"
                                />
                            </div>
                        </div>

                        {/* Admin / Owner ID */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <Fingerprint size={12}/> ID del Administrador (Owner)
                            </label>
                            <input
                                type="text" required
                                value={formData.owner}
                                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                                className="w-full px-5 py-3 bg-[#FDF8F3] border border-[#EADDCA] rounded-xl text-[#8B4513] font-mono text-[11px] outline-none"
                            />
                        </div>

                        {/* Dirección */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <MapPin size={12}/> Ubicación Física
                            </label>
                            <input
                                type="text" required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5"
                            />
                        </div>

                        {/* Descripción */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] flex items-center gap-2 ml-1 tracking-[0.1em]">
                                <AlignLeft size={12}/> Reseña / Descripción
                            </label>
                            <textarea
                                rows="3" required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-5 py-4 bg-white border border-[#EADDCA] rounded-2xl text-[#6F4E37] text-sm outline-none focus:ring-4 focus:ring-[#8B4513]/5 resize-none"
                                placeholder="Ambiente, especialidades, etc..."
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 md:p-10 bg-white border-t border-[#EADDCA]/30 shrink-0">
                        <button
                            type="submit" disabled={loading}
                            className="w-full py-4 rounded-2xl bg-[#4A3728] text-white hover:bg-[#8B4513] transition-all font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-brown-900/30 active:scale-95 flex items-center justify-center min-h-[60px]"
                        >
                            {loading ? "Registrando..." : (restaurant ? "Actualizar Sede" : "Confirmar Sucursal")}
                        </button>
                        <button
                            type="button" onClick={onClose}
                            className="w-full py-3 mt-3 text-[#D2B48C] hover:text-[#8B4513] transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            Descartar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};