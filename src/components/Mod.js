import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import jwt from 'jwt-decode';

const Mod = () => {
    const [movies, setMovies] = useState([]);
    const { jwtToken } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/giris");
            return;
        }

        let user = jwt(jwtToken);

        if (user.role !== "mod" || user.role !== "admin") {
            navigate(`/${user.role}`);
            return;
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + jwtToken);

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/user/captions`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [jwtToken, navigate]);

    return (
        <div>
            <h1>Mod Paneli</h1>
            <hr />
            <table className="table table-striped table-hover">
                <tbody>
                    {movies.map((m) => (
                        <tr key={m.id}>
                            <td>
                                <Link to={`/mod/dict/${m.id}`}>
                                    {m.title}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Mod;