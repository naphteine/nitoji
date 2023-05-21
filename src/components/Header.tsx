import Link from "next/link";
import PocketBase from "pocketbase";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const pb = new PocketBase("http://127.0.0.1:8090");
  const { push } = useRouter();

  function logout() {
    pb.authStore.clear();
    push("/");
  }

  useEffect(() => {
    setLoggedIn(pb.authStore.isValid);
    setUsername(pb.authStore.model?.username);
    setName(pb.authStore.model?.name);
    setAvatarUrl(
      `http://127.0.0.1:8090/api/files/${pb.authStore.model?.collectionId}/${pb.authStore.model?.id}/${pb.authStore.model?.avatar}`
    );
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        日土辞書
      </Link>

      {loggedIn ? (
        <>
          <h6>
            {username} {name}
          </h6>
          <img alt={`profile photo of ${username}`} src={avatarUrl} />
          <button onClick={logout}>Logout</button>
          <Link href="/new">Yeni başlık</Link>
        </>
      ) : (
        <Link href="/login">Giriş</Link>
      )}
    </header>
  );
}
