import Link from "next/link";
import styles from "../styles/Header.module.css";
import pb from "lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  RiAccountBoxFill,
  RiChatNewFill,
  RiLoginBoxFill,
  RiLogoutBoxFill,
  RiLogoutCircleFill,
  RiNewspaperFill,
} from "react-icons/ri";

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
      <div className={styles.logo}>
        <RiNewspaperFill size={24} title="Japon Çukuru" />

        <Link href="/" className={styles.logo_link}>
          日土辞書
        </Link>

        <div className={styles.buttons}>
          {isLoggedIn ? (
            <>
              <RiAccountBoxFill size={24} title={username} />
              <RiLogoutCircleFill
                size={24}
                onClick={logout}
                title="Çıkış yap"
              />{" "}
              <Link href="/new">
                <RiChatNewFill size={24} title="Yeni başlık" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <RiLoginBoxFill size={24} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
