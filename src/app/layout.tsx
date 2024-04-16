import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import clsx from "clsx";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next E-commerce 14",
  description: "Next E-commerce Utilizando a Versão 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={clsx(inter.className, 'bg-slate-700')}>

        <NavBar/>

        <main className="h-screen p-16">
         {children}
        </main>
      </body>
    </html>
  );
}
