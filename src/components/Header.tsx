import Link from "next/link";
import styles from "../styles/Header.module.css";
import pb from "lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
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
    router.push("/");
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <>
            <p>Üye: {username}</p>
            <button onClick={logout}>Çıkış</button>
            <Link href="/new">Yeni</Link>
          </>
        ) : (
          <>
            <Link href="/login">Giriş yap</Link>
          </>
        )}
      </nav>

      <div className={styles.logo}>
        <Link href="/" className={styles.logo_link}>
          日土辞書
        </Link>
      </div>
    </header>
  );
}
