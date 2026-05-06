import { useOrdersStore } from "../store/orderStore.js";

export const useSaveOrder = () => {
    const createOrder = useOrdersStore((state) => state.createOrder);
    const updateOrder = useOrdersStore((state) => state.updateOrder);

    const saveOrder = async (data, orderId = null) => {
        const payload = {
            user: data.user,
            restaurant: data.restaurant,
            table: data.table,
            items: data.items.map(item => ({
                menu: item.menu,
                quantity: Number(item.quantity)
            })),
            totalPrice: Number(data.totalPrice)
        };

        try {
            if (orderId) {
                await updateOrder(orderId, payload);
            } else {
                await createOrder(payload);
            }
        } catch (error) {
            console.error("Error en useSaveOrder:", error);
            throw error;
        }
    };

    return { saveOrder };
};