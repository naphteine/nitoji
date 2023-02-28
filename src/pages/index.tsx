import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dictData = [
    {
      id: 0,
      kanji: true,
      ruby: [
        {
          id: 0,
          body: "日",
          text: "にち",
        },
      ],
      reading: "nichi",
      tags: ["jlpt n5", "常用", "grade 1"],
      kun: ["ひ", "-び", "-か"],
      on: ["ニチ", "ジツ"],
      tr: ["Pazar günü", "Japonya", "Gün sayacı", "Ayın n'inci günü"],
    },
    {
      id: 1,
      kanji: true,
      ruby: [
        {
          id: 0,
          body: "漢",
          text: "かん",
        },
      ],
      reading: "kan",
      tags: ["jlpt n4", "常用", "grade 3"],
      on: ["カン"],
      tr: ["Çin", "Han Hanedanlığı (M.Ö. 202 - M.S. 220)"],
    },
    {
      id: 2,
      kanji: false,
      ruby: [
        {
          id: 0,
          body: "漢",
          text: "かん",
        },
        {
          id: 1,
          body: "字",
          text: "じ",
        },
      ],
      reading: "Kanji",
      tags: ["jlpt n5", "isim", "常用"],
      tr: ["Çin karakterleri", "Han Hanedanlığı yazım sistemi"],
    },
  ];

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
          {dictData.map((dict) => {
            return (
              <article
                key={dict.id}
                className={dict.kanji ? styles.kanjiItem : styles.captionItem}
              >
                <header title={dict.reading}>
                  {dict.ruby.map((ruby) => {
                    return (
                      <ruby key={ruby.id}>
                        {ruby.body}

                        <rt>{ruby.text}</rt>
                      </ruby>
                    );
                  })}
                </header>
                <div>
                  <div className={styles.badgeList}>
                    {dict.tags.map((tag) => {
                      return (
                        <span key={tag} className={styles.badge}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  {dict.kun && (
                    <span>
                      <b>Kun: </b>
                      {dict.kun.map((kuns) => {
                        return <span key={kuns}>{kuns} </span>;
                      })}
                    </span>
                  )}

                  {dict.kun && dict.on && <br />}

                  {dict.on && (
                    <span>
                      <b>On: </b>
                      {dict.on.map((ons) => {
                        return <span key={ons}>{ons} </span>;
                      })}
                    </span>
                  )}

                  <ol>
                    {dict.tr.map((translation) => {
                      return <li key={translation}>{translation}</li>;
                    })}
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        Tüm hakları saklıdır. Nitoji v3.0 &copy; 2022-2023.
        <a href="https://www.gokaygultekin.dev">GG</a>
      </footer>
    </>
  );
}
