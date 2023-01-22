import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            Her hakkı saklıdır (c) 2022-2023. Nitoji
            <a href="https://gokaygultekin.dev">GG</a>
        </footer>
    );
}