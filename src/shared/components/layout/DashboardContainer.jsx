import { useState } from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

// Importación de las vistas desde sus respectivas carpetas de features
import { Users } from "../../../features/users/components/Users.jsx";
import { Restaurants } from "../../../features/restaurants/components/Restaurants.jsx";
import { Menus } from "../../../features/menus/components/Menus.jsx";
import { Tables } from "../../../features/tables/components/Tables.jsx";
import { Reservations } from "../../../features/reservations/components/Reservations.jsx";
import { Orders } from "../../../features/orders/components/Orders.jsx";
import { Promotions } from "../../../features/promotions/components/Promotions.jsx";

export const DashboardContainer = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "users": return <Users />;
      case "restaurants": return <Restaurants />;
      case "menus": return <Menus />;
      case "tables": return <Tables />;
      case "reservations": return <Reservations />;
      case "orders": return <Orders />;
      case "promotions": return <Promotions />;
      default:
        return (
          <div className="py-10">
            <h3 className="text-2xl font-black text-[#4A3728]">Bienvenido al Sistema</h3>
            <p className="text-[#6F4E37] mt-2 text-sm">Selecciona una categoría en el menú lateral para gestionar Kafetery.</p>

          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-[#FDF8F3] to-[#F5E6D3]">
          <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-brown-900/5 border border-[#EADDCA]/50 p-8 min-h-full">
            <div className="mb-10 flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-[#4A3728] tracking-tighter uppercase">
                  {activeTab === 'dashboard' ? 'Panel Administrativo' : `Gestión de ${activeTab}`}
                </h2>
                <div className="h-1.5 w-20 bg-[#8B4513] mt-2 rounded-full"></div>
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};