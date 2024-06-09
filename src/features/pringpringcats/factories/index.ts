import { YoutubeVideo } from "src/features/pringpringcats/types";
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net";

export const createYoutubeVideosFromNet = (rawData: RawYoutubeVideoResponse): Array<YoutubeVideo> => {
  return rawData.items.map(({snippet, id, statistics}) => {
    return {
      id,
      title: snippet.localized.title,
      description: snippet.localized.description,
      publishedAt: snippet.publishedAt,
      thumbnails: snippet.thumbnails,
      statistics: statistics
    }
  })
}
