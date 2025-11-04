import Link from "next/link";
import { HeaderProfile } from "./header-profile";

// Server component Header
export async function Header() {

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          
                <div className="flex items-center gap-4">
                    <Link href="/" aria-label="Inicio" className="block h-10 w-40">
                        <img className="h-full w-full object-contain" src="/logo.png" alt="JH Libros" />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                    <Link href="/search" className="hover:text-green-600">Categorias</Link>
                    <Link href="/stores" className="hover:text-green-600">Tiendas</Link>
                    <form role="search" aria-label="Buscar libros" className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <input className="px-3 py-2 text-sm text-gray-800 placeholder-gray-400" type="search" name="q" placeholder="Buscar..." />
                        <button type="submit" className="px-3 text-gray-600 hover:text-green-600" aria-label="Buscar">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
                        </button>
                    </form>
                </nav>

             
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="hidden md:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-green-600">
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                        <span className="sr-only">Carrito</span>
                    </Link>

                    <HeaderProfile />
                </div>
            </div>
        </header>
    )
}