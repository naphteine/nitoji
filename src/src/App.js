import { React, useEffect, useState, useCallback } from "react";
import {
  Link,
  Outlet,
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

  useEffect(() => {
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
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="container">
      <header className="fixed-top">
        <nav style={{ margin: 10 }}>
          <span className="text-start">
            <Link to="/" className={styles["logo"]} style={{ padding: 5 }}>
              日土辞書
            </Link>

            <a className={styles["link"]} href="https://japonesk.nitoji.com">
              Japonesk <FaRegNewspaper size={16} style={{ margin: 5 }} />
            </a>

            <Link className={styles["link"]} to="/konular">
              Konular
              <BiSearchAlt size={16} style={{ margin: 5 }} />
            </Link>
          </span>

          <span className="text-end">
            {jwtToken === "" ? (
              <Link className={styles["link"]} to="/giris">
                Kayıt/Giriş
                <FaRegUserCircle size={16} style={{ margin: 5 }} />
              </Link>
            ) : (
              <>
                <Link className={styles["link"]} to="/yeni">
                  Başlık aç
                  <BiMessageSquareAdd size={16} style={{ margin: 5 }} />
                </Link>

                <Link to="/profil" className={styles["link"]}>
                  Profil
                  <RiAccountPinCircleFill size={16} style={{ margin: 5 }} />
                </Link>

                <Link to="/" onClick={logOut} className={styles["link"]}>
                  Çıkış
                  <HiLogout size={16} style={{ margin: 5 }} />
                </Link>
              </>
            )}

            {jwtToken && jwt(jwtToken).role && jwt(jwtToken).role === "mod" && (
              <Link to="/mod" className={styles["link"]}>
                <b>Mod Paneli</b>
                <HiAdjustments size={16} style={{ margin: 5 }} />
              </Link>
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
      <footer className={styles["main-footer"]}>
        Her hakkı saklıdır. Nitoji (c) 2022-2023. <a href="https://gokaygultekin.dev">Gökay Gültekin</a>
      </footer>
    </div>
  );
}

export default App;
