import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Results({ info }) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [zeroResults, setzeroResults] = useState(null);


    //html special chars to string
    const decodeHtmlCharCodes = str =>
        str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
            String.fromCharCode(charCode));


    // I can't use a script tag in this example

    useEffect(() => {
        setLoading(true);
        setError(null);
        setResults(null);
        setzeroResults(null);
        async function getResults() {
            const response = await fetch(`/api/gettop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            });


            const data = await response.json();
            // console.log(data)
            // if error
            if (data.error) {
                setLoading(false);
                console.log(data.error);
                setError(
                    <div className="alert" role="alert">


                        <h1 style={{ color: "red" }}>Error:</h1>
                        {JSON.stringify(data.error)}
                    </div>
                );
            }
            else {
                setLoading(false);

                if (data.items.length == 0) {
                    setzeroResults(
                        <div>
                            <h1>0 Results</h1>

                        </div>
                    );
                }
                else {
                    //map through data and create an array of objects with the video id and title
                    let count = 0

                    const results = data.items.map(item => {
                        const link = "https://www.youtube.com/watch?v=" + item.id.videoId
                        const title = decodeHtmlCharCodes(item.snippet.title)

                        const thumb = item.snippet.thumbnails.medium.url
                        const publish_date = new Date(item.snippet.publishedAt).toLocaleDateString('en-GB')

                        const description = item.snippet.description
                        count += 1
                        return (<div key={item.id.videoId}>

                            <h2>{count}) {title}  </h2>
                            <p>{publish_date}</p>
                            <p>{description}</p>

                            <br />
                            <a href={link} rel="noopener noreferrer" target="_blank">{link}</a>

                            <br />
                            <br />

                            <a href={link} rel="noopener noreferrer" target="_blank">

                                <img src={thumb} alt={title} />
                            </a>
                            <br />

                            <hr />
                        </div>)
                    }

                    );
                    setResults(results);
                }
            }

        }

        getResults();


    }, [info])

    if (loading) {
        return <div>Loading...</div>;
    }
    return (

        <div>
            {zeroResults ? zeroResults : null}
            {error ? error : null}
            {results ? <h1>Results:</h1> : null}
            {results ? results : null}

        </div>

    );
}