/*
Aqui solo puse un page.tsx pq ya hay un layout en la
pagina principal que cubre el header, main y footer

Lo que se hace es editar el contenido de {children},
osea el del main del layout de: app > layout.tsx

(ahora mismo estamos en app > search > page.tsx)
*/

"use client";

import { useParams } from "next/navigation";

export default function ProductPageClient() {
  const params = useParams(); // { text: "valor" }
  return (
    <div>
      <h1>Producto {params?.text}</h1>
    </div>
  );
}