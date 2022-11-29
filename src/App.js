import { React, useEffect, useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";

import Alert from "./components/Alert";
import FeatherIcon from "feather-icons-react";
import { FaRegUserCircle, FaRegNewspaper } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import "./App.css";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");
  const [tickInterval, setTickInterval] = useState();
  const [dateDisplay, setDateDisplay] = useState("2022");

  const navigate = useNavigate();

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };

    fetch(`${process.env.REACT_APP_BACKEND}/logout`, requestOptions)
      .catch((error) => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });

    navigate("/login");
  };

  const toggleRefresh = useCallback(
    (status) => {
      console.log("clicked");

      if (status) {
        console.log("turning on ticking");
        let i = setInterval(() => {
          const requestOptions = {
            method: "GET",
            credentials: "include",
          };

          fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log("user is not logged in");
            });
        }, 600000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(
    () => {
      if (jwtToken === "") {
        const requestOptions = {
          method: "GET",
          credentials: "include",
        };

        fetch(`${process.env.REACT_APP_BACKEND}/refresh`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              setJwtToken(data.access_token);
              toggleRefresh(true);
            }
          })
          .catch((error) => {
            console.log("user is not logged in", error);
          });
      }

      const newDate = new Date();
      const currentYear = newDate.getFullYear();
      if (dateDisplay !== `${currentYear}`) {
        setDateDisplay(`${dateDisplay}-${currentYear}`);
      }
    },
    [jwtToken, toggleRefresh],
    dateDisplay
  );

  return (
    <div className="container">
      <header className="fixed-top">
        <nav style={{ margin: 10 }}>
          <span className="text-start">
            <Link to="/" className="logo" style={{ padding: 5 }}>
              日土辞書
            </Link>

            <a href="https://japonesk.nitoji.com" style={{ padding: 5 }}>
              Japonesk <FaRegNewspaper size={16} style={{ margin: 5 }} />
            </a>
          </span>
          <span className="text-end">
            {jwtToken === "" ? (
              <Link to="/uye" style={{ padding: 5 }}>
                Üye
                <FaRegUserCircle size={16} style={{ margin: 5 }} />
              </Link>
            ) : (
              <>
                <Link to="/yeni" onClick={logOut} style={{ padding: 5 }}>
                  Başlık aç
                  <BiMessageSquareAdd size={16} style={{ margin: 5 }} />
                </Link>

                <Link to="/cikis" style={{ padding: 5 }}>
                  Çıkış
                  <HiLogout size={16} style={{ margin: 5 }} />
                </Link>
              </>
            )}
          </span>
        </nav>
      </header>

      <div className="row">
        <div className="col-12">
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
      <footer className="main-footer">
        All rights reserved. Nitoji (c) {dateDisplay}.{" "}
        <a href="https://gguilt.com">gguilt</a>
      </footer>
    </div>
  );
}

export default App;

/*

function App() {
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
      

      <Routes>
        <Route path="/" element={<Entries />}>
          <Route path="" element={<EntryLists />} />
          <Route path="/dict/:slug" element={<Entry />} />
        </Route>
        <Route path="/uye" element={<Login />} />
        <Route path="/kayit" element={<Register />} />
      </Routes>

      
    </Router>
  );
}

export default App;

*/
