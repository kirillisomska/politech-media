import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ПолитехМедиа - Главная",
  description: "ПолитехМедиа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <Providers>
        <body className={`${inter.className} flex min-h-full flex-col m-0`}>
          <div className="shadow-md">
            <Header />
          </div>
          <div className="w-full bg-background py-10 flex-grow">{children}</div>
          <div className="shadow-md">
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  );
}
