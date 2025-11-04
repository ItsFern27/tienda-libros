import { NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await createClient();

  const { data: pedido, error: pedidoError } = await supabase
    .from("pedido")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (pedidoError) {
    console.error("Error leyendo pedido:", pedidoError);
    return NextResponse.json({ error: pedidoError.message }, { status: 500 });
  }

  if (!pedido) {
    return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
  }

  const { data: detalles, error: detalleError } = await supabase
    .from("detalle_pedido")
    .select("*, libro(titulo, precio, portada)")
    .eq("pedido_id", id);

  if (detalleError) {
    console.error("Error leyendo detalles:", detalleError);
  }

  return NextResponse.json({
    pedido,
    detalles: detalles ?? [],
  });
}