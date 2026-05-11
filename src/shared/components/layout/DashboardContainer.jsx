import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const DashboardContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Cerrar el sidebar automáticamente cuando cambie la ruta (útil para móviles)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Bloquear el scroll del body cuando el sidebar está abierto en móvil
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[#FDF8F3] flex flex-col font-sans overflow-x-hidden">

      {/* NAVBAR: Pasamos la función para abrir el Sidebar */}
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">

        {/* SIDEBAR: Pasamos el estado y la función de cierre */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* OVERLAY: Capa oscura que aparece solo en móvil al abrir el sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-[#4A3728]/40 backdrop-blur-sm z-[65] lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-[#FDF8F3] to-[#F5E6D3] transition-all duration-300">

          <div className="max-w-[1400px] mx-auto bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl border border-[#EADDCA]/50 p-5 md:p-8 lg:p-10 min-h-full">

            {/* HEADER DEL PANEL: Adaptable en tamaño */}
            <div className="mb-6 md:mb-10">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#4A3728] uppercase tracking-tight leading-none">
                  Panel Administrativo
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 w-16 md:w-20 bg-[#8B4513] rounded-full"></div>
                  <div className="h-1.5 w-4 bg-[#D2B48C] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* ZONA DE VISTAS (OUTLET): Aquí cargan los componentes hijos */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </div>

          </div>

          {/* FOOTER OPCIONAL (Dentro del main) */}
          <footer className="mt-8 pb-4 text-center">
            <p className="text-[11px] font-bold text-[#8B4513]/50 uppercase tracking-[0.3em]">
              Kafetery Management System © 2026
            </p>
          </footer>
        </main>

      </div>
    </div>
  );
};