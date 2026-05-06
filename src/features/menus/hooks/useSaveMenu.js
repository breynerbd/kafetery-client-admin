import { useMenuStore } from "../store/menuStore.js";

export const useSaveMenu = () => {
    const createMenu = useMenuStore((state) => state.createMenu);
    const updateMenu = useMenuStore((state) => state.updateMenu);

    const saveMenu = async (data, menuId = null) => {
        const formData = new FormData();
        
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("prepTime", data.prepTime);
        formData.append("availableFrom", data.availableFrom);
        formData.append("availableTo", data.availableTo);
        formData.append("restaurant", data.restaurant);

        try {
            if (menuId) {
                await updateMenu(menuId, formData);
            } else {
                await createMenu(formData);
            }
        } catch (error) {
            console.error("Error en useSaveMenu:", error);
            throw error;
        }
    };

    return { saveMenu };
};