import styles from "./SearchBar.module.css";

export default function SearchBar() {
    return (
        <>
            <input className={styles.bar} /><button>Ara</button>
        </>
    )
}