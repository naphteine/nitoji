import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import { supabase } from "../lib/supabase";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export const getStaticProps = async () => {
  const { data: entries } = await supabase.from('entries').select('*').order('created_at', { ascending: false }).limit(20)

  return {
    props: {
      entries,
    },
  };
};

export default function Home({ entries }: [""]) {

  const getCaptionTitle = (id: number) => {
    const data = supabase.from('captions').select('title').match({ id: id });
    console.log(data);
    return "HELLO";
  }

  return (
    <>
      <Head>
        <title>Nitoji</title>
        <meta name="description" content="Nitoji Türkçe-Japonca Sözlük" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.entrylist}>
          <h2>Son entryler</h2>

          {entries.map((entry: { caption_id: number; entry: string; }) => {
            return <div className={styles.entrylist_item}><Link href={`/dict/${entry.caption_id}`}>{getCaptionTitle(entry.caption_id)} {entry.entry}</Link></div>
          })}
        </div>
      </main>

      <Footer />
    </>
  )
}
