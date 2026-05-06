import { useRestaurantStore } from "../store/restaurantStore.js";

export const useSaveRestaurant = () => {
    const createRestaurant = useRestaurantStore((state) => state.createRestaurant);
    const updateRestaurant = useRestaurantStore((state) => state.updateRestaurant);

    const saveRestaurant = async (data, restaurantId = null) => {
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("address", data.address);
        formData.append("phone", data.phone);
        formData.append("email", data.email);
        formData.append("openingTime", data.openingTime);
        formData.append("closingTime", data.closingTime);
        formData.append("owner", data.owner);

        try {
            if (restaurantId) {
                await updateRestaurant(restaurantId, formData);
            } else {
                await createRestaurant(formData);
            }
        } catch (error) {
            console.error("Error en useSaveRestaurant:", error);
            throw error;
        }
    };

    return { saveRestaurant };
};