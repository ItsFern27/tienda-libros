
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
  // Este layout es hijo del layout raíz; no debe volver a renderizar Header/Footer
  return (
    <div>
      <main className="p-5">{children}</main>
    </div>
  );
}
