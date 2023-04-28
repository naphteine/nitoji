import Head from "next/head";
import { Inter } from "next/font/google";

import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const initDictData = [
    {
      id: 0,
      kanji: true,
      ruby: [
        {
          id: 0,
          body: "日",
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
      ruby: [{ body: "漢" }],
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
    {
      id: 3,
      kanji: false,
      ruby: [
        {
          id: 0,
          body: "明",
          text: "あ",
        },
        {
          id: 1,
          body: "日",
          text: "した",
        },
      ],
      reading: "Ashita",
      tags: ["jlpt n5", "isim", "常用"],
      tr: ["Yarın"],
    },
    {
      id: 4,
      kanji: true,
      ruby: [{ body: "明" }],
      tags: ["kanji", "jlpt n4", "常用"],
      tr: ["Aydınlık", "ışık"],
      kun: [
        "あ.かり",
        " あか.るい",
        " あか.るむ",
        " あか.らむ",
        " あき.らか",
        " あ.ける",
        " -あ.け",
        " あ.く",
        " あ.くる",
        " あ.かす",
      ],
      on: ["メイ", "ミョウ", "ミン"],
    },
  ];

  const [dictData, setDictData] = useState(initDictData);

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

      <main className={styles.main}></main>

      <footer className={styles.footer}>
        Tüm hakları saklıdır. Nitoji &copy; 2022-2023.
        <a href="https://www.gokaygultekin.dev">GG</a>
      </footer>
    </>
  );
}
