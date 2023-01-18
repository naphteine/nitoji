import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import { supabase } from "../lib/supabase";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  const { data: captions } = await supabase.from('captions').select('*').order('created_at', { ascending: false }).limit(20)
  const { data: entries } = await supabase.from('entries').select('*').order('created_at', { ascending: false }).limit(20)

  return {
    props: {
      captions,
      entries,
    },
  };
};

export default function Home({ captions, entries }) {
  console.log(entries);

  return (
    <>
      <Head>
        <title>Nitoji</title>
        <meta name="description" content="Nitoji Türkçe-Japonca Sözlük" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className={styles.main}>

        <SearchBar />

        <div className={styles.captionlist}>
          <h1 className="text-3xl font-bold underline">Son açılan başlıklar</h1>

          {captions.map((caption) => {
            return <div className={styles.captionlist_item}><Link href={`/dict/${caption.id}`}>{caption.title}</Link></div>
          })}
        </div>

        <div className={styles.entrylist}>
          <h1 className="text-3xl font-bold underline">Son entryler</h1>

          {entries.map((entry) => {
            return <div className={styles.entrylist_item}><Link href={`/dict/${entry.caption_id}`}>{entry.entry}</Link></div>
          })}
        </div>
      </main>

      <Footer />
    </>
  )
}
