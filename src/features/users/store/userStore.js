import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js";

export const useUsersStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.get("/users");

      set({
        users: response.data.data || response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener usuarios",
        loading: false,
      });
    }
  },

  createUser: async (userData) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.post("/users", userData);

      set({
        users: [response.data.data || response.data, ...get().users],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear usuario",
      });
    }
  },

  updateUser: async (id, userData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/users/${id}`, userData);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? (response.data.data || response.data) : user
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar el usuario",
        loading: false,
      });
    }
  },

  activateUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/users/${id}/activate`);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? (response.data.data || response.data) : user
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al activar el usuario",
        loading: false,
      });
    }
  },

  deactivateUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/users/${id}/deactivate`);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? (response.data.data || response.data) : user
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al desactivar el usuario",
        loading: false,
      });
    }
  },
}));