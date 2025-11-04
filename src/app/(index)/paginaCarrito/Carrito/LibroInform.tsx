/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";

interface ILibroInformProps {
  id: string;
  img: string;
  titulo: string;
  precio: number;
  cantidad: number;
  onCantidadChange: (id: string, nuevaCantidad: number) => void;
}

const LibroInform: React.FunctionComponent<ILibroInformProps> = ({
  id,
  img,
  titulo,
  precio,
  cantidad,
  onCantidadChange,
}) => {
  const handleAumentar = () => {
    onCantidadChange(id, cantidad + 1);
  };

  const handleDisminuir = () => {
    if (cantidad > 0) {
      onCantidadChange(id, cantidad - 1);
    }
  };

  return (
    <div
      className={`w-full h-35 border-[fff] border-solid border-2 flex flex-row`}
    >
      <img className="w-[30%] h-full object-cover" src={img} alt={"Imagen sobre Libro"} />
      <div className="w-[70%] h-full flex flex-row">
        <div className="w-[40%]">
          <p className="text-[1.6rem]">{titulo}</p>
          <p className="w-full">Esta es informacion relacionada al Libro.</p>
        </div>
        <div className="w-[60%] flex justify-center items-center">
          <div className="w-8/10 h-5/10 flex flex-rwo bg-amber-600 rounded-2xl justify-center items-center">
            <span className=" w-5/10 font-black text-center">{`$/${(precio * cantidad)}`}</span>
            <div className="flex flex-row w-4/10 h-6/10 rounded-2xl justify-around items-center bg-amber-100">
              <button
                className="font-bold text-2xl cursor-pointer" 
                onClick={handleDisminuir}
              >
                -
              </button>
              <p>{cantidad}</p>
              <button
              className="font-bold text-2x1 cursor-pointer"
                onClick={handleAumentar}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroInform;