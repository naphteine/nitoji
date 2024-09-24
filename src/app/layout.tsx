import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nitoji • 日土辞書",
  description: "Türkçe-Japonca Online Sözlük",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <h1>
            <Link href="/">Nitoji Project</Link>
          </h1>

          <nav>
            <Link href="/">Sözlük</Link> | <Link href="/news">Haberler</Link> |{" "}
            <Link href="/culture">Kültür</Link> |{" "}
            <Link href="/resources">Kaynaklar</Link> |{" "}
            <Link href="furiyomi.gokay.works">Furiyomi</Link>
          </nav>
        </header>
        {children}
        <footer className="text-center">
          Nitoji (c) 2022-2024 <a href="https://gokay.works">Gökay Gültekin</a>{" "}
          | <a href="https://github.com/naphteine/nitoji">Source</a>
        </footer>
      </body>
      <Script
        defer
        src="https://umi.gokay.works/script.js"
        data-website-id="81eac03e-597f-48e0-a768-dff270c75ac2"
      ></Script>
    </html>
  );
}
