import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import { supabase } from "../lib/supabase"

const Header = ({ session }) => {
    const logout = (event) => {
        event.preventDefault();
    }

    return (
        <header className={styles.header}>
            <Link className={styles.logo} href="/">
                日土辞書
            </Link>

            {!session?.user &&
            <div className={styles.links}>
                <Link className={styles.link} href="/giris">Giriş</Link>
                <Link className={styles.link} href="/kayit">Kayıt</Link>
            </div>
            }

            {session?.user &&
                <div className={styles.links}>
                    <Link className={styles.link} href="/baslik">Başlık aç</Link>
                    <button onClick={logout}>Çıkış</button>
                </div>
            }
        </header>
    )
}

export default Header;