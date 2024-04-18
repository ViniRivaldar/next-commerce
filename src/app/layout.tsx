import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Hydrate from "./components/Hydrate";


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
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
      <body className={clsx(inter.className, 'bg-slate-700')}>

        <Hydrate>
          <NavBar/>
          <main className="h-screen p-16">
          {children}
          </main>
        </Hydrate>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
