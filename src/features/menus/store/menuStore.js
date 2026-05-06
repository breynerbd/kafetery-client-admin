import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/Api.js"; 

export const useMenuStore = create((set, get) => ({
  menus: [],
  loading: false,
  error: null,

  getMenus: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.get("/menus");

      set({
        menus: response.data.data || response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener menús",
        loading: false,
      });
    }
  },

  createMenu: async (menuData) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.post("/menus", menuData);

      set({
        menus: [response.data.data || response.data, ...get().menus],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear menú",
      });
    }
  },

  updateMenu: async (id, menuData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/menus/${id}`, menuData);
      
      set((state) => ({
        menus: state.menus.map((m) => 
          m._id === id ? (response.data.data || response.data) : m
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar el menú",
        loading: false,
      });
    }
  },

  deactivateMenu: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/menus/${id}/deactivate`);
      
      set((state) => ({
        menus: state.menus.map((m) => 
          m._id === id ? (response.data.data || response.data) : m
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al desactivar el menú",
        loading: false,
      });
    }
  },
}));