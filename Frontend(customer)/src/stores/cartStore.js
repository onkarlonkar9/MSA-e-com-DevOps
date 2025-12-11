// import required modules
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      // initiate item array with empty [] (when app mount)
      items: [],

      // sync with db in case user logged from multiple devices
      setItems: (items) => set({ items}),

      // add product to cart 
      addItem: (item) => {
        const exists = get().items.find((i) => i.productId === item.productId);
        if (!exists) {
          set({ items: [...get().items, item] });
        }
      },

      // remove the product from the cart
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },


      // clear all cart values (in case of order placed)
      clearCart: () => set({ items: [] }),

      // get total amount for checkout
      getTotalAmount: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },
      // get length of item in cart
      getLengthOfCart:()=>{
        return get().items.length;
      }
    }),
    {
      name: "cartStorage", // localStorage name
    }
  )
);
