import { useState, useEffect } from "react";
import { useEffect as useToastEffect } from "react";
import { useRestaurantStore } from "../store/restaurantStore.js"; 
import { useUIStore } from "../../auth/store/uiStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { RestaurantModal } from "./RestaurantModal.jsx";
import { Store, Plus, MapPin, Phone, Mail, Edit3, Trash2 } from "lucide-react";

export const Restaurants = () => {
    const { 
        restaurants = [], 
        loading, 
        error, 
        getRestaurants, 
        deactivateRestaurant 
    } = useRestaurantStore();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {
        getRestaurants();
    }, [getRestaurants]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedRestaurant(null);
        setIsModalOpen(true);
    };

    const handleManage = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
    };

    const handleDelete = (restaurantId, restaurantName) => {
        showConfirmToast({
            title: "¿Desactivar restaurante?",
            message: `¿Estás seguro de que deseas eliminar al restaurante "${restaurantName}"?`,
            onConfirm: async () => {
                try {
                    await deactivateRestaurant(restaurantId);
                    showSuccess("Restaurante desactivado");
                    await getRestaurants();
                } catch (err) {
                    showError("Error al desactivar");
                }
            }
        });
    };

    return (
        <div className="p-0 md:p-4 max-w-full overflow-x-hidden">
            
            {/* Header Seccion */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 px-4 md:px-0">
                <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#4A3728] uppercase tracking-tighter italic">Sala de Control</h1>
                    <p className="text-[#D2B48C] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                        <span className="w-8 h-[2px] bg-[#8B4513]"></span> Gestión de Restaurantes
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="group bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#8B4513] transition-all shadow-xl shadow-[#4A3728]/20 flex items-center justify-center gap-3 active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="uppercase tracking-widest text-xs">Nuevo Restaurante</span>
                </button>
            </div>

            {/* Contenedor Principal */}
            <div className="bg-white md:rounded-[2rem] shadow-xl border border-[#EADDCA]/50 overflow-hidden">
                
                {/* VISTA DESKTOP: Tabla */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em]">
                            <tr>
                                <th className="px-8 py-5">Establecimiento / ID</th>
                                <th className="px-8 py-5">Contacto</th>
                                <th className="px-8 py-5 text-center">Admin ID</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {restaurants.map((res) => (
                                <tr key={res._id || res.id} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-[#4A3728] text-sm uppercase tracking-tight">{res.name}</span>
                                            {/* ID Completo */}
                                            <span className="text-[#D2B48C] text-[9px] font-mono bg-[#FDF8F3] px-2 py-0.5 rounded border border-[#EADDCA] w-fit">
                                                {res._id || res.id}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col text-xs gap-1">
                                            <span className="text-[#8B4513] font-bold flex items-center gap-1 leading-none"><MapPin size={12}/> {res.address}</span>
                                            <span className="text-[#6F4E37] flex items-center gap-1 opacity-70"><Phone size={12}/> {res.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <code className="text-[10px] bg-[#FDF8F3] px-3 py-1.5 rounded-lg border border-[#EADDCA] text-[#8B4513] font-mono font-bold">
                                            {res.owner ? (typeof res.owner === 'object' ? res.owner._id : res.owner).substring(0, 10) : 'N/A'}
                                        </code>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleManage(res)} className="p-2.5 text-[#4A3728] bg-[#FDF8F3] hover:bg-[#EADDCA] border border-[#EADDCA] rounded-xl transition-all active:scale-90" title="Editar">
                                                <Edit3 size={18}/>
                                            </button>
                                            <button onClick={() => handleDelete(res._id || res.id, res.name)} className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-100 rounded-xl transition-all active:scale-90" title="Eliminar">
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* VISTA MÓVIL: Tarjetas con ID completo */}
                <div className="md:hidden divide-y divide-[#EADDCA]/30">
                    {restaurants.length > 0 ? restaurants.map((res) => (
                        <div key={res._id || res.id} className="p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-[#4A3728] text-xl uppercase tracking-tighter italic leading-none truncate">{res.name}</h3>
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        {/* ID Restaurante Completo */}
                                        <span className="text-[9px] text-[#D2B48C] font-mono break-all bg-[#FDF8F3] p-1 rounded border border-[#EADDCA]/50">
                                            ID: {res._id || res.id}
                                        </span>
                                        <span className="text-[9px] text-[#8B4513] font-mono font-bold uppercase tracking-widest bg-[#EADDCA]/20 px-2 py-0.5 rounded w-fit">
                                            ADMIN: {res.owner ? (typeof res.owner === 'object' ? res.owner._id : res.owner).substring(0, 10) : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-[#4A3728] text-white p-2 rounded-xl shadow-lg ml-2">
                                    <Store size={20} />
                                </div>
                            </div>
                            
                            <div className="space-y-2 border-l-2 border-[#EADDCA] pl-4 py-1">
                                <div className="flex items-center gap-2 text-sm text-[#6F4E37] font-medium leading-tight">
                                    <MapPin size={14} className="text-[#D2B48C] shrink-0" /> {res.address}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#6F4E37]">
                                    <Phone size={14} className="text-[#D2B48C] shrink-0" /> {res.phone}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button 
                                    onClick={() => handleManage(res)} 
                                    className="flex-1 py-3 bg-[#FDF8F3] border border-[#EADDCA] rounded-2xl text-[#4A3728] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                                >
                                    <Edit3 size={16}/> Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(res._id || res.id, res.name)} 
                                    className="flex-1 py-3 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                                >
                                    <Trash2 size={16}/> Eliminar
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="p-20 text-center text-[#D2B48C] italic">No hay sedes registradas</div>
                    )}
                </div>
            </div>

            <RestaurantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                restaurant={selectedRestaurant}
            />
        </div>
    );
};