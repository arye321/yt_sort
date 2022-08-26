import { useState, useEffect, useRef } from "react";

export default function Results({ info }) {
    const [results, setResults] = useState(null);
    useEffect(() => {
        async function getResults() {
            const response = await fetch(`/api/gettop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            });
           

            const data = await response.json();
            console.log(data)
            //map through data and create an array of objects with the video id and title
            const results = data.items.map(item => (
                <div>
                {item.snippet.title}
                <br />
                {/* image of video */}
                <img src={item.snippet.thumbnails.medium.url} alt="video thumbnail" />
                {/* publish date */}
                <p>{new Date(item.snippet.publishedAt).toLocaleDateString()}</p>
              
               </div>
            )
            );
            setResults(results);
        }
        getResults();

    }, [info])


    return (
        <div>
            {results}
        </div>

    );
}