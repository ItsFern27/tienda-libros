/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/utils/supabase/server";

interface BookCardProps {
    limit?: number;
    titulo?: number | string;
}

export async function BookCard({ limit = 5, titulo }: BookCardProps = {}) {
    const supabase = await createClient();
    
    let query = supabase.from('libro').select('*');
    
    // Si se especifica un titulo, obtener solo ese libro
    if (titulo) {
        query = query.eq('titulo', titulo).limit(1);
    } else {
        // Si no hay bookId, usar el límite especificado
        query = query.limit(limit);
    }
    
    const { data: libros } = await query;

    // Si no hay libros, retornar null o un mensaje
    if (!libros || libros.length === 0) {
        return null;
    }

    return (
        <>
            {libros.map((libro) => (
                <div
                    key={libro.id}
                    className="max-w-60 w-full flex flex-col cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-102 transition-[transform, shadow] duration-300"
                >
                    {/* Imagen del libro */}
                    <img
                        src={libro.portada} // <-- aquí tu campo de la URL de la portada
                        alt={libro.titulo}
                        className="h-90 object-contain"
                    />

                    {/* Contenido del libro */}
                    <div className="flex flex-col justify-between p-4">
                        <div>
                            <p className="text-sm text-gray-600">{libro?.autor}</p>
                            <h2 className="text-lg font-bold text-gray-800 h-12 leading-6 line-clamp-2">{libro?.titulo}</h2>
                        </div>
                        <p className="mt-2 font-semibold text-green-600">S/.{libro?.precio}</p>
                    </div>
                </div>
            ))}
        </>
    )
}