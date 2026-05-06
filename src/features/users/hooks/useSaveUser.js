import { useUsersStore } from "../../users/store/userStore.js";

export const useSaveUser = () => {
    const createUser = useUsersStore((state) => state.createUser);
    const updateUser = useUsersStore((state) => state.updateUser);

    const saveUser = async (data, userId = null) => {
        const formData = new FormData();
        
        formData.append("auth_id", data.auth_id);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("role", data.role);

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