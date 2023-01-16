import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const OneGenre = () => {
  // get prop passed to this component
  const location = useLocation();
  const { genreName } = location.state;

  // set stateful variables
  const [captions, setCaptions] = useState([]);

  // get id from url
  let { id } = useParams();

  // useEffect to get list of movies
  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(
      `${process.env.REACT_APP_BACKEND}/captions/tags/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.message);
        } else {
          setCaptions(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // return jsx
  return (
    <>
      <h2>Konu: {genreName}</h2>
      <hr />

      {captions.length > 0 ? (
        <table className="table table-striped table-hover">
          <tbody>
            {captions.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link to={`/dict/${m.id}`}>{m.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Bu konuda bir başlık bulunamadı!</p>
      )}
    </>
  );
};

export default OneGenre;
