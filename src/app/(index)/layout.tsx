/*
Aqui se inician el header, main(children) y el footer, otorgandole un estilo css
por separado de tailwind para hacer el grid de los elemmentos iniciales del body

El contenido main se debe hacer desde la pagina de "page" de esta carpeta para
editar lo que se muestra en cada pagina

Se retrna un div pq en e ayut raiz siempre debe estar e
htm y bdy
*/
import Link from "next/link";
import "./layout.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="shadow-sm bg-white font-bold text-green-500 py-6 px-10 flex items-center">

        <div className="flex items-center relative w-25">
          <Link href="/" className="h-13 w-full absolute">
            <img className="h-full w-full object-contain" src="logo.png" alt="JH Libros"/>
          </Link>
        </div>

        <Link href="/search">Categorias</Link>

        <Link href="/stores">Tiendas</Link>

        <div className="flex items-center border-black rounded-2xl border-1">
          <input className="text-black font-medium" type="text" placeholder="Buscar..."/>
          <button>
            <svg className="h-full w-5 object-contain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
          </button>
        </div>

        <div className="flex items-center">
          <Link href="/stores">Carrito</Link>
          <svg className="h-full w-5 object-contain text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
        </div>

        <div className="flex items-center">
          <Link href="/stores">Iniciar sesión</Link>
          <svg className="h-full w-4 object-contain text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>
        </div>

      </header>
      <main className="p-5">{children}</main>
      <footer className="bg-green-600 py-6 ">FOOTER DE TODAS LAS PAGS</footer>
    </div>
  );
}
