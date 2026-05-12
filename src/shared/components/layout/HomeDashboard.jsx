import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import { useMenuStore } from "../../../features/menus/store/menuStore.js";
import { useOrdersStore } from "../../../features/orders/store/orderStore.js";
import { usePromotionsStore } from "../../../features/promotions/store/promotionStore.js";
import { useReservationsStore } from "../../../features/reservations/store/reservationStore.js";
import { useRestaurantStore } from "../../../features/restaurants/store/restaurantStore.js";
import { useTableStore } from "../../../features/tables/store/tableStore.js";
import { useUsersStore } from "../../../features/users/store/userStore.js";

import {
    Users,
    Store,
    BookOpen,
    LayoutGrid,
    CalendarCheck,
    ShoppingBag,
    TicketPercent,
    Clock,
    LayoutDashboard,
    ArrowRight
} from "lucide-react";

export const HomeDashboard = () => {
    const { user } = useAuthStore();

    const { menus, getMenus } = useMenuStore();
    const { orders, getOrders } = useOrdersStore();
    const { promotions, getPromotions } = usePromotionsStore();
    const { reservations, getReservations } = useReservationsStore();
    const { restaurants, getRestaurants } = useRestaurantStore();
    const { tables, getTables } = useTableStore();
    const { users, getUsers } = useUsersStore();

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                getMenus(),
                getOrders(),
                getPromotions(),
                getReservations(),
                getRestaurants(),
                getTables(),
                getUsers()
            ]);
        };
        fetchData();
    }, []);

    const summaryCards = [
        { label: "Usuarios", value: users?.length || 0, icon: <Users size={24} />, color: "bg-blue-50 text-blue-600", borderColor: "border-blue-100", path: "/dashboard/users" },
        { label: "Restaurantes", value: restaurants?.length || 0, icon: <Store size={24} />, color: "bg-amber-50 text-amber-600", borderColor: "border-amber-100", path: "/dashboard/restaurants" },
        { label: "Menús", value: menus?.length || 0, icon: <BookOpen size={24} />, color: "bg-orange-50 text-orange-600", borderColor: "border-orange-100", path: "/dashboard/menus" },
        { label: "Mesas", value: tables?.length || 0, icon: <LayoutGrid size={24} />, color: "bg-emerald-50 text-emerald-600", borderColor: "border-emerald-100", path: "/dashboard/tables" },
        { label: "Reservas", value: reservations?.length || 0, icon: <CalendarCheck size={24} />, color: "bg-purple-50 text-purple-600", borderColor: "border-purple-100", path: "/dashboard/reservations" },
        { label: "Órdenes", value: orders?.length || 0, icon: <ShoppingBag size={24} />, color: "bg-rose-50 text-rose-600", borderColor: "border-rose-100", path: "/dashboard/orders" },
        { label: "Promociones", value: promotions?.length || 0, icon: <TicketPercent size={24} />, color: "bg-cyan-50 text-cyan-600", borderColor: "border-cyan-100", path: "/dashboard/promotions" },
    ];

    return (
        /* Se añadió pb-24 y overflow-y-auto para garantizar el scroll completo */
        <div className="p-4 sm:p-6 md:p-10 pb-24 md:pb-32 space-y-6 md:space-y-10 animate-fadeIn bg-[#FBFAF9] min-h-screen overflow-y-auto">

            {/* Header Responsivo */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#EADDCA]/30 pb-6 md:pb-8">
                <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-[#D2B48C] mb-2">
                        <LayoutDashboard size={18} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Kafetery Analytics</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A3728] uppercase tracking-tighter leading-none">
                        Resumen General
                    </h1>
                    <p className="text-[#8B4513] font-bold text-xs sm:text-sm mt-3 flex items-center justify-center lg:justify-start gap-2">
                        <Clock size={16} className="opacity-50" />
                        Admin: <span className="text-[#D2B48C]">{user?.username || 'Sesión Activa'}</span>
                    </p>
                </div>

                <div className="bg-white px-6 py-3 rounded-2xl border border-[#EADDCA]/50 shadow-sm self-center lg:self-end">
                    <span className="text-[10px] sm:text-[11px] font-black text-[#4A3728] uppercase tracking-widest">
                        {new Date().toLocaleDateString('es-GT', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Grid de Tarjetas Adaptable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {summaryCards.map((card, index) => (
                    <div
                        key={index}
                        className={`
                            bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border ${card.borderColor}
                            shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                            flex flex-col items-center text-center group relative overflow-hidden
                        `}
                    >
                        <Link
                            to={card.path}
                            className="absolute top-0 right-0 bg-[#4A3728] text-[#EADDCA] px-4 py-2 rounded-bl-2xl 
                                       md:translate-x-full md:group-hover:translate-x-0 transition-transform duration-300 
                                       flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter shadow-md z-10"
                        >
                            Ir a <ArrowRight size={12} />
                        </Link>

                        <div className={`
                            w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4 md:mb-6 flex items-center justify-center
                            transition-transform group-hover:scale-110 duration-300
                            ${card.color}
                        `}>
                            {card.icon}
                        </div>

                        <span className="text-3xl md:text-4xl font-black text-[#4A3728] mb-1">
                            {card.value}
                        </span>

                        <p className="text-[10px] md:text-[11px] font-black text-[#8B4513] uppercase tracking-[0.2em]">
                            {card.label}
                        </p>

                        <div className="mt-4 md:mt-6 w-12 h-1 bg-[#FDF8F3] rounded-full md:group-hover:w-20 transition-all duration-500" />
                    </div>
                ))}
            </div>

            {/* Estado del Sistema */}
            <div className="pt-4">
                <div className="bg-[#FDF8F3] p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-[#EADDCA] space-y-5">
                    <h3 className="font-black text-[#4A3728] uppercase text-[10px] md:text-xs tracking-widest text-center md:text-left px-2">
                        Estado del Sistema
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="bg-white p-4 rounded-xl md:rounded-2xl flex items-center justify-between border border-[#EADDCA]/40">
                            <span className="text-[9px] md:text-[10px] font-bold text-[#8B4513] uppercase">API Backend</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-green-600 hidden sm:block uppercase">Online</span>
                                <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl md:rounded-2xl flex items-center justify-between border border-[#EADDCA]/40">
                            <span className="text-[9px] md:text-[10px] font-bold text-[#8B4513] uppercase">Base de Datos</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-green-600 hidden sm:block uppercase">Connected</span>
                                <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};