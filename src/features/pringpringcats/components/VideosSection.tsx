import Flex from "src/components/Flex"
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import { createYoutubeVideosFromNet } from "src/features/pringpringcats/factories"
import { useMemo } from "react"
import styled from "styled-components"
import { lineCamp } from "src/styles/Styled"
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { fetchPringPringCatsVideos } from "src/features/pringpringcats/fetchers"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import { useFetchVideosInfinite } from "../hooks"
import InfiniteScrollTriggerElement from "src/components/InfiniteScrollTriggerElement"

const VideosWrapper = styled(Flex)`
  margin: 0 -16px;
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
const StatisticsWrapper = styled(Flex)`
  color: #aaa;
  font-size: 12px;
`
const Count = styled(Flex)`
  font-size: 14px;
  gap: 8px;
`

const VideosSection = ({ videosServerData }: { videosServerData: RawYoutubeVideoResponse }) => {
  const {
    pagesData,
    currentPageSize,
    setPageSize,
    hasMore,
    isValidating
  } = useFetchVideosInfinite()

  const videos: Array<YoutubeVideo> = useMemo(() => {
    return pagesData.reduce((result, pageData) => {
      return [...result, ...createYoutubeVideosFromNet(pageData.data)]
    }, [] as Array<YoutubeVideo>)
  }, [pagesData])

  const handleLoadMore = async () => {
    setPageSize(currentPageSize + 1)
  }

  // console.log(videosServerData, 'videosServerData')
  console.log(videos, 'videos')
  return <div>
    <div>tabs</div>
    <VideosWrapper flexWrap="wrap" justifyContent="space-between">
      {videos.map(({
        id,
        thumbnails,
        title,
        duration,
        statistics: { viewCount, likeCount, commentCount },
        publishedAt
      }) => <Video key={`videos-${id}`}>
        <VideoInner>
          <ThumbnailWrapper>
            <img src={thumbnails.medium.url} alt={`videos-thumbnail-${title}`} />
            <Duration>{duration}</Duration>
          </ThumbnailWrapper>
          <VideoContent>
            <VideoTitle $lineCount={2} title={title}>{title}</VideoTitle>
            <StatisticsWrapper justifyContent="space-between">
              <span>觀看次數：{viewCount}次 ‧ {publishedAt}</span>
              <Count>
                <span><FontAwesomeIcon icon={faThumbsUp} /> {likeCount}</span>
                <span><FontAwesomeIcon icon={faMessage as IconProp} /> {commentCount}</span>
              </Count>
            </StatisticsWrapper>
          </VideoContent>
        </VideoInner>
      </Video>)}
    </VideosWrapper>
    <InfiniteScrollTriggerElement
      hasMore={hasMore}
      isValidating={isValidating}
      triggerCallback={() => handleLoadMore()}
    />
  </div>
}

export default VideosSection
