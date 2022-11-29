import { React, useEffect, useState } from "react";
import { FaRegUserCircle, FaRegNewspaper } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";

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
  const [jwtToken, setJwtToken] = useState("haha");

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

  const dictData = {
    昭和時代: {
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
    和: {
      entries: [
        {
          text: "Huzur, harmoni.",
          author: "jmdict-tr-bot",
          detail: "2022-11-27 22:22",
          footer:
            "Kaynak: blalbalblabla.lalala | Kaynak gösterildiği takdirde kullanımı serbesttir.",
        },
        {
          text: "Japonların Çinlilerin taktığı 'cüce' Kanjisinden soğuduklarında kendilerini tanımlamak için seçtikleri Kanji.",
          author: "gg",
          detail: "2022-11-27 22:23",
          footer: "",
        },
        {
          text: "Showa ve Reiwa dönem isimlerinde yer alır",
          author: "gg",
          detail: "2022-11-27 22:24",
          footer: "",
        },
      ],
    },
    昭昭: {
      entries: [
        {
          text: "Temiz, parlak, apaçık.",
          author: "jmdict-tr-bot",
          footer:
            "Kaynak: blalbalblabla.lalala | Kaynak gösterildiği takdirde kullanımı serbesttir.",
        },
      ],
    },
  };

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
        {Object.entries(dictData).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/dict/${slug}`}>
              <h3 className="dict">{slug}</h3>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  function NewEntryField() {
    return (
      <div className="dict-new">
        <form onSubmit={newEntrySubmitted}>
          <textarea />
          <button>Gönder</button>
        </form>
      </div>
    );
  }

  function newEntrySubmitted(event) {
    event.preventDefault();
    dictData[1].entries.append(event.target.value);
  }

  function Entry() {
    const { slug } = useParams();
    const entry = dictData[slug];

    const { title, description } = entry;

    return (
      <>
        <div style={{ padding: 20 }} className="dict-entry">
          <h1>{slug}</h1>
          <em>
            訓読み: やわ.らぐ、 やわ.らげる、 なご.む、 なご.やか、 あ.える
          </em>
          <br />
          <em>音読み: ワ、 オ、 カ</em>
          <br />
          <span key={"jlpt-n3"} className="badge bg-secondary me-2">
            jlpt-n3
          </span>
          <span key={"常用"} className="badge bg-secondary me-2">
            常用
          </span>
          <span key={"grade-3"} className="badge bg-secondary me-2">
            grade-3
          </span>
          <hr />
          {jwtToken && <NewEntryField />}
          <div>
            {dictData[slug].entries.map((e) => (
              <div className="entry">
                {e.text}
                <div className="entry-author">{e.author}</div>
                <div className="entry-detail">{e.detail}</div>
              </div>
            ))}
          </div>
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

            <a href="https://japonesk.nitoji.com" style={{ padding: 5 }}>
              Japonesk <FaRegNewspaper size={24} style={{ margin: 5 }} />
            </a>
          </span>
          <span className="text-end">
            {!jwtToken && (
              <Link to="/uye" style={{ padding: 5 }}>
                Üye
                <FaRegUserCircle size={24} style={{ margin: 5 }} />
              </Link>
            )}

            {jwtToken && (
              <>
                <Link to="/yeni" style={{ padding: 5 }}>
                  Başlık aç
                  <BiMessageSquareAdd size={24} style={{ margin: 5 }} />
                </Link>

                <Link to="/cikis" style={{ padding: 5 }}>
                  Çıkış
                  <HiLogout size={24} style={{ margin: 5 }} />
                </Link>
              </>
            )}
          </span>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Entries />}>
          <Route path="" element={<EntryLists />} />
          <Route path="/dict/:slug" element={<Entry />} />
        </Route>
        <Route path="/uye" element={<Login />} />
        <Route path="/kayit" element={<Register />} />
      </Routes>

      <footer className="main-footer">
        All rights reserved. Nitoji (c) {dateDisplay}.{" "}
        <a href="https://gguilt.com">gguilt</a>
      </footer>
    </Router>
  );
}

export default App;
