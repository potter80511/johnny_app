import { CommonWrap } from "src/styles/Styled"
import { ChannelContentDetails, YoutubeData, ChannelSnippet, ChannelStatistics, RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import ChannelInfo from "src/features/pringpringcats/components/ChannelInfo"
import styled from "styled-components"
import VideosSection from "src/features/pringpringcats/components/VideosSection"
import Tabs from "src/components/mui/Tabs"
import PlaylistsSection from "src/features/pringpringcats/components/PlaylistsSection"
import { useFetchTopFifty, useFetchVideosInfinite } from "src/features/pringpringcats/hooks"
import Popular from "src/features/pringpringcats/components/Popular"
import VideoList from "src/features/pringpringcats/components/VideoList"

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
  channelServerData,
  error,
}: {
  channelServerData: YoutubeData<ChannelContentDetails, ChannelStatistics, ChannelSnippet>
  error?: {
    channel?: string,
    videos?: string
  }
}) => {
  const {
    allVideos,
    currentPageSize,
    setPageSize,
    hasMore,
    isValidating
  } = useFetchVideosInfinite()
  // console.log(allVideos, 'allVideos')
  // console.log(channelServerData, 'channelServerData')
  console.log(allVideos, 'allVideos')
  const {
    mostViewsInFify,
    topFiftyVideos,
    isValidating: isMostViewsInFifyValidating
  } = useFetchTopFifty()

  if(!channelServerData && error) {
    return <div>
      <div>Channel Error: {error.channel}</div>
      <div>Videos Error: {error.videos}</div>
    </div>
  }
  const channel = channelServerData.items[0]
  const { snippet, brandingSettings, id, statistics } = channel

  const handleLoadMore = async () => {
    setPageSize(currentPageSize + 1)
  }

  return <CommonWrap>
    <Banner $backgroundImage={brandingSettings.image.bannerExternalUrl} />
    <ChannelInfo snippet={snippet} id={id} statistics={statistics} />
    <Popular videoInfo={mostViewsInFify} isLoading={isMostViewsInFifyValidating} />
    <Tabs data={[
      {
        label: '近期熱門',
        content: <VideoList videos={topFiftyVideos} />
      },
      {
        label: '所有影片',
        content: <VideosSection
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
