import { create } from "zustand";

interface CartStoreState {
  cartItemCount: number;
  setCartItemCount: (count: number) => void;
  incrementCartItemCount: (by: number) => void;
  decrementCartItemCount: (by: number) => void;
}

export const CartItemCountStore = create<CartStoreState>((set) => ({
  cartItemCount: 0,
  setCartItemCount: (count) => set({ cartItemCount: count }),
  incrementCartItemCount: (by) =>
    set((state) => ({ cartItemCount: state.cartItemCount + by })),
  decrementCartItemCount: (by) =>
    set((state) => ({
      cartItemCount: Math.max(0, state.cartItemCount - by),
    })),
}));
