import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Results({ info }) {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [zeroResults, setzeroResults] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [allResults, setAllResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    //html special chars to string
    const decodeHtmlCharCodes = str =>
        str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
            String.fromCharCode(charCode));

    const getResults = async (pageToken = null, append = false) => {
        setLoading(true);
        if (!append) {
            setError(null);
            setResults(null);
            setzeroResults(null);
            setAllResults([]);
            setCurrentPage(1);
        }

        try {
            const requestBody = { ...info };
            if (pageToken) {
                requestBody.pageToken = pageToken;
            }

            const response = await fetch(`/api/gettop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            
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
                return;
            }

            setLoading(false);
            setNextPageToken(data.nextPageToken || null);

            if (data.items.length == 0 && !append) {
                setzeroResults(
                    <div>
                        <h1>0 Results</h1>
                    </div>
                );
                return;
            }

            //map through data and create an array of objects with the video id and title
            const startCount = append ? allResults.length : 0;
            let count = startCount;

            const newResults = data.items.map(item => {
                const link = "https://www.youtube.com/watch?v=" + item.id.videoId
                const title = decodeHtmlCharCodes(item.snippet.title)
                const thumb = item.snippet.thumbnails.medium.url
                const publish_date = new Date(item.snippet.publishedAt).toLocaleDateString('en-GB')
                const description = item.snippet.description
                count += 1
                
                return {
                    id: item.id.videoId,
                    jsx: (
                        <div key={item.id.videoId}>
                            <h2>{count}) {title}</h2>
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
                        </div>
                    )
                }
            });

            if (append) {
                const updatedResults = [...allResults, ...newResults];
                setAllResults(updatedResults);
                setResults(updatedResults.map(r => r.jsx));
                setCurrentPage(prev => prev + 1);
            } else {
                setAllResults(newResults);
                setResults(newResults.map(r => r.jsx));
            }

        } catch (err) {
            setLoading(false);
            setError(
                <div className="alert" role="alert">
                    <h1 style={{ color: "red" }}>Error:</h1>
                    Failed to fetch results
                </div>
            );
        }
    };

    const loadNextPage = () => {
        if (nextPageToken && !loading) {
            getResults(nextPageToken, true);
        }
    };

    useEffect(() => {
        getResults();
    }, [info]);

    if (loading && allResults.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {zeroResults ? zeroResults : null}
            {error ? error : null}
            {results ? <h1>Results (Page {currentPage}):</h1> : null}
            {results ? results : null}
            
            {nextPageToken && !loading && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <button 
                        onClick={loadNextPage}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Load Next 25 Results
                    </button>
                </div>
            )}
            
            {loading && allResults.length > 0 && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    Loading more results...
                </div>
            )}
        </div>
    );
}