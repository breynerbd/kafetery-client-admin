import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useTableStore = create((set, get) => ({
    tables: [],
    loading: false,
    error: null,

    getTables: async (restaurantId) => {
        try {
            set({ loading: true, error: null });

            const response = await axiosAdmin.get(`/tables`);

            set({
                tables: response.data.data || response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener las mesas",
                loading: false,
            });
        }
    },

    createTable: async (tableData) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosAdmin.post("/tables", tableData);
            const newTable = response.data.data || response.data;

            const existingTableWithRestaurant = get().tables.find(t => t.restaurant?._id === newTable.restaurant);

            const finalTable = {
                ...newTable,
                restaurant: existingTableWithRestaurant ? existingTableWithRestaurant.restaurant : newTable.restaurant
            };

            set((state) => ({
                tables: [finalTable, ...state.tables],
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear" });
            throw error;
        }
    },

    updateTable: async (id, tableData) => {
        try {
            set({ loading: true, error: null });

            const response = await axiosAdmin.put(`/tables/${id}`, tableData);

            set((state) => ({
                tables: state.tables.map((table) =>
                    (table._id || table.id) === id ? (response.data.data || response.data) : table
                ),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al actualizar la mesa",
                loading: false,
            });
            throw error;
        }
    },

    deleteTable: async (id) => {
        try {
            set({ loading: true, error: null });
            await axiosAdmin.put(`/tables/${id}/deactivate`);

            set((state) => ({
                tables: state.tables.filter((table) => (table._id || table.id) !== id),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al eliminar la mesa",
                loading: false,
            });
            throw error;
        }
    },
}));