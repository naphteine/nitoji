import Link from 'next/link';
import { BiSearchAlt } from "react-icons/bi"

import styles from '@/styles/Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>日土辞書</Link>

            <nav>
                <Link href="/konu" className={styles.link}>
                    Konular
                    <BiSearchAlt size={16} style={{ margin: 5 }} />
                </Link>
            </nav>
        </header>
    )
}

export default Header;

/*

            <Link className={styles["link"]} to="/konular">
              Konular
              
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
*/