import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TopPenoplast",
  description:
    "Изделия из пенопласта. Бесплатное 3D-моделирование. Покажем форму, пропорции и детали будущей фигуры перед изготовлением.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
