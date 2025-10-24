/*
Aqui solo puse un page.tsx pq ya hay un layout en la
pagina principal que cubre el header, main y footer

Lo que se hace es editar el contenido de {children},
osea el del main del layout de: app > layout.tsx

(ahora mismo estamos en app > configuration > page.tsx)
*/

export default function Home() {
  return (
    <>
      <div>user configs</div>
    </>
  );
}