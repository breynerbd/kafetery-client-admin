import { axiosAdmin } from "./api";

// ================= Users =================

export const getAllUsers = () => axiosAdmin.get("/users");
export const getUserById = (id) => axiosAdmin.get(`/users/${id}`);
export const createUser = (data) => axiosAdmin.post("/users", data);
export const updateUser = (id, data) => axiosAdmin.put(`/users/${id}`, data);
export const deleteUser = (id) => axiosAdmin.delete(`/users/${id}`);

// ================= Restaurants =================
export const getAllRestaurants = () => axiosAdmin.get("/restaurants");
export const getRestaurantById = (id) => axiosAdmin.get(`/restaurants/${id}`);
export const createRestaurant = (data) => axiosAdmin.post("/restaurants", data);
export const updateRestaurant = (id, data) => axiosAdmin.put(`/restaurants/${id}`, data);
export const deleteRestaurant = (id) => axiosAdmin.delete(`/restaurants/${id}`);

// ================= Menus =================
export const getAllMenus = () => axiosAdmin.get("/menus");
export const getMenuById = (id) => axiosAdmin.get(`/menus/${id}`);
export const createMenu = (data) => axiosAdmin.post("/menus", data);
export const updateMenu = (id, data) => axiosAdmin.put(`/menus/${id}`, data);
export const deleteMenu = (id) => axiosAdmin.delete(`/menus/${id}`);

// ================= Tables =================
export const getAllTables = () => axiosAdmin.get("/tables");
export const getTableById = (id) => axiosAdmin.get(`/tables/${id}`);
export const createTable = (data) => axiosAdmin.post("/tables", data);
export const updateTable = (id, data) => axiosAdmin.put(`/tables/${id}`, data);
export const deleteTable = (id) => axiosAdmin.delete(`/tables/${id}`);

// ================= Reservations =================
export const getAllReservations = () => axiosAdmin.get("/reservations");
export const getReservationById = (id) => axiosAdmin.get(`/reservations/${id}`);
export const createReservation = (data) => axiosAdmin.post("/reservations", data);
export const updateReservation = (id, data) => axiosAdmin.put(`/reservations/${id}`, data);
export const deleteReservation = (id) => axiosAdmin.delete(`/reservations/${id}`);

// ================= Orders =================
export const getAllOrders = () => axiosAdmin.get("/orders");
export const getOrderById = (id) => axiosAdmin.get(`/orders/${id}`);
export const createOrder = (data) => axiosAdmin.post("/orders", data);
export const updateOrder = (id, data) => axiosAdmin.put(`/orders/${id}`, data);
export const deleteOrder = (id) => axiosAdmin.delete(`/orders/${id}`);

// ================= Promotions =================
export const getAllPromotions = () => axiosAdmin.get("/promotions");
export const getPromotionById = (id) => axiosAdmin.get(`/promotions/${id}`);
export const createPromotion = (data) => axiosAdmin.post("/promotions", data);
export const updatePromotion = (id, data) => axiosAdmin.put(`/promotions/${id}`, data);
export const deletePromotion = (id) => axiosAdmin.delete(`/promotions/${id}`);

