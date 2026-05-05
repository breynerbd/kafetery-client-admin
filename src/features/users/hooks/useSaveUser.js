import { useUsersStore } from "../../users/store/userStore.js"; // Asegúrate de ajustar la ruta

export const useSaveUser = () => {
    // Recuperación de funciones para el hook desde el store
    const createUser = useUsersStore((state) => state.createUser);
    const updateUser = useUsersStore((state) => state.updateUser);

    const saveUser = async (data, userId = null) => {
        const formData = new FormData();
        
        formData.append("auth_id", data.auth_id);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("role", data.role);

        // Solo añadimos la contraseña si el usuario escribió algo
        if (data.password && data.password.trim() !== "") {
            formData.append("password", data.password);
        }

        try {
            if (userId) {
                await updateUser(userId, formData);
            } else {
                await createUser(formData);
            }
        } catch (error) {
            console.error("Error en useSaveUser:", error);
            throw error;
        }
    };

    return { saveUser };
};