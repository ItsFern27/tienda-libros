/*
Aqui solo puse un page.tsx pq ya hay un layout en la
pagina principal que cubre el header, main y footer

Lo que se hace es editar el contenido de {children},
osea el del main del layout de: app > layout.tsx

(ahora mismo estamos en app > search > page.tsx)
*/

import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col items-start'> {/* borrar items-start para comportamiento normal de flex */}
      <h1>search</h1>
      <Link href="/" className='bg-purple-700'>link a main</Link>
    </div>
  );
}