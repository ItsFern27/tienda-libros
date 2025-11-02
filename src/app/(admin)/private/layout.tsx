// Se 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white bg-black">
      <header>COSA DE PRIVATE</header>
      <main>{children}</main>
      <footer>ADMIN PRIVADO</footer>
    </div>
  );
}
