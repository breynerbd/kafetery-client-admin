import { useState, useEffect } from "react";
import { useReservationsStore } from "../store/reservationStore.js";
import { useUIStore } from "../../auth/store/uiStore";

import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { ReservationModal } from "./ReservationModal.jsx";

export const Reservations = () => {
    const { 
        reservations = [], 
        loading, 
        error, 
        getReservations, 
        deactivateReservation 
    } = useReservationsStore();
    
    const { openConfirm } = useUIStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRes, setSelectedRes] = useState(null);

    useEffect(() => {
        getReservations();
    }, [getReservations]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedRes(null);
        setIsModalOpen(true);
    };

    const handleManage = (res) => {
        setSelectedRes(res);
        setIsModalOpen(true);
    };

    const handleDelete = (reservationId, resDate) => {
        showConfirmToast({
            title: "¿Desactivar reservación?",
            message: `¿Estás seguro de que deseas cancelar la reservación de la fecha ${resDate}?`,
            onConfirm: async () => {
                try {
                    await deactivateReservation(reservationId);
                    showSuccess("Reservación desactivada exitosamente");
                    await getReservations();
                } catch (err) {
                    showError("Error al desactivar la reservación");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Libro de Reservas
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Control de asistencia y agenda de comensales
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Agendar Cita
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Fecha y Hora</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Personas</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] hidden md:table-cell">IDs de Referencia</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {reservations.length > 0 ? (
                                reservations.map((res, index) => (
                                    <tr key={res._id || res.id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#4A3728]">
                                                    {new Date(res.date).toLocaleDateString()}
                                                </span>
                                                <span className="text-xs text-[#8B4513] font-black">
                                                    {res.time || new Date(res.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-[#EADDCA]/40 text-[#4A3728] px-4 py-1 rounded-full font-black text-xs">
                                                {res.people || res.guests} GUESTS
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 hidden md:table-cell">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-mono text-[#D2B48C]">
                                                    User: {typeof res.user === "object" ? res.user?.name || res.user?._id : res.user}
                                                </span>
                                                <span className="text-[9px] font-mono text-[#D2B48C]">
                                                    Table: {typeof res.table === "object" ? res.table?.name || res.table?._id : res.table}
                                                </span>
                                                <span className="text-[9px] font-mono text-[#D2B48C]">
                                                    Rest: {typeof res.restaurant === "object" ? res.restaurant?.name || res.restaurant?._id : res.restaurant}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleManage(res)}
                                                className="text-[#8B4513] font-bold text-xs hover:text-[#4A3728] transition uppercase tracking-widest"
                                            >
                                                Modificar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(res._id || res.id, res.date)}
                                                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-extrabold hover:bg-red-200 transition-all ml-1"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        No hay reservaciones pendientes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ReservationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reservation={selectedRes}
            />
        </div>
    );
};