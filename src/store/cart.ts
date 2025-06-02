import { create } from 'zustand';
import { Product } from '@/types';
import { toast } from 'sonner';
 
// Cart Store
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  syncWithLocalStorage: () => void;
  getTotalPrice: () => number;
}

const getLocalStorageCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: getLocalStorageCart(),
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Added ${quantity} more of "${product.title}" to cart`);
      } else {
        newItems = [...state.items, { product, quantity }];
        toast.success(`Added "${product.title}" to cart`);
      }
      
      saveCartToLocalStorage(newItems);
      return { items: newItems };
    });
  },
  removeItem: (productId) => {
    set((state) => {
      const itemToRemove = state.items.find(item => item.product.id.toString() === productId.toString());
      const newItems = state.items.filter(item => item.product.id.toString() !== productId.toString());
      saveCartToLocalStorage(newItems);
      if (itemToRemove) {
        toast.success(`Removed "${itemToRemove.product.title}" from cart`);
      }
      return { items: newItems };
    });
  },
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      const newItems = state.items.map(item =>
        item.product.id.toString() === productId.toString()
          ? { ...item, quantity }
          : item
      );
      saveCartToLocalStorage(newItems);
      return { items: newItems };
    });
  },
  clearCart: () => {
    saveCartToLocalStorage([]);
    set({ items: [] });
    toast.success('Cart cleared');
  },
  getItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  syncWithLocalStorage: () => {
    set({ items: getLocalStorageCart() });
  },
  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },
}));

// Wishlist Store
interface WishlistItem {
  productId: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (productId: string) => void;
  getWishlistItems: () => WishlistItem[];
}

const getLocalStorageWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

const saveWishlistToLocalStorage = (items: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: getLocalStorageWishlist(),
  toggleWishlist: (productId) => {
    set((state) => {
      const isInWishlist = state.items.some(item => item.productId === productId);
      const newWishlist = isInWishlist
        ? state.items.filter(item => item.productId !== productId)
        : [...state.items, { productId }];
        
      saveWishlistToLocalStorage(newWishlist);
      return { items: newWishlist };
    });
  },
  getWishlistItems: () => {
    return get().items;
  },
}));
