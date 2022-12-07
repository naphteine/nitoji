import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import EntryArea from "./EntryArea";
import styles from "./Caption.module.css";
import Entry from "./Entry";

const Caption = () => {
  const [caption, setCaption] = useState({});
  const [entry, setEntry] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  let { id } = useParams();
  const { jwtToken } = useOutletContext();
  const navigate = useNavigate();

  const onChange = (event) => {
    setNewEntry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newEntry.length <= 0) {
      Swal.fire({
        title: "Boş girdi gönderemezsiniz!",
        text: "",
        icon: "error",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Geri dön",
      });
    } else {
      console.log(caption.id);
      console.log(newEntry);

      // passed validation, so save changes
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken);

      // We're adding new entry. We would use PATCH if we were updating
      let method = "PUT";

      const requestBody = {
        entry: newEntry,
        caption_id: caption.id,
      };

      let requestOptions = {
        body: JSON.stringify(requestBody),
        method: method,
        headers: headers,
        credentials: "include",
      };

      fetch(
        `${process.env.REACT_APP_BACKEND}/user/entries/captions/${caption.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log("heyoo");

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
              method: "GET",
              headers: headers,
            };

            fetch(`${process.env.REACT_APP_BACKEND}/captions/${id}`, requestOptions)
              .then((response) => response.json())
              .then((data) => {
                setCaption(data);
              })
              .catch((err) => {
                console.log(err);
              });

            fetch(
              `${process.env.REACT_APP_BACKEND}/entries/captions/${id}`,
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                if (data !== null) {
                  setEntry(data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/captions/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCaption(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      `${process.env.REACT_APP_BACKEND}/entries/captions/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setEntry(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (caption.tags) {
    caption.tags = Object.values(caption.tags);
    console.log(caption.tags);
  } else {
    caption.tags = [];
  }

  return (
    <div style={{ padding: 20 }} className={styles["dict-entry"]}>
      <h1 className={styles["dict-header"]}>{caption.title}</h1>
      {caption.description && <em>{caption.description}</em>}
      <br />
      {caption.tags.map((t) => (
        <span key={t.tag} className="badge bg-secondary me-2">
          {t.tag}
        </span>
      ))}
      <hr />
      {jwtToken !== "" && (
        <>
          <EntryArea onChange={onChange} onSubmit={handleSubmit} />
          <hr />
        </>
      )}

      <div className={styles["entry-list"]}>
        {entry.map((e) => (
          <Entry text={e.entry} id={e.user_id} author={e.user_name} date={e.created_at} />
        ))}
      </div>
    </div>
  );
};

export default Caption;
