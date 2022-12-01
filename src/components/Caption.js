import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import EntryArea from "./EntryArea";

const Caption = () => {
  const [movie, setMovie] = useState({});
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
      console.log(movie.id);
      console.log(newEntry);

      // passed validation, so save changes
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + jwtToken);

      // We're adding new entry. We would use PATCH if we were updating
      let method = "PUT";

      const requestBody = {
        entry: newEntry,
        caption_id: movie.id,
      };

      let requestOptions = {
        body: JSON.stringify(requestBody),
        method: method,
        headers: headers,
        credentials: "include",
      };

      fetch(
        `${process.env.REACT_APP_BACKEND}/user/entries/captions/${movie.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            navigate(`/dict/${movie.id}`)
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
        setMovie(data);
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

  if (movie.tags) {
    movie.tags = Object.values(movie.tags);
    console.log(movie.tags);
  } else {
    movie.tags = [];
  }

  return (
    <div style={{ padding: 20 }} className="dict-entry">
      <h1>{movie.title}</h1>
      {movie.description && <em>{movie.description.String}</em>}
      <br />
      {movie.tags.map((t) => (
        <span key={t.tag} className="badge bg-secondary me-2">
          {t.tag}
        </span>
      ))}
      <hr />
      {jwtToken !== "" && (<EntryArea onChange={onChange} onSubmit={handleSubmit} />
      )}

      <div>
        {entry.map((e) => (
          <div className="entry">
            {e.entry}
            <div className="entry-author">{e.author}</div>
            <div className="entry-detail">{e.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Caption;
