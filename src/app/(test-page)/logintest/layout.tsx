// Se 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white bg-black">
      <main>{children}</main>
    </div>
  );
}
