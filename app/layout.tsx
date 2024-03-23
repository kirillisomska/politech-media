import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ПолитехМедиа | Омск",
  description: 'Портфолио мультимедийных проектов, созданных командой творческого конструкторского бюро "Политех/Медиа". "Политех/Медиа" - сообщество креативных ИТ-шников, студентов и выпускников Омского политеха.',
  keywords: 'Политехмедиа, политех медиа, политех\медиа, политех/медиа, политех-медиа, НИЛ ПолитехМедиа, СКБ Политех Медиа, креативные индустрии, креативная команда, лаборатория креативных идей, инфографика омск, mapping Омск, Видеомэппинг Омск, Видеомэппинг, 3D графика, 3Д графика Омск'
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
