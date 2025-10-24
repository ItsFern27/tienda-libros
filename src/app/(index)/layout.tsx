/*
Aqui se inician el header, main(children) y el footer, otorgandole un estilo css
por separado de tailwind para hacer el grid de los elemmentos iniciales del body

El contenido main se debe hacer desde la pagina de "page" de esta carpeta para
editar lo que se muestra en cada pagina

Se retrna un div pq en e ayut raiz siempre debe estar e
htm y bdy
*/
import "./layout.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white bg-black">
      <header>HEADER DE TODAS LAS PAGS</header>
      <main className="p-5">{children}</main>
      <footer>FOOTER DE TODAS LAS PAGS</footer>
    </div>
  );
}
