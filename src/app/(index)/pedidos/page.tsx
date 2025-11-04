import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import OrderCard from "@/app/components/pedidos/OrderCard";

type Pedido = {
  id: string;
  usuario_id: string;
  libro_id: number;
  cantidad: number;
  total: number;
  fecha: string;
};

export default async function PedidosPage() {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error al obtener sesión:", sessionError.message);
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold">Error al verificar sesión.</h1>
        <p>{sessionError.message}</p>
      </div>
    );
  }

  // Si no hay sesión, mostramos mensaje de no autenticado
  if (!session) {
    return (
      <div className="p-6">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Volver al inicio
        </Link>
        <h1 className="text-xl font-bold mb-2">Mis pedidos</h1>
        <p className="text-gray-600">
          No se encontraron pedidos. Inicia sesión para consultar tus pedidos.
        </p>
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  // Si hay sesión, usar el ID del usuario autenticado
  const usuarioId = session.user.id;

  // Consultar pedidos
  const { data: pedidos, error } = await supabase
    .from("pedido")
    .select("*")
    .eq("usuario_id", usuarioId)
    .order("fecha", { ascending: false });

  if (error) {
    console.error("Error al obtener pedidos:", error.message);
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold">Error al cargar pedidos.</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="p-6">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Volver al inicio
        </Link>
        <h1 className="text-xl font-bold mb-2">Mis pedidos</h1>
        <p className="text-gray-600">No tienes pedidos registrados.</p>
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link href="/" className="text-blue-600 hover:underline font-medium">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl font-bold mb-4">Mis pedidos</h1>

      <div className="space-y-4">
        {pedidos.map((pedido: Pedido) => (
          <div key={pedido.id}>
            <OrderCard pedido={pedido} />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}