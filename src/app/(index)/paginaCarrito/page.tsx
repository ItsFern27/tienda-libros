/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import * as React from "react";
import LibroInform from "./Carrito/LibroInform";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, updateQuantity, clearCart, type CartItem } from "@/utils/cart";
import { BookSection } from "@/app/components/book-components/book-section";

interface ICarritoProps {}

const Page: React.FunctionComponent<ICarritoProps> = () => {
  const router = useRouter();
  // Inicializar con array vacío para evitar diferencias servidor/cliente
  const [libros, setLibros] = React.useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  // Cargar datos del carrito solo en el cliente después de montar
  React.useEffect(() => {
    setIsMounted(true);
    setLibros(getCart());
  }, []);

  const actualizarCantidad = (idLibro: string, nuevaCantidad: number) => {
    const next = updateQuantity(idLibro, nuevaCantidad);
    setLibros(next);
  };

  React.useEffect(() => {
    if (!isMounted) return;
    const newSubTotal = libros.reduce((acum, libro) => {
      const precioTotalLibro = libro.cantidad * libro.precio;
      return acum + precioTotalLibro;
    }, 0);
    setSubtotal(newSubTotal);
  }, [libros, isMounted]);

  const handleFinalizarCompra = async () => {
    if (libros.length === 0 || subtotal <= 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: libros,
          total: subtotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al finalizar la compra");
      }

      // Éxito: limpiar el carrito y mostrar mensaje
      clearCart();
      setLibros([]);
      setSuccess(true);

      // Redirigir a la página de pedidos después de 2 segundos
      setTimeout(() => {
        router.push("/pedidos");
      }, 2000);
    } catch (e: any) {
      setError(e.message || "Error al finalizar la compra");
    } finally {
      setLoading(false);
    }
  };

  // No renderizar hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return (
      <div className="w-full min-h-[80vh] p-[2%5%] flex flex-col gap-10">
        <span className="">{"Inicio > Carro de Compras"}</span>
        <h2 className="font-bold text-[2rem]">Mi Carrito de Compras</h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[80vh] p-[2%5%] flex flex-col gap-10">
      <span className="">{"Inicio > Carro de Compras"}</span>
      <h2 className="font-bold text-[2rem]">Mi Carrito de Compras</h2>
      <div className="grid grid-cols-[60%40%] justify-items-center">
        <div className="flex flex-col w-full ">
          <div className="w-full flex flex-row border-b-2 border-[fff] border-solid mb-4">
            <p className="w-[60%] h-full">LIBRO</p>
            <p className="w-[20%]">PRECIO</p>
            <p className="w-[20%]">CANTIDAD</p>
          </div>
          <div className="content-lista-libros flex flex-col gap-4">
            {libros.length === 0 ? (
              <p className="text-gray-500 py-8 text-center">Tu carrito está vacío</p>
            ) : (
              libros.map((libro) => {
                if (libro.cantidad > 0) {
                  return (
                    <LibroInform
                      key={libro.id}
                      onCantidadChange={actualizarCantidad}
                      {...libro}
                    />
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
          <Link className="block w-4/10" href={"/"}>
            Seguir Comprando
          </Link>
          <span
            className="block w-4/10 cursor-pointer "
            onClick={() => {
              if (libros.length > 0) {
                clearCart();
                setLibros([]);
              }
            }}
          >
            Eliminar Todos los Libros
          </span>
        </div>
        <div className="content-compras-inform p-4 w-9/10">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <span className="text-xl font-bold mb-4 block border-b pb-2 text-gray-800">
              Resumen de Compra
            </span>

            <div className="flex justify-between items-center text-lg mb-3">
              <p className="text-gray-600">SubTotal</p>
              <span className="font-semibold text-gray-800">
                S/{subtotal.toFixed(2)}
              </span>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <p>Total</p>
              <span className="text-2xl text-red-600">
                S/{subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleFinalizarCompra}
              disabled={loading || libros.length === 0 || subtotal <= 0}
              className={`w-full py-3 rounded-full font-bold transition duration-300 shadow-md ${
                loading || libros.length === 0 || subtotal <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? "Procesando..." : "Finalizar Compra"}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                ¡Compra realizada con éxito! Redirigiendo a tus pedidos...
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition duration-150">
                <p className="text-sm font-medium text-gray-700">
                  Tienes un Cupón de Descuento
                </p>
                <div className="text-lg text-gray-500 font-bold">{">"}</div>
              </div>

              <div className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition duration-150">
                <p className="text-sm font-medium text-gray-700">
                  Tienes una tarjeta de regalo
                </p>
                <div className="text-lg text-gray-500 font-bold">{">"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookSection title="Recomendados para ti"/>
    </div>
  );
};

export default Page;
