import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
const AuthPage = () => {
    const [view, setView] = useState("login"); 

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-[#EADDCA] p-6 md:p-10">

                <div className="flex justify-center mb-6">
                    <img
                        src="/src/assets/img/Kafetery_logo.png"
                        alt="Kafetery"
                        className="h-50 w-auto"
                    />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#4A3728] mb-2">
                        {view === "forgot"
                            ? "Recuperar contraseña"
                            : view === "login"
                                ? "Bienvenido de nuevo"
                                : "Crear una cuenta"}
                    </h1>

                    <p className="text-[#6F4E37] text-base max-w-md mx-auto">
                        {view === "forgot"
                            ? "Ingresa tu correo electrónico para restablecer tu contraseña"
                            : view === "login"
                                ? "Ingresa a tu cuenta de administrador de Kafetery"
                                : "Regístrate como administrador de Kafetery"}
                    </p>
                </div>

                {view === "login" && (
                    <LoginForm
                        onForgotPassword={() => setView("forgot")}
                        onSwitchToRegister={() => setView("register")}
                    />
                )}

                {view === "forgot" && (
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="forgot-email" className="block text-sm font-medium text-[#4A3728] mb-1.5">
                                Email
                            </label>
                            <input
                                id="forgot-email"
                                type="email"
                                className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#6F4E37] hover:bg-[#5D4037] text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors">
                            Enviar enlace de recuperación
                        </button>
                        <button type="button" onClick={() => setView("login")} className="w-full mt-2 text-[#8B4513] hover:underline text-sm font-medium">
                            Volver al login
                        </button>
                    </form>
                )}

                {view === "register" && (
                    <RegisterForm onSwitchToLogin={() => setView("login")} />
                )}
                
            </div>
        </div>
    );
};

export default AuthPage;