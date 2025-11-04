"use client";
import * as React from "react";
import LibroInform from "./Carrito/LibroInform";
import Link from "next/link";

interface ICarritoProps {}

const INITIAL_LIBROS = [
  { id: "101", img: "/", titulo: "El Principito", precio: 45.0, cantidad: 1 },
  { id: "102", img: "/", titulo: "Mario Card", precio: 12.0, cantidad: 2 },
  { id: "103", img: "/", titulo: "Flores", precio: 12.5, cantidad: 3 },
];

const Page: React.FunctionComponent<ICarritoProps> = () => {
  const [libros, setLibros] = React.useState(INITIAL_LIBROS);
  const [subtotal, setSubtotal] = React.useState(0);

  const actualizarCantidad = (idLibro: string, nuevaCantidad: number) => {
    setLibros((prevLibros) =>
      prevLibros.map((libro) => {
        if (libro.id === idLibro) {
          const cantidadValida = Math.max(0, nuevaCantidad);
          return { ...libro, cantidad: cantidadValida };
        }
        return libro;
      })
    );
  };

  React.useEffect(() => {
    const newSubTotal = libros.reduce((acum, libro) => {
      const precioTotalLibro = libro.cantidad * libro.precio;
      return acum + precioTotalLibro;
    }, 0);
    setSubtotal(newSubTotal);
  }, [libros]);

  return (
    <div className="w-full min-h-[80vh] p-[2%5%]">
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
            {libros.map((libro) => {
              if (libro.cantidad > 0) {
                return (
                  <LibroInform
                    key={libro.id}
                    onCantidadChange={actualizarCantidad}
                    {...libro}
                  />
                );
              } else {
                return;
              }
            })}
          </div>
          <Link className="block w-4/10" href={"/"}>
            Seguir Comprando
          </Link>
          <span
            className="block w-4/10 cursor-pointer "
            onClick={() => {
              if (libros.length > 0) {
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

            <button className="w-full bg-green-600 text-white py-3 rounded-full font-bold hover:bg-green-700 transition duration-300 shadow-md">
              Finalizar Compra
            </button>

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
      <div>
        <Link href="/" className="">RECOMENDACION PARA TI</Link>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
