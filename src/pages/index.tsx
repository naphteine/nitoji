import Head from "next/head";
import PocketBase, { BaseModel, ListResult, Record } from "pocketbase";

import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import DictEntry from "@/components/DictEntry";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  const [dictData, setDictData] = useState<ListResult>();

  async function getAll() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const resultList = await pb.collection("dict").getList(1, 20, {
      expand: "user",
      filter: "",
    });

    setDictData(resultList);
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

      <Header />

      <main className={styles.main}>
        {dictData?.items?.map((e) => (
          <DictEntry key={e.id} data={e} />
        ))}
      </main>

      <Footer />
    </>
  );
}
