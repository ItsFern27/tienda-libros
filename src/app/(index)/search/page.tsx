/*
Aqui solo puse un page.tsx pq ya hay un layout en la
pagina principal que cubre el header, main y footer

Lo que se hace es editar el contenido de {children},
osea el del main del layout de: app > layout.tsx

(ahora mismo estamos en app > search > page.tsx)
*/

import { SearchResults } from "@/app/components/search/search-results";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }> | { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const searchQuery = params?.q || "";
  
  console.log('SearchPage - searchParams:', params);
  console.log('SearchPage - searchQuery:', searchQuery);

  return (
    <div className="container mx-auto px-6 py-8">
      <SearchResults searchQuery={searchQuery} />
    </div>
  );
}