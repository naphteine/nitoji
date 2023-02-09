import React from "react";
import styles from "../styles/Card.module.css";
import { CardInterface } from "@/types";

const Card = (props: CardInterface) => {
    return (
        <div className={styles.card}>
            <div className={styles.container}>
                {props.children}
            </div>
        </div>
    )
}

export default Card;