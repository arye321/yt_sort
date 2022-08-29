const fs = require('fs');

export default async function handler(req, res) {

  const yt_api = process.env.YT_API
  let fin_channel_ID = null
  if (req.body.channel_link) {

    //get last segment of channel link
    let channel_link = req.body.channel_link
    var parts = channel_link.split('/');
    fin_channel_ID = parts.pop() || parts.pop();  // handle potential trailing slash

  }
  else if (req.body.link) {
    const { link } = req.body
    const response = await fetch(link + "/about")

    const html = await response.text()
    const lookFor = 'https://www.youtube.com/channel/'
    const start = html.indexOf(lookFor)
    const end = html.indexOf('"', start + lookFor.length)
    //console.log(start,end)
    fin_channel_ID = html.slice(start + lookFor.length, end)

  }

  if (!fin_channel_ID) {
    res.status(400).json({ error: 'something wrong with link provided' })
    res.end()
    return
  }

  const { start_date, end_date } = req.body

  // console.log('a', { fin_channel_ID })

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${fin_channel_ID}&publishedAfter=${start_date}&publishedBefore=${end_date}&order=viewCount&maxResults=25&type=video&key=${yt_api}`)
  const data = await response.json()
  // console.log({ data })
  // if api returns 400 error, return error message
  if (data.error) {
    res.status(400).json({ error: data })
  }
  else {

    res.status(200).json(data)
  }


  res.end();


}