export const Sidebar = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: "users", label: "Usuarios", icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
    { id: "restaurants", label: "Restaurantes", icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
    { id: "menus", label: "Menús", icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
    { id: "tables", label: "Mesas", icon: <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v3m-16 0h16M4 7l2 11h12l2-11" /> },
    { id: "reservations", label: "Reservas", icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    { id: "orders", label: "Órdenes", icon: <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /> },
    { id: "promotions", label: "Promociones", icon: <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /> },
  ];

  return (
    <aside className="w-72 bg-white min-h-[calc(100vh-5rem)] p-6 border-r border-[#EADDCA]/50 shadow-[4px_0_24px_rgba(74,55,40,0.02)]">
      <nav>
        <p className="text-[10px] font-black text-[#D2B48C] uppercase tracking-[0.2em] mb-6 px-4">Menú Principal</p>
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="group">
                <div
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 cursor-pointer border ${isActive
                      ? "bg-[#FDF8F3] text-[#4A3728] border-[#EADDCA]/50 shadow-sm"
                      : "text-[#6F4E37] border-transparent hover:bg-gray-50"
                    }`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${isActive ? "bg-white border-[#EADDCA]/30" : "bg-gray-50 group-hover:bg-white"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-[#8B4513]">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-sm tracking-tight">{item.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-10 pt-6 border-t border-[#EADDCA]/30">
        <div className="bg-[#4A3728] rounded-2xl p-5 text-center shadow-lg shadow-brown-900/20">
          <p className="text-[10px] font-bold text-[#EADDCA] uppercase tracking-widest mb-1">Kafetery Pro</p>
          <p className="text-[9px] text-white/60 leading-relaxed">Soporte técnico activo las 24h</p>
        </div>
      </div>
    </aside>
  );
};