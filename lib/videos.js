export const getCommonVideos = async (url) => {

    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const BASE_URL = "youtube.googleapis.com/youtube/v3"

        const response = await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
        
        const data = await response.json();
    
        if (data?.error) {
            console.error("Youtube API error", data.error)

            return []
        }

        return data.items.map(item => {

            const snippet = item.snippet;

            return {
                title: snippet.title,
                imgUrl: snippet.thumbnails.high.url,
                id: item?.id?.videoId || item.id || null,
                description: snippet.description,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics ? item.statistics : { viewCount: 0 }
            }
        })

    } catch (e) {
        console.error("Something went wrong with video library ", e)

        return []
    }
}

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}`

    return getCommonVideos(URL);
}

export const getPopularVideos = () => {
    const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US"

    return getCommonVideos(URL);
}

export const getVideoById = (videoId) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

    return getCommonVideos(URL);
}