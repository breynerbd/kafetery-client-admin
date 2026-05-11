import { useState, useEffect } from "react";
import { useTableStore } from "../store/tableStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { TableModal } from "./TableModal.jsx";
import { Plus, Edit, Trash2, Users as UsersIcon, MapPin, Search, Pencil } from "lucide-react";

export const Tables = () => {
    const { tables = [], loading, error, getTables, deleteTable } = useTableStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    const restaurantId = "69a7073eb039051343b9d993";

    useEffect(() => { getTables(restaurantId); }, [getTables]);

    useEffect(() => { if (error) showError(error); }, [error]);

    const handleCreate = () => { setSelectedTable(null); setIsModalOpen(true); };
    const handleManage = (table) => { setSelectedTable(table); setIsModalOpen(true); };

    const handleDelete = (tableId, tableNumber) => {
        showConfirmToast({
            title: "¿Eliminar mesa?",
            message: `Esta acción no se puede deshacer. La mesa ${tableNumber} será eliminada permanentemente.`,
            onConfirm: async () => {
                try {
                    await deleteTable(tableId);
                    showSuccess("Mesa eliminada con éxito");
                } catch (err) { showError("Error al intentar eliminar"); }
            }
        });
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
           {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
               <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#4A3728] uppercase tracking-tighter italic">Sala de Control</h1>
                    <p className="text-[#D2B48C] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2">
                        <span className="w-8 h-[2px] bg-[#8B4513]"></span> Gestión de Mesas
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="group bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#8B4513] transition-all shadow-xl shadow-[#4A3728]/20 flex items-center justify-center gap-3 active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="uppercase tracking-widest text-xs">Nueva Mesa</span>
                </button>
            </div>

            {/* Contenedor de Datos */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-[#4A3728]/10 border border-[#EADDCA]/50 overflow-hidden">
                
                {/* VISTA DESKTOP: TABLE */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FDF8F3] text-[10px] font-black uppercase text-[#D2B48C] tracking-[0.15em] border-b border-[#EADDCA]/50">
                                <th className="px-10 py-6">Mesa / Ref</th>
                                <th className="px-10 py-6">Capacidad</th>
                                <th className="px-10 py-6">Restaurante ID</th>
                                <th className="px-10 py-6 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {tables.map((table) => (
                                <tr key={table._id} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#4A3728] group-hover:bg-[#8B4513] transition-colors flex items-center justify-center text-white font-black text-lg shadow-lg">
                                                {table.tableNumber}
                                            </div>
                                            <div>
                                                <div className="font-black text-[#4A3728] uppercase text-sm">Mesa Principal</div>
                                                <code className="text-[11px] font-mono font-bold text-[#8B4513] bg-[#FDF8F3] px-3 py-1 rounded-lg border border-[#EADDCA]/50">
                                                {table._id || table.id}
                                            </code>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EADDCA]/20 rounded-full text-[#8B4513] font-bold text-xs">
                                            <UsersIcon size={14} /> {table.capacity} Máx.
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-[10px] font-mono text-[#D2B48C]">{table.restaurant}</td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => handleManage(table)} className="p-3 text-[#4A3728] hover:bg-[#4A3728] hover:text-white rounded-xl transition-all"><Edit size={18}/></button>
                                            <button onClick={() => handleDelete(table._id, table.tableNumber)} className="p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* VISTA MÓVIL: CARDS (Anti-desbordamiento) */}
                <div className="md:hidden p-4 space-y-4 bg-[#FDF8F3]/20">
                    {tables.length > 0 ? tables.map((table) => (
                        <div key={table._id} className="bg-white border border-[#EADDCA]/60 rounded-3xl p-5 shadow-sm flex items-center gap-4 overflow-hidden relative">
                            {/* Número de mesa */}
                            <div className="w-16 h-16 rounded-2xl bg-[#4A3728] flex flex-col items-center justify-center text-white shrink-0 shadow-lg">
                                <span className="text-[9px] font-black opacity-50 uppercase leading-none mb-1">Mesa</span>
                                <span className="text-2xl font-black leading-none">{table.tableNumber}</span>
                            </div>
                            
                            {/* Info con min-w-0 para permitir que el texto se rompa */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 text-[#4A3728] font-black text-sm mb-1 uppercase tracking-tight">
                                    <UsersIcon size={14} className="text-[#8B4513]" /> {table.capacity} Personas
                                </div>
                                
                                {/* ID Restaurante con break-all */}
                                <div className="flex items-start gap-1.5 text-[9px] font-mono text-[#D2B48C] break-all leading-tight">
                                    <MapPin size={10} className="shrink-0 mt-0.5" />
                                    <span>{table._id}</span>
                                </div>
                                
                                {/* Botones de acción móvil */}
                                <div className="flex gap-4 mt-3 pt-3 border-t border-[#EADDCA]/30">
                                    <button onClick={() => handleManage(table)} className="p-2.5 bg-[#FDF8F3] text-[#4A3728] rounded-xl hover:bg-[#4A3728] hover:text-white transition-all">
                                                <Pencil size={18}/>
                                            </button>
                                            <button onClick={() => handleDelete(table._id || table.id)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                                                <Trash2 size={18}/>
                                            </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="py-20 text-center">
                            <Search size={40} className="mx-auto text-[#EADDCA] mb-4 opacity-50" />
                            <p className="text-[#D2B48C] font-bold text-sm uppercase tracking-widest italic">No se encontraron mesas</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <TableModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                table={selectedTable} 
            />
        </div>
    );
};