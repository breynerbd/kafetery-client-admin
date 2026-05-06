import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/Api.js"; 

export const useRestaurantStore = create((set, get) => ({
  restaurants: [],
  loading: false,
  error: null,

  getRestaurants: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.get("/restaurants");

      set({
        restaurants: response.data.data || response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener restaurantes",
        loading: false,
      });
    }
  },

  createRestaurant: async (restaurantData) => {
    try {
      set({ loading: true, error: null });

      const response = await axiosAdmin.post("/restaurants", restaurantData);

      set({
        restaurants: [response.data.data || response.data, ...get().restaurants],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Error al crear restaurante",
      });
    }
  },

  updateRestaurant: async (id, restaurantData) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/restaurants/${id}`, restaurantData);
      
      set((state) => ({
        restaurants: state.restaurants.map((restaurant) => 
          restaurant._id === id ? (response.data.data || response.data) : restaurant
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al actualizar el restaurante",
        loading: false,
      });
    }
  },

  activateRestaurant: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/restaurants/${id}/activate`);
      
      set((state) => ({
        restaurants: state.restaurants.map((restaurant) => 
          restaurant._id === id ? (response.data.data || response.data) : restaurant
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al activar el restaurante",
        loading: false,
      });
    }
  },

  deactivateRestaurant: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await axiosAdmin.put(`/restaurants/${id}/deactivate`);
      
      set((state) => ({
        restaurants: state.restaurants.map((restaurant) => 
          restaurant._id === id ? (response.data.data || response.data) : restaurant
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al desactivar el restaurante",
        loading: false,
      });
    }
  },
}));