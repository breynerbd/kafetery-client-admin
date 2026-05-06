import { useState, useEffect } from "react";
import { useOrdersStore } from "../store/orderStore.js";
import { showError, showSuccess } from "../../../shared/utils/toast.js";
import { showConfirmToast } from "../../auth/components/ConfirmModal";
import { OrderModal } from "./OrderModal.jsx";

export const Orders = () => {
    const { 
        orders = [], 
        loading, 
        error, 
        getOrders, 
        deactivateOrder 
    } = useOrdersStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    const handleCreate = () => {
        setSelectedOrder(null);
        setIsModalOpen(true);
    };

    const handleManage = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleDelete = (orderId) => {
        showConfirmToast({
            title: "¿Desactivar orden?",
            message: "¿Estás seguro de que deseas desactivar esta orden?",
            onConfirm: async () => {
                try {
                    await deactivateOrder(orderId);
                    showSuccess("Orden desactivada exitosamente");
                    await getOrders();
                } catch (err) {
                    showError("Error al desactivar la orden");
                }
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
                        Historial de Órdenes
                    </h1>
                    <div className="h-1.5 w-16 bg-[#8B4513] mt-2 rounded-full"></div>
                    <p className="text-[#6F4E37] mt-3 font-medium text-sm">
                        Registro de ventas y comandas en tiempo real
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-[#8B4513] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#6F4E37] transition duration-300 shadow-md text-sm flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Nueva Orden
                </button>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FDF8F3] border-b border-[#EADDCA]/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Usuario (ID)</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Mesa (ID)</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Items</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em]">Total</th>
                                <th className="px-8 py-5 text-xs font-black uppercase text-[#D2B48C] tracking-[0.15em] text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADDCA]/30">
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={order._id || index} className="hover:bg-[#FDF8F3]/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <code className="text-[10px] text-[#8B4513] font-mono font-bold uppercase">
                                                {order.user 
                                                    ? (typeof order.user === 'string' 
                                                        ? order.user 
                                                        : order.user._id || ''
                                                      ).slice(-6)
                                                    : 'N/A'
                                                }...
                                            </code>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-[#4A3728]">
                                            {order.table || 'N/A'}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="bg-[#EADDCA]/40 text-[#4A3728] px-3 py-1 rounded-lg font-black text-[10px]">
                                                {order.items?.length || 0} PRODUCTO(S)
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-[#4A3728]">
                                            Q{order.totalPrice?.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-5 text-right flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleManage(order)}
                                                className="text-[#8B4513] font-bold text-xs hover:text-[#4A3728] transition uppercase tracking-widest"
                                            >
                                                Ver Detalle
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order._id || order.id)}
                                                className="text-red-600 font-bold text-xs hover:text-red-800 transition uppercase tracking-widest"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-[#D2B48C] italic font-medium">
                                        No hay órdenes registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </div>
    );
};