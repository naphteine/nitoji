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

  return {
    props: {
      captions,
    },
  };
};

export default function Home({ captions }) {
  return (
    <>
      <Head>
        <title>Nitoji</title>
        <meta name="description" content="Nitoji Türkçe-Japonca Sözlük" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className="text-3xl font-bold underline">Son açılan başlıklar</h1>

        <SearchBar />
        {captions.map((caption) => {
          return <Link href={`/dict/${caption.id}`}><div>{caption.title}</div></Link>
        })}
      </main>

      <Footer />
    </>
  )
}
