import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import styles from "./Layout.module.css";

import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daly Games - Descubra jogos incríveis para se divertir",
  description: "Mais de 10 mil jogos separados e organizados",
  keywords: ["games", "jogos", "steam"],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/preview.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
