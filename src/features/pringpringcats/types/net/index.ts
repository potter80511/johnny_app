export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface ChannelItem {
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

export interface ContentDetails {
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

export type ChannelData = {
  items: Array<ChannelItem>
  pageInfo: PageInfo
}

export type RawPringPringCatsChannelResponse = {
  data: ChannelData
}
