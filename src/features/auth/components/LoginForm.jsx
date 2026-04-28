import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

export const LoginForm = ({ onForgotPassword, onSwitchToRegister }) => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res) {
            navigate("/dashboard");
            toast.success("Bienvenido de nuevo 🚀");
        } else {
            toast.error(error);
        }
    };

    return (
        <>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-[#4A3728] mb-1.5">
                        Email o Usuario
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="tu@email.com"
                        {...register("email", { required: true })}
                        className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#4A3728] mb-1.5">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", { required: true, minLength: 8 })}
                        className="w-full px-3 py-2 text-sm border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#8B4513] outline-none transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#6F4E37] hover:bg-[#5D4037] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm shadow-sm"
                >
                    Iniciar Sesión
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-[#8B4513] font-medium hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </p>
        </>
    );
};