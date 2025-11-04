"use client";
import { addToCart } from "@/utils/cart";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  id: string;
  titulo: string;
  precio: number;
  img: string;
  cantidad?: number;
  goToCart?: boolean;
}

export function AddToCartButton({ id, titulo, precio, img, cantidad = 1, goToCart = true }: AddToCartButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    addToCart({ id, titulo, precio, img, cantidad });
    if (goToCart) {
      router.push("/paginaCarrito");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md font-semibold"
    >
      Agregar al carrito
    </button>
  );
}


