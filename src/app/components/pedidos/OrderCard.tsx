"use client";

import { useState } from "react";

export type Pedido = {
  id: string;
  usuario_id: string;
  total: number;
  fecha: string;
};

type OrderCardProps = {
  pedido: Pedido;
};

export default function OrderCard({ pedido }: OrderCardProps) {
  const [open, setOpen] = useState(false);
  const [detalles, setDetalles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchDetalles() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`api/pedidos/${pedido.id}`);
      if (!res.ok) throw new Error("Error al obtener detalles del pedido");

      const data = await res.json();
      setDetalles(data.detalles || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleOpen() {
    setOpen(true);
    await fetchDetalles();
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2>{new Date(pedido.fecha).toLocaleDateString("es-PE")}</h2>
        <p className="text-gray-600">Pedido #{pedido.id}</p>
        <p className="text-gray-700 font-medium">
          Total: S/. {Number(pedido.total).toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleOpen}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Ver más
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg relative max-h-[80vh] overflow-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Detalles del Pedido
            </h2>

            {loading ? (
              <p className="text-center text-gray-600">Cargando...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : detalles.length > 0 ? (
              <ul className="space-y-3">
                {detalles.map((detalle, i) => (
                  <li
                    key={i}
                    className="border rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">
                        {detalle.libro?.titulo || "Libro sin título"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Cantidad: {detalle.cantidad}
                      </p>
                    </div>
                    <p className="text-gray-700 font-medium">
                      S/. {Number(detalle.precio_unitario).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600">
                No hay detalles disponibles para este pedido.
              </p>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-700">
                <strong>Total:</strong> S/. {Number(pedido.total).toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">
                Fecha: {new Date(pedido.fecha).toLocaleString("es-PE")}
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
