// Consideren esto como el pre-Index
// Importar tailwind para que se pueda usar en todas las paginas siguientes
import "./globals.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

// Iniciar la pagina
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="text-black bg-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}