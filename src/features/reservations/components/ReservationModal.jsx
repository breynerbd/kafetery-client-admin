import { useState, useEffect } from "react";
import { useSaveReservation } from "../hooks/useSaveReservation.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { Calendar, Clock, Users as UsersIcon, Fingerprint } from "lucide-react";

export const ReservationModal = ({ isOpen, onClose, reservation }) => {
    const { saveReservation } = useSaveReservation();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        user: "",
        restaurant: "",
        table: "",
        date: "",
        time: "",
        people: 1
    });

    useEffect(() => {
        if (isOpen) {
            if (reservation) {
                setFormData({
                    user: reservation.user?._id || reservation.user || "",
                    restaurant: reservation.restaurant?._id || reservation.restaurant || "",
                    table: reservation.table?._id || reservation.table || "",
                    date: reservation.date ? reservation.date.split('T')[0] : "",
                    time: reservation.time || "",
                    people: reservation.people || reservation.guests || 1
                });
            } else {
                setFormData({ user: "", restaurant: "", table: "", date: "", time: "", people: 1 });
            }
        }
    }, [reservation, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await saveReservation(formData, reservation?._id || reservation?.id);
            showSuccess(reservation ? "Reserva actualizada" : "Reserva creada");
            onClose();
        } catch (error) {
            showError("Error al procesar reserva");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/80 backdrop-blur-md flex justify-center items-end md:items-center z-[100] p-0 md:p-4 transition-all">
            <div className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 border border-[#EADDCA]/50">
                
                {/* Modal Header */}
                <div className="p-6 text-white shrink-0 relative" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Calendar size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tighter">
                                {reservation ? "Editar Reservación" : "Nueva Reservación"}
                            </h2>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-2xl transition-all">&times;</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden bg-[#FDF8F3]/30">
                    <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                        
                        {/* Fecha y Hora */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] ml-1 tracking-widest flex items-center gap-1"><Calendar size={10}/> Fecha</label>
                                <input
                                    type="date" required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-3.5 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:ring-2 focus:ring-[#8B4513]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] ml-1 tracking-widest flex items-center gap-1"><Clock size={10}/> Hora</label>
                                <input
                                    type="time" required
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full px-4 py-3.5 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-bold text-sm outline-none focus:ring-2 focus:ring-[#8B4513]/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Personas */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] ml-1 tracking-widest flex items-center gap-1"><UsersIcon size={10}/> Comensales</label>
                            <input
                                type="number" min="1" required
                                value={formData.people}
                                onChange={(e) => setFormData({ ...formData, people: Number(e.target.value) })}
                                className="w-full px-4 py-3.5 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-black text-lg outline-none focus:ring-2 focus:ring-[#8B4513]/20"
                            />
                        </div>

                        {/* IDs de Sistema (User/Table/Rest) */}
                        <div className="space-y-4 pt-4 border-t border-[#EADDCA]/50">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] ml-1 tracking-widest flex items-center gap-1"><Fingerprint size={10}/> ID Usuario</label>
                                <input
                                    type="text" required
                                    value={formData.user}
                                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA] rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-[#D2B48C] ml-1 tracking-widest">ID Mesa</label>
                                    <input
                                        type="text" required
                                        value={formData.table}
                                        onChange={(e) => setFormData({ ...formData, table: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA] rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-[#D2B48C] ml-1 tracking-widest">ID Restaurante</label>
                                    <input
                                        type="text" required
                                        value={formData.restaurant}
                                        onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA] rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 md:p-8 bg-white border-t border-[#EADDCA]/30 space-y-3">
                        <button
                            type="submit" disabled={loading}
                            className="w-full py-4 rounded-2xl bg-[#4A3728] text-white hover:bg-[#8B4513] transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brown-900/20 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Procesando..." : (reservation ? "Guardar Cambios" : "Confirmar Cita")}
                        </button>
                        <button type="button" onClick={onClose} className="w-full py-2 text-[#D2B48C] hover:text-[#8B4513] transition font-black text-[10px] uppercase tracking-widest">
                            Cancelar Registro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};