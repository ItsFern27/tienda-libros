/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface Libro {
    id: string;
    titulo: string;
    autor: string;
    precio: number;
    portada: string;
}

interface BookCardProps {
    limit?: number;
    titulo?: number | string;
    libro?: Libro;
}

function BookCardItem({ libro }: { libro: Libro }) {
    return (
        <Link href={`/libro/${libro.id}`} className="max-w-60 w-full">
            <div
                className="w-full flex flex-col cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-102 transition-[transform, shadow] duration-300"
            >
                <img
                    src={libro.portada}
                    alt={libro.titulo}
                    className="h-90 object-contain"
                />
                <div className="flex flex-col justify-between p-4">
                    <div>
                        <p className="text-sm text-gray-600">{libro?.autor}</p>
                        <h2 className="text-lg font-bold text-gray-800 h-12 leading-6 line-clamp-2">{libro?.titulo}</h2>
                    </div>
                    <p className="mt-2 font-semibold text-green-600">S/.{libro?.precio}</p>
                </div>
            </div>
        </Link>
    );
}

export async function BookCard({ limit = 5, titulo, libro }: BookCardProps = {}) {
    if (libro) {
        return <BookCardItem libro={libro} />;
    }

    const supabase = await createClient();
    
    let query = supabase.from('libro').select('*');
    
    if (titulo) {
        query = query.eq('titulo', titulo).limit(1);
    } else {
        query = query.limit(limit);
    }
    
    const { data: libros } = await query;

    if (!libros || libros.length === 0) {
        return null;
    }

    return (
        <>
            {libros.map((libro) => (
                <BookCardItem key={libro.id} libro={libro} />
            ))}
        </>
    )
}