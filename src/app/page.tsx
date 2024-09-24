import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <h1>Nitoji Project</h1>

        <nav>
          <Link href="/">Ana sayfa</Link> | <Link href="/dict">Sözlük</Link> |{" "}
          <Link href="/resources">Kaynaklar</Link>
        </nav>
      </header>
      <main></main>
      <footer>
        Nitoji (c) 2022-2024 <a href="https://gokay.works">Gökay Gültekin</a> |{" "}
        <a href="https://github.com/naphteine/nitoji">Source</a>
      </footer>
    </>
  );
}
