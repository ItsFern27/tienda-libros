// Consideren esto como el pre-Index
// Importar tailwind para que se pueda usar en todas las paginas siguientes
import "./globals.css";

// Iniciar la pagina
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-black bg-gray-100">
        {children}
      </body>
    </html>
  );
}