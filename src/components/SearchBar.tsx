import styles from "./SearchBar.module.css";

export default function SearchBar() {
    return (
        <div className={styles.search}>
            <input className={styles.bar} />
            <button className={styles.button}>Ara</button>
        </div>
    )
}