import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api.js"; // Ajusta la ruta a tu archivo de instancias de Axios

export const useUsersStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    try {
      set({ loading: true, error: null });

      // Se utiliza la instancia axiosAdmin configurada en el puerto centralizado
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
  
  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      
      // Llamamos a la API
      await axiosAdmin.delete(`/users/${id}`);

      // Actualizamos el estado para eliminar el usuario de la lista local
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar el usuario",
        loading: false,
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
}));