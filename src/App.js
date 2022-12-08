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
import { FaRegUserCircle, FaRegNewspaper } from "react-icons/fa";
import { BiMessageSquareAdd, BiSearchAlt } from "react-icons/bi";
import { HiLogout, HiAdjustments } from "react-icons/hi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import styles from "./App.module.css";
import jwt from "jwt-decode";

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
            <Link to="/" className={styles["logo"]} style={{ padding: 5 }}>
              日土辞書
            </Link>

            <a href="https://japonesk.nitoji.com" style={{ padding: 5 }}>
              Japonesk <FaRegNewspaper size={16} style={{ margin: 5 }} />
            </a>

            <Link to="/konular" style={{ padding: 5 }}>
              Konular
              <BiSearchAlt size={16} style={{ margin: 5 }} />
            </Link>
          </span>

          <span className="text-end">
            {jwtToken === "" ? (
              <Link to="/giris" style={{ padding: 5 }}>
                Üye
                <FaRegUserCircle size={16} style={{ margin: 5 }} />
              </Link>
            ) : (
              <>
                <Link to="/yeni" style={{ padding: 5 }}>
                  Başlık aç
                  <BiMessageSquareAdd size={16} style={{ margin: 5 }} />
                </Link>

                <Link to="/profil" style={{ padding: 5 }}>
                  Profil
                  <RiAccountPinCircleFill size={16} style={{ margin: 5 }} />
                </Link>

                <Link to="/" onClick={logOut} style={{ padding: 5 }}>
                  Çıkış
                  <HiLogout size={16} style={{ margin: 5 }} />
                </Link>
              </>
            )}

            {jwtToken && jwt(jwtToken).role && jwt(jwtToken).role === "mod" &&
              <Link to="/mod" style={{ padding: 5 }}>
                <b>Mod Paneli</b>
                <HiAdjustments size={16} style={{ margin: 5 }} />
              </Link>
            }
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
      <footer className={styles["main-footer"]}>
        Her hakkı saklıdır. Nitoji (c) {dateDisplay}.{" "}
        <a href="https://gguilt.com">gguilt</a>
      </footer>
    </div>
  );
}

export default App;