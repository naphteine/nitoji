import { useEffect, useState } from "react";
import Input from "./form/Input";
import styles from "./Captions.module.css";
import DictEntry from "./DictEntry";

const Captions = () => {
    // set stateful variables
    const [captions, setCaptions] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [fullList, setFullList] = useState([]);

    // perform search
    const performSearch = (term) => {
        // Perform translations (year, weight, etc)
        let trans = [];

        // - Convert years
        const yearList = [
            { name: "meiji", kanji: "明治", first: 1868, last: 45 },
            { name: "taisho", kanji: "大正", first: 1912, last: 15 },
            { name: "showa", kanji: "昭和", first: 1926, last: 64 },
            { name: "heisei", kanji: "平成", first: 1989, last: 31 },
            { name: "reiwa", kanji: "令和", first: 2019, last: 4 }
        ]

        // Separate name and year number
        let searchTerms = term.toLowerCase().split(' ');

        // If year number <= 0, do nothing
        if (searchTerms[1] <= 0) {
            trans = [];
        } else {
            // Search name and kanji
            let myYear = yearList.find(y => y.name === searchTerms[0] || y.kanji === searchTerms[0])

            // If found, is it bigger than last year?
            if (myYear.last >= +searchTerms[1]) {
                // Get year
                let myGYear = myYear.first + +searchTerms[1] - 1;

                // Set return value
                trans = [{ id: 1, title: `${myYear.kanji} ${searchTerms[1]} = ${myGYear}` }]
            }

        }

        setTranslations(trans);

        // Search the database
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

            {translations.length > 0 && (
                <div className={styles.dict_table}>
                    {translations.map((m) => (
                        <DictEntry key={m.id}>
                            {m.title}
                        </DictEntry>
                    ))}
                </div>
            )}

            {captions.length > 0 ? (
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