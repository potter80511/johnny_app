import Flex from "src/components/Flex"
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import styled from "styled-components"
import { lineCamp } from "src/styles/Styled"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import InfiniteScrollTriggerElement from "src/components/InfiniteScrollTriggerElement"
import StatisticsInfo from "src/features/pringpringcats/components/StatisticsInfo";

const VideosWrapper = styled(Flex)`
  margin: 0 -16px;
  * {
    transition: all .3s;
  }
  &:after {
    content: '';
    display: block;
    flex: 1;
  }
`

const Video = styled.div`
  width: calc(100%/3);
  margin-bottom: 20px;
  padding: 0 16px;
  @media screen and (max-width: ${({theme: {breakpoint}}) => breakpoint.md}) {
    width: calc(100%/2);
  }
  @media screen and (max-width: ${({theme: {breakpoint}}) => breakpoint.sm}) {
    width: 100%;
  }
`
const VideoInner = styled.div`
  transition: all .3s;
  cursor: pointer;
  border-radius: 16px 16px 0 0;
  
  &:hover {
    background-color: #222;
    border-color: #222;
  }
`
const ThumbnailWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`
const Duration = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: rgba(0, 0, 0, .7);
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 4px;
`
const VideoContent = styled.div`
  padding: 16px 8px;
`
const VideoTitle = styled.h3<{ $lineCount?: number }>`
  ${lineCamp};
  margin: 0 0 8px;
`


const VideosSection = ({
  videos,
  isValidating,
  hasMore,
  onLoadMore
}: {
  videos: Array<YoutubeVideo>
  isValidating: boolean
  hasMore: boolean
  onLoadMore: () => void
}) => {
  // console.log(videos, 'videos')
  return <div>
    {/* <div>tabs</div> */}
    <VideosWrapper flexWrap="wrap" justifyContent="space-between">
      {videos.map(({
        id,
        thumbnails,
        title,
        duration,
        statistics,
        publishedAt
      }) => <Video key={`videos-${id}`}>
        <VideoInner>
          <ThumbnailWrapper>
            <img src={thumbnails.medium.url} alt={`videos-thumbnail-${title}`} />
            <Duration>{duration}</Duration>
          </ThumbnailWrapper>
          <VideoContent>
            <VideoTitle $lineCount={2} title={title}>{title}</VideoTitle>
            <StatisticsInfo publishedAt={publishedAt} statistics={statistics} />
          </VideoContent>
        </VideoInner>
      </Video>)}
    </VideosWrapper>
    <InfiniteScrollTriggerElement
      hasMore={hasMore}
      isValidating={isValidating}
      triggerCallback={onLoadMore}
    />
  </div>
}

export default VideosSection
