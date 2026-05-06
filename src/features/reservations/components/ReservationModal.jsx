import { useState, useEffect } from "react";
import { useSaveReservation } from "../hooks/useSaveReservation.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";

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
                    user: reservation.user || "",
                    restaurant: reservation.restaurant || "",
                    table: reservation.table || "",
                    date: reservation.date || "",
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
            showSuccess(reservation ? "Reserva actualizada exitosamente" : "Reserva creada exitosamente");
            onClose();
        } catch (error) {
            showError(reservation ? "Error al actualizar la reserva" : "Error al crear la reserva");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3728]/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-[#EADDCA]/50">

                <div className="p-6 text-white shrink-0" style={{ background: "linear-gradient(135deg, #4A3728 0%, #8B4513 100%)" }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black uppercase tracking-tighter">
                            {reservation ? "Detalles de Reserva" : "Nueva Reservación"}
                        </h2>
                        <button type="button" onClick={onClose} className="text-3xl text-[#EADDCA] hover:text-white">&times;</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <div className="p-8 overflow-y-auto space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Fecha</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>
                            
                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Hora</label>
                                <input
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">Número de Comensales (Personas)</label>
                            <input
                                type="number"
                                min="1"
                                required
                                value={formData.people}
                                onChange={(e) => setFormData({ ...formData, people: Number(e.target.value) })}
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#4A3728] font-bold text-sm outline-none focus:border-[#8B4513]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Usuario</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.user}
                                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                                    placeholder="Ej. 69a705e5b039051343b9d97a"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Mesa</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.table}
                                    onChange={(e) => setFormData({ ...formData, table: e.target.value })}
                                    placeholder="Ej. 69a712aab039051343b9d9ed"
                                    className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-[#D2B48C] mb-1.5 block tracking-[0.15em]">ID Restaurante</label>
                            <input
                                type="text"
                                required
                                value={formData.restaurant}
                                onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                                placeholder="Ej. 69a7073eb039051343b9d993"
                                className="w-full px-4 py-3 bg-[#FDF8F3] border border-[#EADDCA]/50 rounded-xl text-[#8B4513] font-mono text-[10px] outline-none"
                            />
                        </div>
                    </div>

                    <div className="p-8 border-t border-[#EADDCA]/30 bg-white shrink-0">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-[#4A3728] text-white hover:bg-[#6F4E37] transition font-bold shadow-lg text-sm uppercase tracking-widest flex items-center justify-center min-h-[50px]"
                        >
                            {loading ? "Cargando..." : (reservation ? "Actualizar Reserva" : "Confirmar Cita")}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-2 mt-2 text-[#D2B48C] hover:text-[#8B4513] transition text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            Cerrar Agenda
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};