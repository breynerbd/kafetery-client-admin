import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-[#FDF8F3] flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-[#FDF8F3] to-[#F5E6D3]">
          <div className="max-w-[1400px] mx-auto bg-white rounded-[2.5rem] shadow-xl border border-[#EADDCA]/50 p-8 min-h-full">

            {/* HEADER */}
            <div className="mb-10">
              <h2 className="text-4xl font-black text-[#4A3728] uppercase">
                Panel Administrativo
              </h2>
              <div className="h-1.5 w-20 bg-[#8B4513] mt-2 rounded-full"></div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};