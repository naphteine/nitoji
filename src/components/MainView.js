import React from "react";
import EntryArticle from "./EntryArticle/EntryArticle";

const entry = [
  {
    text: "Showa Dönemi.",
    author: "jmdict-tr-bot",
    footer:
      "Kaynak: blalbalblabla.lalala | Kaynak gösterildiği takdirde kullanımı serbesttir.",
  },
  {
    text: "Şova dönemi. 25 Aralık 1926-7 Ocak 1989 tarihleri arasında İmparator Hirohito'nun saltanatını kapsayan dönem.",
    author: "gg",
    footer: "",
  },
  {
    text: "İmparator Hirohito'nun (İmparator Showa) saltanat dönemi. Aynı zamanda İkinci Dünya Savaşı ve sonrasını da kapsar.",
    author: "gg",
    footer: "",
  },
];
const MainView = () => {
  return (
    <main>
      <section>
        <h1>昭和時代</h1>

        {entry.map((item) => {
          return (
            <EntryArticle
              entry={item.text}
              author={item.author}
              footer={item.footer}
            />
          );
        })}
      </section>
    </main>
  );
};

export default MainView;
