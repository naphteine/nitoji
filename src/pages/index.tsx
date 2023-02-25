import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Nitoji</title>
        <meta name="description" content="Türkçe Japonca Sözlük Uygulaması" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          日土辞書
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.captionList}>
          <article className={styles.captionItem}>
            <header>
              <ruby>
                漢<rt>かん</rt>
              </ruby>

              <ruby>
                字<rt>じ</rt>
              </ruby>
            </header>
            <div className={styles.badgeList}>
              <span className={styles.badge}>jlpt n5</span>
              <span className={styles.badge}>isim</span>
              <span className={styles.badge}>常用</span>
            </div>
            <b>Türkçe okunuş:</b> Kanji
            <h3>Çeviriler</h3>
            <ol>
              <li>Çin karakterleri</li>
              <li>Han Hanedanlığı yazım sistemi</li>
            </ol>
          </article>
        </div>
      </main>

      <footer className={styles.footer}>
        Tüm hakları saklıdır. Nitoji v3.0 &copy; 2022-2023.
        <a href="https://www.gokaygultekin.dev">GG</a>
      </footer>
    </>
  );
}
