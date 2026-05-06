import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const usePromotionsStore = create((set, get) => ({
  promotions: [],
  loading: false,
  error: null,

  getPromotions: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.get("/promotions");

      set({
        promotions: response.data.data || response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener promociones",
        loading: false,
      });
    }
  },

  createPromotion: async (promotionData) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.post("/promotions", promotionData);

      set({
        promotions: [response.data.data || response.data, ...get().promotions],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear promoción",
      });
    }
  },

  updatePromotion: async (id, promotionData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/promotions/${id}`, promotionData);

      set((state) => ({
        promotions: state.promotions.map((promo) =>
          (promo._id || promo.id) === id ? (response.data.data || response.data) : promo
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar la promoción",
        loading: false,
      });
    }
  },

  activatePromotion: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/promotions/${id}/activate`, {});

      set((state) => ({
        promotions: state.promotions.map((promo) =>
          (promo._id || promo.id) === id ? (response.data.data || response.data) : promo
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al activar la promoción",
        loading: false,
      });
    }
  },

  deactivatePromotion: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/promotions/${id}/deactivate`, {});

      set((state) => ({
        promotions: state.promotions.map((promo) =>
          (promo._id || promo.id) === id ? (response.data.data || response.data) : promo
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al desactivar la promoción",
        loading: false,
      });
    }
  },
}));