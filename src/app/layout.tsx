import type { Metadata } from "next";
import { Manrope, Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-head",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "i-kip — современные измерительные приборы: новости и аналитика",
  description:
    "Новости о новинках мировых производителей измерительных приборов на русском языке и аналитические обзоры: сравнения осциллографов, мультиметров, анализаторов спектра, тепловизоров, разбор метрологии и классов точности.",
  keywords: [
    "измерительные приборы",
    "осциллограф",
    "мультиметр",
    "анализатор спектра",
    "тепловизор",
    "метрология",
    "радиоизмерения",
    "электроизмерения",
    "i-kip",
  ],
  authors: [{ name: "i-kip" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "i-kip — всё о современных измерительных приборах",
    description:
      "Новости производителей на русском языке и глубокая аналитика: сравнения приборов, тесты и метрология.",
    siteName: "i-kip",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${unbounded.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
