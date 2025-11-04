"use client";

export interface CartItem {
  id: string;
  titulo: string;
  precio: number;
  img: string;
  cantidad: number;
}

const STORAGE_KEY = "cart_items";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "cantidad"> & { cantidad?: number }) {
  const current = getCart();
  const existingIndex = current.findIndex((i) => i.id === item.id);
  const qty = item.cantidad ?? 1;
  if (existingIndex >= 0) {
    const updated = [...current];
    updated[existingIndex] = {
      ...updated[existingIndex],
      cantidad: updated[existingIndex].cantidad + qty,
    };
    setCart(updated);
    return updated;
  }
  const next = [...current, { ...item, cantidad: qty }];
  setCart(next);
  return next;
}

export function updateQuantity(id: string, cantidad: number) {
  const current = getCart();
  const next = current
    .map((i) => (i.id === id ? { ...i, cantidad: Math.max(0, cantidad) } : i))
    .filter((i) => i.cantidad > 0);
  setCart(next);
  return next;
}

export function removeFromCart(id: string) {
  const current = getCart();
  const next = current.filter((i) => i.id !== id);
  setCart(next);
  return next;
}

export function clearCart() {
  setCart([]);
}


