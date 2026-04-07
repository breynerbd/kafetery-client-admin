const LoginForm = ({ onForgotPassword, onSwitchToRegister }) => {
    return (
        <>
            <form className="space-y-5">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#4A3728] mb-1.5"
                    >
                        Email o usuario
                    </label>
                    <input
                        id="email"
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[#4A3728] mb-1.5"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#6F4E37] hover:bg-[#5D4037] text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                >
                    Iniciar sesión
                </button>
            </form>

            <p className="text-center text-sm mt-4 flex flex-col gap-2">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[#8B4513] hover:underline font-medium"
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <span className="text-[#6F4E37]">
                    ¿No tienes cuenta?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-[#8B4513] hover:underline font-bold"
                    >
                        Regístrate
                    </button>
                </span>
            </p>
        </>
    );
};

export default LoginForm;