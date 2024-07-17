import { create } from "zustand";
import { devtools, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  isLoggedIn: boolean;
}

interface StoreAction {
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState & StoreAction>()(
  devtools(
    immer((set) => ({
      isLoggedIn: getToken() ? true : false,
      storeLogin: (token: string) =>
        set((state: StoreState) => {
          state.isLoggedIn = true;
          setToken(token);
        }),
      storeLogout: () =>
        set((state: StoreState) => {
          state.isLoggedIn = false;
          removeToken();
        }),
    })),
    { name: "authStore" }
  )
);
