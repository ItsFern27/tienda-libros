import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-green-600 mt-8">
            <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                <div>
                    <h3 className="font-semibold text-white mb-2">JH Libros</h3>
                    <p className="text-gray-200">Tu tienda de libros favorita. Encuentra títulos nuevos y usados, reseñas y recomendaciones.</p>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-2">Enlaces</h4>
                    <ul className="space-y-1">
                        <li><Link href="/search" className="text-gray-200">Categorias</Link></li>
                        <li><Link href="/stores" className="text-gray-200">Tiendas</Link></li>
                        <li><Link href="/configuration" className="text-gray-200">Configuración</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-2">Contacto</h4>
                    <p className="text-gray-200">Correo: <a className="hover:text-green-600" href="mailto:contacto@jhlibros.com">contacto@jhlibros.com</a></p>
                    <p className="text-gray-200 mt-2">Síguenos en redes</p>
                    <div className="flex gap-3 mt-2">
                        <a className="text-gray-300 hover:text-green-600" href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
                        <a className="text-gray-300 hover:text-green-600" href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
                    </div>
                </div>
            </div>

            <div className="bg-green-600">
                <div className="container mx-auto px-6 py-4 text-xs text-gray-200 text-center">© {new Date().getFullYear()} JH Libros. Todos los derechos reservados.</div>
            </div>
        </footer>
    )
}
