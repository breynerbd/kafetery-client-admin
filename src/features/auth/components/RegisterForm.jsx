const RegisterForm = ({ onSwitchToLogin }) => {
    return (
        <form className="space-y-4">
            {/* Nombre y Apellido en una fila */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#4A3728] mb-1.5">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ej. Juan"
                        className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-[#4A3728] mb-1.5">
                        Apellido
                    </label>
                    <input
                        id="lastname"
                        type="text"
                        placeholder="Ej. Pérez"
                        className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                    />
                </div>
            </div>

            {/* Correo Electrónico */}
            <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-[#4A3728] mb-1.5">
                    Correo Electrónico
                </label>
                <input
                    id="reg-email"
                    type="email"
                    placeholder="usuario@kinal.edu.gt"
                    className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                />
            </div>

            {/* Contraseña */}
            <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-[#4A3728] mb-1.5">
                    Contraseña
                </label>
                <input
                    id="reg-password"
                    type="password"
                    className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                />
            </div>

            {/* Confirmar Contraseña */}
            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-[#4A3728] mb-1.5">
                    Confirmar Contraseña
                </label>
                <input
                    id="confirm-password"
                    type="password"
                    className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                />
            </div>

            {/* Botón Registrarse */}
            <button
                type="submit"
                className="w-full bg-[#6F4E37] hover:bg-[#5D4037] text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors mt-2"
            >
                Crear cuenta de administrador
            </button>

            {/* Volver al Login */}
            <p className="text-center text-sm mt-4 text-[#6F4E37]">
                ¿Ya tienes una cuenta?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[#8B4513] hover:underline font-bold"
                >
                    Inicia sesión aquí
                </button>
            </p>
        </form>
    );
};

export default RegisterForm;