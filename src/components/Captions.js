import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./form/Input";

const Captions = () => {
    // set stateful variables
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [fullList, setFullList] = useState([]);

    // perform search
    const performSearch = (term) => {
        const payload = `
        {
            search(titleContains: "${term}") {
                id
                title
            }
        }`;

        const headers = new Headers();
        headers.append("Content-Type", "application/graphql");

        const requestOptions = {
            method: "POST",
            body: payload,
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/search`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let theList = Object.values(response.data.search);
                setMovies(theList);
            })
            .catch(err => { console.log(err) })
    }

    const handleChange = (event) => {
        event.preventDefault();

        const value = event.target.value;
        setSearchTerm(value);

        if (value.length > 0) {
            performSearch(value);
        } else {
            setMovies(fullList);
        }
    }

    // useEffect
    useEffect(() => {
        const payload = `
        {
            list {
                id
                title
                description
            }
        }`;

        const headers = new Headers();
        headers.append("Content-Type", "application/graphql");

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: payload,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/search`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let theList = Object.values(response.data.list);
                setMovies(theList);
                setFullList(theList);
            })
            .catch(err => (console.log(err)))
    }, [])

    return (
        <div>
            <h2>Sözlük</h2>
            <hr />
            <form onSubmit={handleChange}>
                <Input
                    title={"Ara"}
                    type={"search"}
                    name={"search"}
                    className={"form-control"}
                    value={searchTerm}
                    onChange={handleChange} />
            </form>

            {movies ? (
                <table className="table table-striped table-hover">
                    <tbody>
                        {movies.map((m) => (
                            <tr key={m.id}>
                                <td>
                                    <Link to={`/dict/${m.id}`}>
                                        {m.title}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Sonuç bulunamadı!</p>
            )}
        </div>
    )
}

export default Captions;