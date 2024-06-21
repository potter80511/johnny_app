import { CommonWrap } from "src/styles/Styled"
import { ChannelContentDetails, YoutubeData, ChannelSnippet, ChannelStatistics, RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import ChannelInfo from "src/features/pringpringcats/components/ChannelInfo"
import styled from "styled-components"
import VideosSection from "src/features/pringpringcats/components/VideosSection"
import Tabs from "src/components/mui/Tabs"
import PlaylistsSection from "src/features/pringpringcats/components/PlaylistsSection"
import { useFetchVideosInfinite } from "src/features/pringpringcats/hooks"
import Popular from "src/features/pringpringcats/components/Popular"
import { YoutubeVideo } from "src/features/pringpringcats/types"

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
  mostViewsInFify,
  error,
}: {
  channelServerData: YoutubeData<ChannelContentDetails, ChannelStatistics, ChannelSnippet>
  mostViewsInFify: YoutubeVideo | null,
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

  // if(!channelServerData && error) {
  //   return <div>
  //     <div>Channel Error: {error.channel}</div>
  //     <div>Videos Error: {error.videos}</div>
  //   </div>
  // }
  // const channel = channelServerData.items[0]
  // const { snippet, brandingSettings, id, statistics } = channel

  const handleLoadMore = async () => {
    setPageSize(currentPageSize + 1)
  }

  return <CommonWrap>
    <div>
      <iframe
        id="ytplayer"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/eahLK8o2R5s?autoplay=1&mute=1&origin=${process.env.NEXT_PUBLIC_SITE_URL}`}
        allow="autoplay"
        style={{border: 'none'}}
      />
    </div>
    {/* <Banner $backgroundImage={brandingSettings.image.bannerExternalUrl} />
    <ChannelInfo snippet={snippet} id={id} statistics={statistics} /> */}
    {/* {mostViewsInFify && <Popular {...mostViewsInFify} />} */}
    {/* <Tabs data={[
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
    ]} /> */}
  </CommonWrap>
}

export default PringPringCatsIndex
