import Link from "next/link";
import styles from "../styles/Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                日土辞書
            </div>

            <div className={styles.links}>
                <Link className={styles.link} href="/giris">Giriş</Link>
                <Link className={styles.link} href="/kayit">Kayıt</Link>
            </div>
        </header>
    )
}

export default Header;