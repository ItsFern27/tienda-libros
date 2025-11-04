/* eslint-disable @next/next/no-img-element */
import { createClient } from "@/utils/supabase/server";

export async function BookCard() {
    const supabase = await createClient();
    const { data: libros } = await supabase.from('libro').select('*').limit(5);

    return (
        <>
            {libros?.map((libro) => (
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