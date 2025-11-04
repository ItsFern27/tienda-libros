import { createClient } from "@/utils/supabase/server";
import { BookCard } from "../book-components/book";

interface SearchResultsProps {
    searchQuery?: string;
}

export async function SearchResults({ searchQuery }: SearchResultsProps) {
    const supabase = await createClient();

    console.log('SearchResults recibió searchQuery:', searchQuery);

    if (!searchQuery || !searchQuery.trim()) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Buscar Libros</h2>
                <p className="text-gray-600">Ingresa un término de búsqueda para encontrar libros</p>
            </div>
        );
    }

    const query = searchQuery.trim().toLowerCase();
    console.log('Query procesado:', query);
    
    const { data: todosLosLibros, error: errorTodos } = await supabase
        .from('libro')
        .select('*');

    if (errorTodos) {
        console.error('Error al obtener libros de Supabase:', errorTodos);
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-red-600">Error al buscar libros: {errorTodos.message}</p>
                <p className="text-gray-500 text-sm mt-2">Código: {errorTodos.code}</p>
            </div>
        );
    }

    if (!todosLosLibros || todosLosLibros.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No hay libros en la base de datos</h2>
            </div>
        );
    }

    console.log('Total libros obtenidos:', todosLosLibros.length);
    console.log('Primeros 3 títulos:', todosLosLibros.slice(0, 3).map(l => l.titulo));

    const libros = todosLosLibros.filter((libro) => {
        const tituloLower = libro.titulo?.toLowerCase().trim() || '';
        const autorLower = libro.autor?.toLowerCase().trim() || '';
        const match = tituloLower.includes(query) || autorLower.includes(query);
        
        if (match) {
            console.log('Libro encontrado:', libro.titulo, 'Query:', query);
        }
        
        return match;
    });

    console.log('Búsqueda realizada. Query:', query, 'Total libros:', todosLosLibros.length, 'Encontrados:', libros.length);

    if (!libros || libros.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No se encontraron resultados</h2>
                <p className="text-gray-600">No hay libros que coincidan con "{searchQuery}"</p>
                <div className="mt-4 p-4 bg-gray-100 rounded text-sm text-left max-w-2xl">
                    <p><strong>Debug info:</strong></p>
                    <p>Query recibido: "{searchQuery}"</p>
                    <p>Query procesado: "{query}"</p>
                    <p>Total libros en BD: {todosLosLibros.length}</p>
                    <p className="mt-2">Primeros 5 títulos:</p>
                    <ul className="list-disc list-inside">
                        {todosLosLibros.slice(0, 5).map((libro, idx) => (
                            <li key={idx}>"{libro.titulo}"</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Resultados para "{searchQuery}" ({libros.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {libros.map((libro) => (
                    <BookCard key={libro.id} libro={libro} />
                ))}
            </div>
        </div>
    );
}

