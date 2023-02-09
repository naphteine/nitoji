import styles from "../styles/Button.module.css";
import { ButtonInterface } from "@/types";

const Button = (props: ButtonInterface) => {
    return (
        <button className={styles.button} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;