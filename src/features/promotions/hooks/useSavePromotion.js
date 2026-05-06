import { usePromotionsStore } from "../store/promotionStore";

export const useSavePromotion = () => {
    const { createPromotion, updatePromotion } = usePromotionsStore();

    const savePromotion = async (promotionData, promotionId) => {
        if (promotionId) {
            await updatePromotion(promotionId, promotionData);
        } else {
            await createPromotion(promotionData);
        }
    };

    return {
        savePromotion
    };
};