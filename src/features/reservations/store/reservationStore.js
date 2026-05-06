import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useReservationsStore = create((set, get) => ({
  reservations: [],
  loading: false,
  error: null,

  getReservations: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.get("/reservations");

      set({
        reservations: response.data.data || response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener reservaciones",
        loading: false,
      });
    }
  },

  createReservation: async (reservationData) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.post("/reservations", reservationData);

      set({
        reservations: [response.data.data || response.data, ...get().reservations],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear la reservación",
      });
    }
  },

  updateReservation: async (id, reservationData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/reservations/${id}`, reservationData);

      set((state) => ({
        reservations: state.reservations.map((res) =>
          (res._id || res.id) === id ? (response.data.data || response.data) : res
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar la reservación",
        loading: false,
      });
    }
  },

  deactivateReservation: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/reservations/${id}/deactivate`);

      set((state) => ({
        reservations: state.reservations.map((res) =>
          (res._id || res.id) === id ? (response.data.data || response.data) : res
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al desactivar la reservación",
        loading: false,
      });
    }
  },
}));