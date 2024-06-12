import { VideoStatistics, ThumbnailSizes } from "src/features/pringpringcats/types/net"

export type YoutubeVideo = {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnails: ThumbnailSizes
  statistics: VideoStatistics
  duration: string
}
export type YoutubeList = {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnails: ThumbnailSizes
  videoCount: number
}
