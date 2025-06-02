// @ts-nocheck


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function addToCart(productId: string, quantity: number = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId: string) {
    const cart = getCart().filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartItemQuantity(productId: string, quantity: number) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export function getCart() {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

export function clearCart() {
    localStorage.removeItem('cart');
}

export function getCartItemCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}
