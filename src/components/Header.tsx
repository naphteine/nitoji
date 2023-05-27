import Link from "next/link";
import styles from "../styles/Header.module.css";
import pb from "lib/pocketbase";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setIsLoggedIn(pb.authStore.isValid);
    setUsername(pb.authStore.model?.username);
  }, []);

  function logout() {
    pb.authStore.clear();
    setIsLoggedIn(pb.authStore.isValid);
    setUsername(pb.authStore.model?.username);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <>
            <p>Üye: {username}</p>
            <button onClick={logout}>Çıkış</button>
          </>
        ) : (
          <>
            <Link href="/login">Giriş yap</Link>
          </>
        )}
      </nav>

      <Link href="/" className={styles.logo}>
        日土辞書
      </Link>
    </header>
  );
}
