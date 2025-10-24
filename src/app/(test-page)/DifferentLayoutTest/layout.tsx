// Se 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="text-white bg-black">
      <header>QUERIA PROBAR SI SE PODIA HACER UN LAYOUT POR SEPARADO PARA CADA UNO</header>
      <main>{children}</main>
      <footer>SI SE PUDO PERO NO SE PARA QUE USAR ESTA PARTE DE LA PAGINA JJJAJJALOL</footer>
    </body>
  );
}
