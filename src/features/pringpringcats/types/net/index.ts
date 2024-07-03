export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface YoutubeItem<ContentDetails, Statistics, Snippet = {}> {
  kind: string
  etag: string
  id: string
  snippet: Snippet & BaseSnippet
  contentDetails: ContentDetails
  statistics: Statistics
  brandingSettings: BrandingSettings
  localizations:  {
    zh_TW: Localized
  }
}

export interface BaseSnippet {
  title: string
  description: string
  publishedAt: string
  thumbnails: ThumbnailSizes
  defaultLanguage: string
  localized: Localized
}
export interface ChannelSnippet {
  customUrl: string
  country: string
}

export interface PlayListItemsSnippet {
  publishedAt: string
  channelId: string
  channelTitle: string
  playlistId: string
  position: number
}
export interface VideoSnippet {
  channelId: string
  channelTitle: string
  categoryId: number
}

export interface ThumbnailSizes {
  default: Thumbnail
  medium: Thumbnail
  high: Thumbnail
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface Localized {
  title: string
  description: string
}

export interface ChannelContentDetails {
  relatedPlaylists: RelatedPlaylists
}

export interface PlayListItemContentDetails {
  relatedPlaylists: RelatedPlaylists
}

export interface RelatedPlaylists {
  likes: string
  uploads: string
}

export interface ChannelStatistics {
  viewCount: number
  subscriberCount: number
  hiddenSubscriberCount: boolean
  videoCount: number
}
export interface VideoStatistics {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

export type BrandingSettings = {
  image: {
    bannerExternalUrl: string
  }
}

export type YoutubeData<ContentDetails, Statistics, Snippet = {}> = {
  items: Array<YoutubeItem<ContentDetails, Statistics, Snippet>>
  pageInfo: PageInfo
  nextPageToken?: string
}

export type RawYoutubeChannelResponse = {
  data: YoutubeData<ChannelContentDetails, ChannelSnippet>
}

export interface PlayListItemsContentDetails {
  videoId: string
  videoPublishedAt: string
}
export interface VideoContentDetails {
  duration: string
}

export type RawYoutubePlayListItemsResponse = YoutubeData<PlayListItemsContentDetails, {}>
export type RawYoutubePlayListsResponse = YoutubeData<{ itemCount: number }, {}>

export type RawYoutubeVideoResponse = YoutubeData<VideoContentDetails, VideoStatistics, VideoSnippet>

export type RawYoutubeSearchResponse = {
  items: Array<{
    kind: string
    etag: string
    id: {
      videoId: string
    }
  }>
  pageInfo: PageInfo
  nextPageToken?: string
}
