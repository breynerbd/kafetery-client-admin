import { useReservationsStore } from "../store/reservationStore.js";

export const useSaveReservation = () => {
    const createReservation = useReservationsStore((state) => state.createReservation);
    const updateReservation = useReservationsStore((state) => state.updateReservation);

    const saveReservation = async (data, reservationId = null) => {
        const payload = {
            user: data.user,
            restaurant: data.restaurant,
            table: data.table,
            date: data.date,
            time: data.time,
            people: Number(data.people) || 1
        };

        try {
            if (reservationId) {
                await updateReservation(reservationId, payload);
            } else {
                await createReservation(payload);
            }
        } catch (error) {
            console.error("Error en useSaveReservation:", error);
            throw error;
        }
    };

    return { saveReservation };
};