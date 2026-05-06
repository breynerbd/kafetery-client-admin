import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useOrdersStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  getOrders: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.get("/orders");

      set({
        orders: response.data.data || response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener órdenes",
        loading: false,
      });
    }
  },

  createOrder: async (orderData) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.post("/orders", orderData);

      set({
        orders: [response.data.data || response.data, ...get().orders],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear la orden",
      });
    }
  },

  updateOrder: async (id, orderData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/orders/${id}`, orderData);

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? (response.data.data || response.data) : order
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar la orden",
        loading: false,
      });
    }
  },

  deactivateOrder: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/orders/${id}/deactivate`);

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === id ? (response.data.data || response.data) : order
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al desactivar la orden",
        loading: false,
      });
    }
  },
}));