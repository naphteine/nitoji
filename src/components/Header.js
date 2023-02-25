import Link from "next/link";
import { BiSearchAlt, BiMessageSquareAdd } from "react-icons/bi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

import styles from "@/styles/Header.module.css";

const Header = () => {
  const jwtToken = "gg";

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        日土辞書
      </Link>

      <nav className={styles.nav}>
        <Link href="/konu" className={styles.link}>
          Konular
          <BiSearchAlt size={16} className={styles.icon} />
        </Link>

        {jwtToken === "" ? (
          <Link href="/giris" className={styles.link}>
            Kayıt/Giriş
            <FaRegUserCircle size={16} className={styles.icon} />
          </Link>
        ) : (
          <>
            <Link href="/profil" className={styles.link}>
              Profil
              <RiAccountPinCircleFill size={16} style={{ margin: 5 }} />
            </Link>

            <Link href="/dict" className={styles.link}>
              Başlık aç
              <BiMessageSquareAdd size={16} style={{ margin: 5 }} />
            </Link>

            <Link href="/l" className={styles.link}>
              Çıkış
              <HiLogout size={16} style={{ margin: 5 }} />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
