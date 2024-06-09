import dayjs from "dayjs";
import { YoutubeVideo } from "src/features/pringpringcats/types";
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net";

const formatSeconds = (rawValue: string | number) => {
  const rawSeconds = Number(rawValue) * 1000
  return dayjs(rawSeconds).format('mm:ss')
}

export const createYoutubeVideosFromNet = (rawData: RawYoutubeVideoResponse): Array<YoutubeVideo> => {
  return rawData.items.map(({snippet, id, statistics, contentDetails: { duration: rawDuration }}) => {
    const durationString = rawDuration.substring(2).replace('M', ':').replace('S', '')
    const durationSeconds = durationString.split(':').reduce((result, item, index, arr) => {
      return result + (arr.length > 1 && index === 0 ? Number(item) * 60 : Number(item))
    }, 0)
    const duration = formatSeconds(durationSeconds)

    return {
      id,
      title: snippet.localized.title,
      description: snippet.localized.description,
      publishedAt: snippet.publishedAt,
      thumbnails: snippet.thumbnails,
      statistics: statistics,
      duration
    }
  })
}
