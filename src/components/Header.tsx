import Button from "./Button";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>日土辞書</div>

            <div className={styles.search}>
                <SearchBar />
            </div>

            <div className={styles.buttons}>
                <Button>Giriş</Button>
                <Button>Kayıt</Button>
            </div>
        </header>
    )
}