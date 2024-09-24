import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <h1>
          <Link href="/">Nitoji Project</Link>
        </h1>

        <nav>
          <Link href="/">Sözlük</Link> | <Link href="/news">Haberler</Link> |{" "}
          <Link href="/">Dil ve Kültür</Link> |{" "}
          <Link href="/resources">Kaynaklar</Link> |{" "}
          <Link href="furiyomi.gokay.works">Furiyomi</Link>
        </nav>
      </header>
      <main className="my-20 text-center">
        <input type="text" name="search" id="search" />
        <input type="button" value="Ara" />
      </main>
      <footer className="text-center">
        Nitoji (c) 2022-2024 <a href="https://gokay.works">Gökay Gültekin</a> |{" "}
        <a href="https://github.com/naphteine/nitoji">Source</a>
      </footer>
    </>
  );
}
