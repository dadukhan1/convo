import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: {
        name: "jhon",
        _id: 123,
        age: 25,
    },
    isLoggedIn: false,

    login: () => {
        console.log("logged in ");
        set({ isLoggedIn: true });
    }
}));