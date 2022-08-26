import { useState, useEffect, useRef } from "react";

export default function Results({info}) {
    useEffect(() => {
        // console.log(info.start_date)
        // console.log(info.end_date)
        // console.log(info.channel_link)
    }, [])




    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [channelLink, setChannelLink] = useState(null)

    return (
        <div>
            <h3>{JSON.stringify(info)}</h3>
        </div>

    );
}