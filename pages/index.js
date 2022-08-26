import Head from 'next/head'
import Image from 'next/image'
//import useRef, useEffect, useState from 'react'
import { useRef, useEffect, useState } from 'react'
import Results from '../components/Results'

export default function Home() {
  //useRef
  // state info
  const [info, setInfo] = useState()
  // state error
  const [error, setError] = useState()
  const start_date = useRef(null)
  const end_date = useRef(null)
  const channel_link = useRef(null)

  async function submited(e) {
    e.preventDefault()
    if (start_date.current.value && end_date.current.value && channel_link.current.value) {

      const start_date_value = start_date.current.valueAsDate.toISOString()
      const end_date_value = end_date.current.valueAsDate.toISOString()
      const channel_link_value = channel_link.current.value
      // console.log(start_date_value)
      setInfo({ channel_link: channel_link_value, start_date: start_date_value, end_date: end_date_value })
    }
    else {
      setError("Please fill out all fields")
    }
  }
  return (
    <div className="HomeDiv">
      <Head>
        <title>yt sort 😎</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>from:</p>
      <input type="date" ref={start_date} id='dateStart' />
      <br />

      <p>to:</p>
      <input type="date" ref={end_date} id='dateEnd' />
      <br />
      <br />
      <p>channel:</p>
      <form onSubmit={submited}>
        <input
          className='channelLink'
          ref={channel_link}
          placeholder="https://www.youtube.com/channel/UCUujfNBK9uv3cIW-P5PX7vA"
          autoFocus
        />
      </form>
      <div className='results'>
        {info ? <Results info={info} /> : null}
        {error ? <div className="alert" role="alert">{error}</div> : null}

      </div>
      {/* <h4>{JSON.stringify(info)}</h4> */}
      {/* <Results info={info} /> */}
    </div>
  )
}
