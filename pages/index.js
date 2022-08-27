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
  useEffect(() => {
    // focust on input
    channel_link.current.focus()
  } , [])
  async function submited(e) {
    e.preventDefault()
    if (start_date.current.value && end_date.current.value && channel_link.current.value) {

      const start_date_value = start_date.current.valueAsDate.toISOString()
      const end_date_value = end_date.current.valueAsDate.toISOString()
      const channel_link_value = channel_link.current.value
      if (channel_link_value.includes('http')){
      
        // console.log(start_date_value)
        if (channel_link_value.includes('/channel/')){
          setInfo({ channel_link: channel_link_value, start_date: start_date_value, end_date: end_date_value })
        }
      }
      else{
        setError(<>
        <p>Channel link must include http or https </p>
        <p>Examples: </p>
        <p>https://www.youtube.com/channel/UC-9-kyTW8Zk</p>
        <p>https://www.youtube.com/c/DJMag/</p>
        <p>https://www.youtube.com/user/PewDiePie</p>
        </>)
        

      }
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
      <p>channel link:</p>
      <form onSubmit={submited}>
        <input
          className='channelLink'
          ref={channel_link}
          placeholder="https://www.youtube.com/channel/UCUujfNBK9uv3cIW-P5PX7vA"
          autoFocus={true}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className='results'>
        {info ? <Results info={info} /> : null}
        {error ? <div>{error}</div> : null}

      </div>
      {/* <h4>{JSON.stringify(info)}</h4> */}
      {/* <Results info={info} /> */}
    </div>
  )
}
