import Button from "./Button";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>日土辞書</div>

            <div className={styles.buttons}>
                <Button>Giriş</Button>
                <Button>Kayıt</Button>
            </div>
        </header>
    )
}