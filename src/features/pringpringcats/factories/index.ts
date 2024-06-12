import dayjs from "src/helpers/dayjs";
import { YoutubeList, YoutubeVideo } from "src/features/pringpringcats/types";
import { RawYoutubePlayListsResponse, RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net";
import { convertCountUnit } from "src/features/pringpringcats/utils";

const formatSeconds = (rawValue: string | number) => {
  const rawSeconds = Number(rawValue) * 1000
  return dayjs(rawSeconds).format('mm:ss')
}

export const createYoutubeVideosFromNet = (rawData: RawYoutubeVideoResponse): Array<YoutubeVideo> => {
  return rawData.items.map(({
    snippet,
    id,
    statistics:
    rawStatistics,
    contentDetails: { duration: rawDuration }
  }) => {
    const durationString = rawDuration.substring(2).replace('M', ':').replace('S', '')
    const durationSeconds = durationString.split(':').reduce((result, item, index, arr) => {
      return result + (arr.length > 1 && index === 0 ? Number(item) * 60 : Number(item))
    }, 0)
    const duration = formatSeconds(durationSeconds)

    return {
      id,
      title: snippet.localized.title,
      description: snippet.localized.description,
      publishedAt: dayjs().locale('zh-tw').to(dayjs(snippet.publishedAt)),
      thumbnails: snippet.thumbnails,
      statistics: {
        ...rawStatistics,
        viewCount: convertCountUnit(rawStatistics.viewCount),
        commentCount: convertCountUnit(rawStatistics.commentCount),
        likeCount: convertCountUnit(rawStatistics.likeCount)
      },
      duration
    }
  })
}

export const createYoutubePlaylistsFromNet = (rawData: RawYoutubePlayListsResponse): Array<YoutubeList> => {
  return rawData.items.map(({
    snippet,
    id,
    contentDetails: { itemCount }
  }) => {
    return {
      id,
      title: snippet.localized.title,
      description: snippet.localized.description,
      publishedAt: dayjs().locale('zh-tw').to(dayjs(snippet.publishedAt)),
      thumbnails: snippet.thumbnails,
      videoCount: itemCount
    }
  })
}
