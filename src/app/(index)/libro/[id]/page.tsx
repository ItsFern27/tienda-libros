import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { AddToCartButton } from "@/app/components/cart/add-to-cart";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LibroPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: libro } = await supabase
    .from("libro")
    .select("id, titulo, autor, precio, portada, descripcion")
    .eq("id", id)
    .single();

  if (!libro) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Libro no encontrado</h1>
        <Link href="/" className="text-blue-600 underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={libro.portada} alt={libro.titulo} className="max-h-96 object-contain" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{libro.titulo}</h1>
          <p className="text-gray-600">{libro.autor}</p>
        </div>
        <p className="text-2xl font-semibold text-green-700">S/. {libro.precio.toFixed(2)}</p>
        {libro.descripcion ? (
          <p className="text-gray-700 leading-7 whitespace-pre-line">{libro.descripcion}</p>
        ) : null}
        <div className="flex gap-3 mt-4 items-center">
          <AddToCartButton
            id={libro.id}
            titulo={libro.titulo}
            precio={libro.precio}
            img={libro.portada}
            cantidad={1}
            goToCart={true}
          />
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-5 py-3 rounded-md"
          >
            Seguir explorando
          </Link>
        </div>
      </div>
    </div>
  );
}


