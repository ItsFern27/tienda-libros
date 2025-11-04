import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-green-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl text-green-100">
            Tu librería de confianza desde siempre
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Historia */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              Nuestra Historia
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-4">
                <strong className="text-green-600">JH Libros</strong> nació de la pasión por compartir 
                el conocimiento y el amor por la lectura. Desde nuestros inicios, nos hemos comprometido 
                a ser más que una simple tienda de libros; somos un espacio donde los lectores encuentran 
                sus historias favoritas y descubren nuevas aventuras literarias.
              </p>
              <p className="text-lg mb-4">
                Fundada con la misión de hacer los libros accesibles para todos, hemos crecido hasta 
                convertirnos en una de las librerías más confiables de la región. Nuestro catálogo 
                incluye desde bestsellers internacionales hasta joyas literarias locales, siempre 
                manteniendo precios competitivos y un servicio al cliente excepcional.
              </p>
              <p className="text-lg">
                A lo largo de los años, hemos construido una comunidad de lectores apasionados que 
                confían en nosotros para encontrar su próximo libro favorito. Cada recomendación que 
                hacemos viene de nuestro equipo de expertos en literatura, que leen y analizan cada 
                título antes de incluirlo en nuestro catálogo.
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              Nuestra Misión
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Facilitar el acceso a la lectura para todos, ofreciendo una amplia variedad de libros 
              de calidad a precios justos. Nos comprometemos a proporcionar una experiencia de compra 
              excepcional, desde la selección del libro hasta la entrega, siempre con el cliente como 
              nuestra prioridad número uno.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              Nuestra Visión
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ser la librería líder en la región, reconocida por nuestra excelencia en el servicio 
              al cliente, la calidad de nuestro catálogo y nuestro compromiso con la comunidad lectora. 
              Aspiramos a ser el destino principal para todos los amantes de los libros.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Pasión por los Libros</h3>
                <p className="text-gray-600">
                  Amamos lo que hacemos y compartimos esa pasión con cada cliente que nos visita.
                </p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Compromiso con el Cliente</h3>
                <p className="text-gray-600">
                  Tu satisfacción es nuestra prioridad. Estamos aquí para ayudarte a encontrar el libro perfecto.
                </p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Calidad Garantizada</h3>
                <p className="text-gray-600">
                  Cada libro en nuestro catálogo ha sido cuidadosamente seleccionado por nuestro equipo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="mb-16">
          <div className="bg-linear-to-r from-green-600 to-green-600 rounded-lg shadow-lg p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              ¿Por qué elegir JH Libros?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Catálogo Amplio</h3>
                  <p className="text-green-100">
                    Miles de títulos en todas las categorías: ficción, no ficción, académicos, 
                    infantiles y más.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Precios Competitivos</h3>
                  <p className="text-green-100">
                    Ofrecemos los mejores precios del mercado sin comprometer la calidad del servicio.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
                  <p className="text-green-100">
                    Procesamos y enviamos tus pedidos de manera rápida y segura a todo el país.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Atención Personalizada</h3>
                  <p className="text-green-100">
                    Nuestro equipo está siempre disponible para ayudarte y recomendarte el libro perfecto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Nuestro Equipo
            </h2>
            <p className="text-center text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
              Detrás de JH Libros hay un equipo apasionado de bibliófilos, expertos en literatura 
              y profesionales comprometidos con brindarte la mejor experiencia de compra. Cada miembro 
              de nuestro equipo comparte el amor por los libros y está aquí para ayudarte a encontrar 
              tu próxima lectura favorita.
            </p>
            <div className="text-center">
              <p className="text-gray-600 italic">
                &ldquo;Un buen libro no se juzga por su portada, sino por la historia que cuenta y las 
                emociones que despierta. Ese es el espíritu que guía todo lo que hacemos en JH Libros.&rdquo;
              </p>
              <p className="text-gray-500 mt-4">— Equipo JH Libros</p>
            </div>
          </div>
        </section>

        {/* Contacto CTA */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-gray-700 mb-6">
              Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Enviar Email
              </a>
              <Link
                href="/"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

