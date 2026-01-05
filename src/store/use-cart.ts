import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
            set({
                items: currentItems.map((item) => 
                    item.id === data.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            });
          return;
        }

        set({ items: [...get().items, { ...data, quantity: 1 }] });
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
      },
      updateQuantity: (id: string, quantity: number) => {
          if (quantity < 1) return;
          set({
              items: get().items.map((item) => 
                item.id === id ? { ...item, quantity } : item
              )
          });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
