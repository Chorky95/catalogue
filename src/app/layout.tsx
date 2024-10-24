export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body" suppressHydrationWarning>
          {children}
      </body>
    </html>
  );
}
