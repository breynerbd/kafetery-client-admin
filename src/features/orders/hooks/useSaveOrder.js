import { useOrdersStore } from "../store/orderStore.js";

export const useSaveOrder = () => {
    const createOrder = useOrdersStore((state) => state.createOrder);
    const updateOrder = useOrdersStore((state) => state.updateOrder);

    const saveOrder = async (data, orderId = null) => {
        const payload = {
            user: data.user,
            restaurant: data.restaurant,
            table: data.table,
            status: data.status,
            items: data.items.map(item => ({
                menu: item.menu,
                quantity: Number(item.quantity)
            })),
        };

        try {
            if (orderId) {
                console.log("Actualizando orden con ID:", orderId, "Payload:", payload);
                await updateOrder(orderId, payload);
            } else {
                console.log("Creando nueva orden:", payload);
                await createOrder(payload);
            }
        } catch (error) {
            console.error("Error en useSaveOrder:", error);
            throw error;
        }
    };

    return { saveOrder };
};