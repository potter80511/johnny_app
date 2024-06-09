export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface ChannelItem<ContentDetails> {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  contentDetails: ContentDetails
  statistics: Statistics
  brandingSettings: BrandingSettings
  localizations:  {
    zh_TW: Localized
  }
}

export interface Snippet {
  title: string
  description: string
  customUrl: string
  publishedAt: string
  thumbnails: ThumbnailSizes
  defaultLanguage: string
  localized: Localized
  country: string
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

export interface Statistics {
  viewCount: number
  subscriberCount: number
  hiddenSubscriberCount: boolean
  videoCount: number
}

export type BrandingSettings = {
  image: {
    bannerExternalUrl: string
  }
}

export type ChannelData<ContentDetails> = {
  items: Array<ChannelItem<ContentDetails>>
  pageInfo: PageInfo
}

export type RawPringPringCatsChannelResponse = {
  data: ChannelData<ChannelContentDetails>
}

export interface PlayListItemsContentDetails {
  videoId: string
  videoPublishedAt: string
}

export type RawPringPringCatsPlayListItemsResponse = ChannelData<PlayListItemsContentDetails>
