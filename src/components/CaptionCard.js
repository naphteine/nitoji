import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/CaptionCard.module.css";
import { supabase } from "../lib/supabase";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns/";

const CaptionCard = ({ data, handleDelete }) => {
  return (
    <div className={styles.captionContainer}>
      {data?.map((item) => (
        <div key={item.id} className={styles.container}>
          <p className={styles.title}>
            {" "}
            Başlık: {""}
            {item.title}
          </p>
          <p className={styles.desc}>
            {" "}
            Okunuş: {"  "}
            {item.loads}
          </p>
          <p className={styles.translation}>Türkçe: {item.reps}</p>
          <p className={styles.time}>
            created:{" "}
            {formatDistanceToNow(new Date(item.inserted_at), {
              addSuffix: true,
            })}
          </p>

          <div className={styles.buttons}>
            <Link className={styles.edit} href={`/edit/${item.id}`}>
                <FiEdit />
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className={styles.delete}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaptionCard;