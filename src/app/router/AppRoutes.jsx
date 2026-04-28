import { Routes, Route } from "react-router-dom";
import AuthPage from "../../features/auth/pages/AuthPage.jsx";
import DashboardPage from "../layouts/DashboardPage.jsx";

// features
import { Menus } from "../../features/menus/components/Menus.jsx";
import { MenuModal } from "../../features/menus/components/MenuModal.jsx";

import { Orders } from "../../features/orders/components/Orders.jsx";
import { OrderModal } from "../../features/orders/components/OrderModal.jsx";

import { Promotions } from "../../features/promotions/components/Promotions.jsx";
import { PromotionModal } from "../../features/promotions/components/PromotionModal.jsx";

import { Reservations } from "../../features/reservations/components/Reservations.jsx";
import { ReservationModal } from "../../features/reservations/components/ReservationModal.jsx";

import { Restaurants } from "../../features/restaurants/components/Restaurants.jsx";
import { RestaurantModal } from "../../features/restaurants/components/RestaurantModal.jsx";

import { Tables } from "../../features/tables/components/Tables.jsx";
import { TableModal } from "../../features/tables/components/TableModal.jsx";

import { Users } from "../../features/users/components/Users.jsx";
import { UserModal } from "../../features/users/components/UserModal.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Públicas */}
            <Route path="/" element={<AuthPage />} />

            {/* Dashboard */}
            <Route path="/dashboard/*" element={<DashboardPage />}>

                {/* Menus */}
                <Route path="menus" element={<Menus />} />
                <Route path="menus/create" element={<MenuModal />} />

                {/* Orders */}
                <Route path="orders" element={<Orders />} />
                <Route path="orders/create" element={<OrderModal />} />

                {/* Promotions */}
                <Route path="promotions" element={<Promotions />} />
                <Route path="promotions/create" element={<PromotionModal />} />

                {/* Reservations */}
                <Route path="reservations" element={<Reservations />} />
                <Route path="reservations/create" element={<ReservationModal />} />

                {/* Restaurants */}
                <Route path="restaurants" element={<Restaurants />} />
                <Route path="restaurants/create" element={<RestaurantModal />} />

                {/* Tables */}
                <Route path="tables" element={<Tables />} />
                <Route path="tables/create" element={<TableModal />} />

                {/* Users */}
                <Route path="users" element={<Users />} />
                <Route path="users/create" element={<UserModal />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
};