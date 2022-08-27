import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Results({ info }) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setError(null);
        setResults(null);
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
                //map through data and create an array of objects with the video id and title
                let count = 0

                const results = data.items.map(item => {
                    const link = "https://www.youtube.com/watch?v=" + item.id.videoId
                    const title = item.snippet.title

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

        getResults();


    }, [info])

    if (loading) {
        return <div>Loading...</div>;
    }
    return (

        <div>
            {error ? error : null}
            {results ? <h1>Results:</h1> : null}
            {results ? results : null}

        </div>

    );
}