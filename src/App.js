import { React, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";
import "./App.css";

function App() {
  const [dateDisplay, setDateDisplay] = useState("2022");

  useEffect(() => {
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    if (dateDisplay !== `${currentYear}`) {
      setDateDisplay(`${dateDisplay}-${currentYear}`);
    }
  }, [dateDisplay]);

  const EntryArticle = (props) => {
    return (
      <div className="row d-flex justify-content-center">
        <article className="entry col-lg-8 align-center" align="center">
          <p>{props.entry}</p>
          <footer>
            <h6>{props.author}</h6>
            <p>{props.footer}</p>
          </footer>
        </article>
      </div>
    );
  };

  const dictData = [
    {
      caption: "昭和時代",
      entries: [
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
      ],
    },
    {
      caption: "和",
      entries: [
        {
          text: "Huzur, harmoni.",
          author: "jmdict-tr-bot",
          footer:
            "Kaynak: blalbalblabla.lalala | Kaynak gösterildiği takdirde kullanımı serbesttir.",
        },
        {
          text: "Japonların Çinlilerin taktığı 'cüce' Kanjisinden soğuduklarında kendilerini tanımlamak için seçtikleri Kanji.",
          author: "gg",
          footer: "",
        },
        {
          text: "Showa ve Reiwa dönem isimlerinde yer alır",
          author: "gg",
          footer: "",
        },
      ],
    },
    {
      caption: "昭昭",
      entries: [
        {
          text: "Temiz, parlak, apaçık.",
          author: "jmdict-tr-bot",
          footer:
            "Kaynak: blalbalblabla.lalala | Kaynak gösterildiği takdirde kullanımı serbesttir.",
        },
      ],
    },
  ];

  function Search() {
    const formSubmitted = (event) => {
      event.preventDefault();
    };

    return (
      <div style={{ padding: 20 }}>
        <h2>Ara</h2>
        <div className="container center">
          <form onSubmit={formSubmitted}>
            <input />
            <button>Ara</button>
          </form>
        </div>
      </div>
    );
  }

  function Login() {
    const formSubmitted = (event) => {
      event.preventDefault();
    };

    return (
      <div style={{ padding: 20 }}>
        <h2>Giriş Yap</h2>
        <div className="container center">
          <form onSubmit={formSubmitted}>
            <label>Kullanıcı adı</label>
            <input />
            <br />
            <label>Şifre</label>
            <input />
            <br />
            <button>Giriş yap</button>
            <Link to="/kayit" style={{ padding: 5 }}>
              Kayıt ol
            </Link>
          </form>
        </div>
      </div>
    );
  }

  function Register() {
    const formSubmitted = (event) => {
      event.preventDefault();
    };

    return (
      <div style={{ padding: 20 }}>
        <h2>Yeni Üye Kaydı</h2>
        <div className="container center">
          <form onSubmit={formSubmitted}>
            <label>Kullanıcı adı</label>
            <input />
            <br />
            <label>Şifre</label>
            <input />
            <br />
            <button>Kayıt ol</button>
            <Link to="/uye" style={{ padding: 5 }}>
              Üye girişi
            </Link>
          </form>
        </div>
      </div>
    );
  }

  const BlogPosts = {
    1: {
      title: "Nitoji ve Japonesk",
      date: "2022-11-26 10:03",
      description: "",
    },
    2: {
      title: "Second Blog Post",
      description: "Hello React Router v6",
    },
  };

  function Posts() {
    return (
      <div style={{ padding: 20 }}>
        <h2>Japonesk</h2>
        <Outlet />
      </div>
    );
  }

  function PostLists() {
    return (
      <ul>
        {Object.entries(BlogPosts).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/japonesk/${slug}`}>
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  function Post() {
    const { slug } = useParams();
    const post = BlogPosts[slug];

    const { title, description } = post;

    return (
      <div style={{ padding: 20 }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

  const DictEntries = {
    1: {
      title: "Nitoji ve Japonesk",
      date: "2022-11-26 10:03",
      description: "",
    },
    2: {
      title: "Second Blog Post",
      description: "Hello React Router v6",
    },
  };

  function Entries() {
    return (
      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    );
  }

  function EntryLists() {
    return (
      <ul>
        {Object.entries(DictEntries).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/dict/${slug}`}>
              <h3 className="dict">{dictData[slug].caption}</h3>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  function Entry() {
    const { slug } = useParams();
    const entry = DictEntries[slug];

    const { title, description } = entry;

    return (
      <>
        <div style={{ padding: 20 }} className="dict-entry">
          <h1>{dictData[slug].caption}</h1>
          <p>
            {dictData[slug].entries.map((e) => (
              <div className="entry">
                {e.text}
                <div className="entry-author">{e.author}</div>
              </div>
            ))}
          </p>
        </div>
        <div className="dict-new">
          <h2>Yeni Girdi</h2>
          <textarea />
          <button>Gönder</button>
        </div>
      </>
    );
  }

  return (
    <Router>
      <header className="fixed-top">
        <nav style={{ margin: 10 }}>
          <span className="text-start">
            <Link to="/" className="logo" style={{ padding: 5 }}>
              日土辞書
            </Link>

            <Link to="/japonesk" style={{ padding: 5 }}>
              Japonesk
            </Link>
          </span>
          <span className="text-end">
            <Link to="/ara" style={{ padding: 5 }}>
              Arama
            </Link>

            <Link to="/yeni" style={{ padding: 5 }}>
              Başlık aç
            </Link>

            <Link to="/uye" style={{ padding: 5 }}>
              Üye girişi
            </Link>

            <Link to="/kayit" style={{ padding: 5 }}>
              Kayıt ol
            </Link>
          </span>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Entries />}>
          <Route path="" element={<EntryLists />} />
          <Route path="/dict/:slug" element={<Entry />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route path="/uye" element={<Login />} />
        <Route path="/kayit" element={<Register />} />
        <Route path="japonesk" element={<Posts />}>
          <Route path="" element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>
      </Routes>

      <footer className="main-footer">
        All rights reserved. Nitoji (c) {dateDisplay}.{" "}
        <a href="https://gguilt.com">gguilt</a>
      </footer>
    </Router>
  );
}

export default App;
