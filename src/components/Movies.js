import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/captions`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Başlıklar</h2>
      <hr />
      <table className="table table-striped table-hover">
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/dict/${m.id}`}>{m.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
