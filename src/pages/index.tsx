import Head from "next/head";
import PocketBase, { BaseModel, ListResult, Record } from "pocketbase";

import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState<ListResult>();

  async function getAll() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const resultList = await pb.collection("dict").getList(1, 50, {
      filter: "",
    });

    setUserData(resultList);
  }

  useEffect(() => {
    getAll();
  }, []);

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
        {userData &&
          userData.items &&
          userData.items.map((e) => (
            <div key={e.id}>
              {e.japanese} ({e.jlpt}) - {e.turkish}
            </div>
          ))}
      </main>

      <footer className={styles.footer}>
        Tüm hakları saklıdır. Nitoji &copy; 2022-2023.
        <a href="https://www.gokaygultekin.dev">GG</a>
      </footer>
    </>
  );
}
