
import { NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Obtener el usuario actual autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "No autenticado. Por favor inicia sesión." },
        { status: 401 }
      );
    }

    // Obtener los datos del carrito del body
    const body = await request.json();
    const { items, total } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío" },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: "El total debe ser mayor a 0" },
        { status: 400 }
      );
    }

    // Verificar que el usuario existe en la tabla usuario
    // Buscar el usuario en la tabla usuario usando el id de auth
    const { data: usuario, error: usuarioError } = await supabase
      .from("usuario")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (usuarioError) {
      console.error("Error buscando usuario:", usuarioError);
      return NextResponse.json(
        { error: "Error al verificar el usuario: " + usuarioError.message },
        { status: 500 }
      );
    }

    // Si el usuario no existe en la tabla, usar directamente el id de auth
    // (asumiendo que el id de auth.users coincide con usuario.id)
    const usuarioId = usuario?.id || user.id;

    // Crear el pedido
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedido")
      .insert({
        usuario_id: usuarioId,
        total: total,
      })
      .select()
      .single();

    if (pedidoError) {
      console.error("Error creando pedido:", pedidoError);
      return NextResponse.json(
        { error: "Error al crear el pedido: " + pedidoError.message },
        { status: 500 }
      );
    }

    if (!pedido) {
      return NextResponse.json(
        { error: "No se pudo crear el pedido" },
        { status: 500 }
      );
    }

    // Crear los detalles del pedido
    const detalles = items.map((item: any) => ({
      pedido_id: pedido.id,
      libro_id: parseInt(item.id), // Asegurarse de que es un número
      cantidad: item.cantidad,
      precio_unitario: item.precio,
    }));

    const { error: detallesError } = await supabase
      .from("detalle_pedido")
      .insert(detalles);

    if (detallesError) {
      console.error("Error creando detalles:", detallesError);
      // Si falla, podríamos intentar eliminar el pedido creado
      // Por ahora solo retornamos el error
      return NextResponse.json(
        { error: "Error al crear los detalles del pedido: " + detallesError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      pedido: {
        id: pedido.id,
        total: pedido.total,
        fecha: pedido.fecha,
      },
    });
  } catch (error: any) {
    console.error("Error en POST /api/pedidos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor: " + error.message },
      { status: 500 }
    );
  }
}

