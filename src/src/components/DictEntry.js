import React from "react";
import { Link } from "react-router-dom";
import styles from "./DictEntry.module.css";

const DictEntry = props => {
    return (

        <Link className={styles.dict_link} to={props.link}>
            <div className={styles.dict_entry}>
                {props.children}
            </div>
        </Link>
    )
}

export default DictEntry;