import { useEffect, useState } from "react";
import Input from "./form/Input";
import styles from "./Captions.module.css";
import DictEntry from "./DictEntry";

const Captions = () => {
    // set stateful variables
    const [captions, setCaptions] = useState([]);
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
                setCaptions(theList);
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
            setCaptions(fullList);
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
                setCaptions(theList);
                setFullList(theList);
            })
            .catch(err => (console.log(err)))
    }, [])

    return (
        <div>
            <h1>Sözlük</h1>
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

            {captions ? (
                <div className={styles.dict_table}>
                    {captions.map((m) => (
                        <DictEntry key={m.id} link={`/dict/${m.id}`}>
                            {m.title}
                        </DictEntry>
                    ))}
                </div>
            ) : (
                <p>Sonuç bulunamadı!</p>
            )}
        </div>
    )
}

export default Captions;