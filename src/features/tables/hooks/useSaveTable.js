import { useTableStore } from "../store/tableStore.js";

export const useSaveTable = () => {
    const createTable = useTableStore((state) => state.createTable);
    const updateTable = useTableStore((state) => state.updateTable);

    const saveTable = async (data, tableId = null) => {
        const payload = {
            tableNumber: Number(data.tableNumber),
            capacity: Number(data.capacity),
            restaurant: data.restaurant,
        };

        try {
            if (tableId) {
                await updateTable(tableId, payload);
            } else {
                await createTable(payload);
            }
        } catch (error) {
            console.error("Error en useSaveTable:", error);
            throw error;
        }
    };

    return { saveTable };
};