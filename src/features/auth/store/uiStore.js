import { create } from "zustand";

export const useUIStore = create((set) => ({
    
    modal: null,
    confirm: null,

    OpenModal: (title, message, onClose) => set({
        modal: {title, message, onClose}
     }
    ),

    CloseModal: () => set({modal: null}),

    openConfirm: (title, message, openConfirm, onCancel) => set({
        confirm: {title, message, openConfirm, onCancel}
    }),

    closeConfirm: () => set({confirm: null})

}));