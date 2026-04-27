import { useState, useEffect } from "react";

export const ReservationModal = ({ isOpen, onClose, reservation }) => {
    const [formData, setFormData] = useState({
        user: "",
        restaurant: "",
        table: "",
        date: "",
        guests: 1
    });

    useEffect(() => {
        if (reservation) {
            // Formatear fecha para el input datetime-local
            const formattedDate = reservation.date ? new Date(reservation.date).toISOString().slice(0, 16) : "";
            setFormData({
                user: reservation.user || "",
                restaurant: reservation.restaurant || "",
                table: reservation.table || "",
                date: formattedDate,
                guests: reservation.guests || 1
            });
        } else {
            setFormData({ user: "", restaurant: "", table: "", date: "", guests: 1 });
        }
    }, [reservation, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {reservation ? "Detalles de Reserva" : "Nueva Reservación"}
                        </h2>
                        <button onClick={onClose} className="text-3xl text-[#EADDCA] hover:text-white">&times;</button>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Fecha y Hora */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Fecha y Hora del Evento</label>
                            <input
                                type="datetime-local"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        {/* Cantidad de Personas */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Número de Comensales (Guests)</label>
                            <input
                                type="number"
                                min="1"
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        {/* IDs de Referencia */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Usuario</label>
                            <input
                                type="text"
                                value={formData.user}
                                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Mesa</label>
                            <input
                                type="text"
                                value={formData.table}
                                onChange={(e) => setFormData({ ...formData, table: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Restaurante</label>
                            <input
                                type="text"
                                value={formData.restaurant}
                                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                    <button className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest">
                        {reservation ? "Actualizar Reserva" : "Confirmar Cita"}
                    </button>
                    <button onClick={onClose} className="w-full py-2 mt-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]">
                        Cerrar Agenda
                    </button>
                </div>
            </div>
        </div>
    );
};