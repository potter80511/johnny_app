import { CommonWrap } from "src/styles/Styled"
import { ChannelContentDetails, YoutubeData, ChannelSnippet, ChannelStatistics, RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import ChannelInfo from "src/features/pringpringcats/components/ChannelInfo"
import styled from "styled-components"
import VideosSection from "src/features/pringpringcats/components/VideosSection"
import Tabs from "src/components/mui/Tabs"
import PlaylistsSection from "src/features/pringpringcats/components/PlaylistsSection"
import { useFetchVideosInfinite } from "src/features/pringpringcats/hooks"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import { createYoutubeVideosFromNet } from "src/features/pringpringcats/factories"
import { useMemo } from "react"

const Banner = styled.div<{$backgroundImage: string}>`
  background-image: ${({ $backgroundImage: backgroundImage }) => `url(${backgroundImage})`};
  background-repeat: none;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`

const PringPringCatsIndex = ({
  channelServerData: { items },
  videosServerData
}: {
  channelServerData: YoutubeData<ChannelContentDetails, ChannelStatistics, ChannelSnippet>
  videosServerData: RawYoutubeVideoResponse
}) => {
  const channel = items[0]
  const { snippet, brandingSettings, id, statistics } = channel
  // console.log(channel, 'channel')

  const {
    allVideos,
    currentPageSize,
    setPageSize,
    hasMore,
    isValidating
  } = useFetchVideosInfinite()

  const handleLoadMore = async () => {
    setPageSize(currentPageSize + 1)
  }

  return <CommonWrap>
    <Banner $backgroundImage={brandingSettings.image.bannerExternalUrl} />
    <ChannelInfo snippet={snippet} id={id} statistics={statistics} />
    <Tabs data={[
      {
        label: '所有影片',
        content: <VideosSection
          videosServerData={videosServerData}
          videos={allVideos}
          hasMore={hasMore}
          isValidating={isValidating}
          onLoadMore={handleLoadMore}
        />
      },
      {
        label: '播放清單',
        content: <PlaylistsSection />
      },
    ]} />
  </CommonWrap>
}

export default PringPringCatsIndex
