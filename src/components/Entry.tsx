import React from "react";
import { Link } from "react-router-dom";
import styles from "./Entry.module.css";

interface EntryProps {
  date: string;
  text: string;
  id: number;
  author: string;
}
const Entry = (props: EntryProps) => {
  const showDate = new Date(props.date);

  return (
    <>
      <section className={styles["entry"]}>
        <p className={styles.entry_text}>{props.text}</p>
        <footer className={styles["entry-details"]}>
          <Link to={`/profile/${props.id}`}>
            <div className={styles["entry-author"]}>{props.author}</div>
            <div className={styles["entry-date"]}>{showDate.toString()}</div>
          </Link>
        </footer>
      </section>
    </>
  );
};

export default Entry;
