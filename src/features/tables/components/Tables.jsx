import { useState, useEffect } from "react";
import { useEffect as useToastEffect } from "react";

import { useTableStore } from "../store/tableStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError, showSuccess } from "../../../shared/utils/toast";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { TableModal } from "./TableModal.jsx";

export const Tables = () => {
    const { 
        tables = [], 
        loading, 
        error, 
        getTables, 
        deleteTable 
    } = useTableStore();

    const { openConfirm } = useUIStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    const restaurantId = "69a7073eb039051343b9d993";

    useEffect(() => {
        getTables(restaurantId);
    }, [getTables]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedTable(null);
        setIsModalOpen(true);
    };

    const handleManage = (table) => {
        setSelectedTable(table);
        setIsModalOpen(true);
    };

    const handleDelete = (tableId, tableNumber) => {
        showConfirmToast({
            title: "¿Eliminar mesa?",
            message: `¿Estás seguro de que deseas eliminar la mesa número "${tableNumber}"?`,
            onConfirm: async () => {
                try {
                    await deleteTable(tableId);
                    showSuccess("Mesa eliminada exitosamente");
                } catch (err) {
                    showError("Error al eliminar la mesa");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Control de Mesas
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Asignación de espacios y capacidad por restaurante
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Nueva Mesa
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">No. Mesa</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Capacidad</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] hidden md:table-cell">Restaurante ID</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {tables.length > 0 ? (
                                tables.map((table, index) => (
                                    <tr key={table._id || table.id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5 text-xs font-mono text-[#4A3728]">
                                            {table._id || table.id}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#4A3728] flex items-center justify-center text-white font-black text-xs">
                                                    {table.tableNumber}
                                                </div>
                                                <span className="font-bold text-[#4A3728]">Mesa Principal</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-[#6F4E37] font-medium">
                                            {table.capacity} Personas
                                        </td>
                                        <td className="px-8 py-5 hidden md:table-cell">
                                            <code className="text-[10px] text-[#8B4513] bg-[#FDF8F3] px-2 py-1 rounded border border-[#EADDCA]">
                                                {table.restaurant}
                                            </code>
                                        </td>
                                        <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleManage(table)}
                                                className="bg-[#EADDCA] text-[#4A3728] px-2 py-1 rounded-md text-xs font-extrabold hover:bg-[#D2B48C] transition-all uppercase tracking-wider"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(table._id || table.id, table.tableNumber)}
                                                className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-extrabold hover:bg-red-200 transition-all uppercase tracking-wider"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        {loading ? "Cargando mesas..." : "No hay mesas configuradas aún."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                table={selectedTable}
            />
        </div>
    );
};