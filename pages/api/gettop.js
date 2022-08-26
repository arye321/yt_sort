export default async (req, res) => {
  // const data = {
  //     "kind": "youtube#searchListResponse",
  //     "etag": "LLwKQIwGzI381GtX6WqNzYbC6B4",
  //     "regionCode": "IL",
  //     "pageInfo": {
  //       "totalResults": 3,
  //       "resultsPerPage": 3
  //     },
  //     "items": [
  //       {
  //         "kind": "youtube#searchResult",
  //         "etag": "yZsCD_SVrCiLyYtPwFlVsx7SKgA",
  //         "id": {
  //           "kind": "youtube#video",
  //           "videoId": "zU6Ydc4kuqo"
  //         },
  //         "snippet": {
  //           "publishedAt": "2022-08-17T03:11:30Z",
  //           "channelId": "UCUujfNBK9uv3cIW-P5PX7vA",
  //           "title": "Getting rid of logs",
  //           "description": "Loading loads of logs into a F800 dump truck with an excavator and delivering them places. Then fixing some lights on the truck.",
  //           "thumbnails": {
  //             "default": {
  //               "url": "https://i.ytimg.com/vi/zU6Ydc4kuqo/default.jpg",
  //               "width": 120,
  //               "height": 90
  //             },
  //             "medium": {
  //               "url": "https://i.ytimg.com/vi/zU6Ydc4kuqo/mqdefault.jpg",
  //               "width": 320,
  //               "height": 180
  //             },
  //             "high": {
  //               "url": "https://i.ytimg.com/vi/zU6Ydc4kuqo/hqdefault.jpg",
  //               "width": 480,
  //               "height": 360
  //             }
  //           },
  //           "channelTitle": "Andrew Camarata",
  //           "liveBroadcastContent": "none",
  //           "publishTime": "2022-08-17T03:11:30Z"
  //         }
  //       },
  //       {
  //         "kind": "youtube#searchResult",
  //         "etag": "XmxaocKUKk7TPg0w5Kh_BrSbDaA",
  //         "id": {
  //           "kind": "youtube#video",
  //           "videoId": "435QHf9gEz8"
  //         },
  //         "snippet": {
  //           "publishedAt": "2022-08-12T10:35:12Z",
  //           "channelId": "UCUujfNBK9uv3cIW-P5PX7vA",
  //           "title": "Unstacking shipping containers",
  //           "description": "Using an excavator and track loader to unstack and move 6 20' shipping containers.",
  //           "thumbnails": {
  //             "default": {
  //               "url": "https://i.ytimg.com/vi/435QHf9gEz8/default.jpg",
  //               "width": 120,
  //               "height": 90
  //             },
  //             "medium": {
  //               "url": "https://i.ytimg.com/vi/435QHf9gEz8/mqdefault.jpg",
  //               "width": 320,
  //               "height": 180
  //             },
  //             "high": {
  //               "url": "https://i.ytimg.com/vi/435QHf9gEz8/hqdefault.jpg",
  //               "width": 480,
  //               "height": 360
  //             }
  //           },
  //           "channelTitle": "Andrew Camarata",
  //           "liveBroadcastContent": "none",
  //           "publishTime": "2022-08-12T10:35:12Z"
  //         }
  //       },
  //       {
  //         "kind": "youtube#searchResult",
  //         "etag": "9xI69jsxn4oMKiSkzeDixd4K_C4",
  //         "id": {
  //           "kind": "youtube#video",
  //           "videoId": "Aft1W_VgEK4"
  //         },
  //         "snippet": {
  //           "publishedAt": "2022-08-23T12:56:29Z",
  //           "channelId": "UCUujfNBK9uv3cIW-P5PX7vA",
  //           "title": "Replacing trailer brakes and spring bushings",
  //           "description": "Replacing electric brakes and leaf spring bushings on a 2 axle trailer. Then moving some logs. Video unloading logs: ...",
  //           "thumbnails": {
  //             "default": {
  //               "url": "https://i.ytimg.com/vi/Aft1W_VgEK4/default.jpg",
  //               "width": 120,
  //               "height": 90
  //             },
  //             "medium": {
  //               "url": "https://i.ytimg.com/vi/Aft1W_VgEK4/mqdefault.jpg",
  //               "width": 320,
  //               "height": 180
  //             },
  //             "high": {
  //               "url": "https://i.ytimg.com/vi/Aft1W_VgEK4/hqdefault.jpg",
  //               "width": 480,
  //               "height": 360
  //             }
  //           },
  //           "channelTitle": "Andrew Camarata",
  //           "liveBroadcastContent": "none",
  //           "publishTime": "2022-08-23T12:56:29Z"
  //         }
  //       }
  //     ]
  //   }
  const yt_api = process.env.YT_API

  const { channel_link, start_date, end_date } = req.body
  //  console.log({ channel_link })

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel_link}&publishedAfter=${start_date}&publishedBefore=${end_date}&order=viewCount&maxResults=25&type=video&key=${yt_api}`)
  const data = await response.json()

  // console.log({data})
  // if api returns 400 error, return error message
  if (data.error) {
    res.status(400).json({ error: data })
  }
  // if api returns 200, return data
  else {
    res.status(200).json(data)
  }

}