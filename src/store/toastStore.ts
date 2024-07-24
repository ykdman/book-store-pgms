import { create } from "zustand";
import { devtools, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ToastType = "info" | "error";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStoreState {
  toasts: ToastItem[];
}

interface ToastStoreAction {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStoreState & ToastStoreAction>()(
  devtools(
    immer((set) => ({
      toasts: [],
      addToast: (message, type = "info") =>
        set((state: ToastStoreState) => {
          state.toasts = [...state.toasts, { message, type, id: Date.now() }];
        }),
      removeToast: (id) =>
        set((state: ToastStoreState) => {
          state.toasts = state.toasts.filter((toast) => toast.id !== id);
        }),
    }))
  )
);
