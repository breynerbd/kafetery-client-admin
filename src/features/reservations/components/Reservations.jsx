import { useState, useEffect } from "react";
import { useReservationsStore } from "../store/reservationStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { ReservationModal } from "./ReservationModal.jsx";
import { Calendar, Clock, Edit3, Trash2, Plus, Hash, Users as UsersIcon } from "lucide-react";

export const Reservations = () => {
    const {
        reservations = [],
        getReservations,
        deactivateReservation
    } = useReservationsStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRes, setSelectedRes] = useState(null);

    useEffect(() => {
        getReservations();
    }, [getReservations]);

    const handleCreate = () => {
        setSelectedRes(null);
        setIsModalOpen(true);
    };

    const handleManage = (res) => {
        setSelectedRes(res);
        setIsModalOpen(true);
    };

    const handleDelete = (reservationId, resDate) => {
        const formattedDate = new Date(resDate).toLocaleDateString();
        showConfirmToast({
            title: "¿Desactivar reservación?",
            message: `¿Estás seguro de que deseas cancelar la reserva del día ${formattedDate}?`,
            onConfirm: async () => {
                try {
                    await deactivateReservation(reservationId);
                    showSuccess("Reservación desactivada");
                    await getReservations();
                } catch (err) {
                    showError("Error al desactivar");
                }
            }
        });
    };

    return (
        <div className="p-0 md:p-6 max-w-7xl mx-auto animate-in fade-in duration-500">

           {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
               <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#4A3728] uppercase tracking-tighter italic">Sala de Control</h1>
                    <p className="text-[#D2B48C] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                        <span className="w-8 h-[2px] bg-[#8B4513]"></span> Gestión de Reservaciones
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="group bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#8B4513] transition-all shadow-xl shadow-[#4A3728]/20 flex items-center justify-center gap-3 active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="uppercase tracking-widest text-xs">Nueva Reservación</span>
                </button>
            </div>

            {/* --- CONTENEDOR DE DATOS --- */}
            <div className="bg-white md:rounded-[2.5rem] shadow-2xl border border-[#EADDCA]/50 overflow-hidden">

                {/* VISTA DESKTOP (Tabla) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em]"><div className="flex items-center gap-2"><Hash size={12} /> ID Reserva</div></th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em]">Fecha y Hora</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em]">Comensales</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em]">Referencias</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {reservations.length > 0 ? (
                                reservations.map((res) => (
                                    <tr key={res._id || res.id} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                            <code className="text-[11px] font-mono font-bold text-[#8B4513] bg-[#FDF8F3] px-3 py-1 rounded-lg border border-[#EADDCA]/50">
                                                {res._id || res.id}
                                            </code>
                                        </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#4A3728] text-sm italic">
                                                    {new Date(res.date).toLocaleDateString()}
                                                </span>
                                                <span className="text-[#8B4513] text-[10px] font-black flex items-center gap-1 uppercase">
                                                    <Clock size={10} /> {res.time}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-[#4A3728] text-white px-3 py-1 rounded-full font-black text-[10px]">
                                                {res.people || res.guests} COMENSALES
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1 text-[9px] font-mono text-[#D2B48C]">
                                                <span className="truncate max-w-[120px]">USER: {typeof res.user === "object" ? res.user?._id : res.user}</span>
                                                <span className="truncate max-w-[120px]">TABLE: {typeof res.table === "object" ? res.table?._id : res.table}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleManage(res)} className="p-2.5 text-[#4A3728] bg-white border border-[#EADDCA] rounded-xl hover:bg-[#4A3728] hover:text-white transition-all shadow-sm">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(res._id || res.id, res.date)} className="p-2.5 text-red-600 bg-white border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium uppercase tracking-widest text-xs">
                                        No hay reservaciones activas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* VISTA MÓVIL (Cards) */}
                <div className="md:hidden divide-y divide-[#EADDCA]/30">
                    {reservations.length > 0 ? (
                        reservations.map((res) => (
                            <div key={res._id || res.id} className="p-6 flex flex-col gap-4 active:bg-[#FDF8F3] transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#4A3728] text-white p-3 rounded-2xl shadow-lg shadow-brown-900/20">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-mono font-black text-[#D2B48C] mb-0.5">ID: {res._id || res.id}</p>
                                            <h3 className="font-black text-[#4A3728] text-lg leading-none uppercase italic">
                                                {new Date(res.date).toLocaleDateString()}
                                            </h3>
                                            <span className="text-[#8B4513] font-bold text-xs uppercase tracking-tighter">{res.time}</span>
                                        </div>
                                    </div>
                                    <span className="bg-[#EADDCA] text-[#4A3728] px-3 py-1 rounded-lg text-[10px] font-black">
                                        {res.people || res.guests} 🍽️
                                    </span>
                                </div>

                                <div className="space-y-1.5 bg-[#FDF8F3] p-3 rounded-2xl border border-[#EADDCA]/50">
                                    <p className="text-[9px] font-mono text-[#6F4E37] break-all leading-tight">
                                        <span className="font-black text-[#D2B48C] mr-1 uppercase">User:</span> {typeof res.user === "object" ? res.user?._id : res.user}
                                    </p>
                                    <p className="text-[9px] font-mono text-[#6F4E37] break-all leading-tight">
                                        <span className="font-black text-[#D2B48C] mr-1 uppercase">Table:</span> {typeof res.table === "object" ? res.table?._id : res.table}
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button onClick={() => handleManage(res)} className="flex-1 py-3.5 bg-white border border-[#EADDCA] rounded-2xl text-[#4A3728] font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 active:scale-95 shadow-sm">
                                        <Edit3 size={14} /> Editar
                                    </button>
                                    <button onClick={() => handleDelete(res._id || res.id, res.date)} className="flex-1 py-3.5 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-black text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 active:scale-95 shadow-sm">
                                        <Trash2 size={14} /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center text-[#D2B48C] italic text-xs uppercase tracking-widest">
                            Agenda Vacía
                        </div>
                    )}
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