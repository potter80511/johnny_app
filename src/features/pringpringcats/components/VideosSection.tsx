import Flex from "src/components/Flex"
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import { createYoutubeVideosFromNet } from "src/features/pringpringcats/factories"
import { useMemo } from "react"
import styled from "styled-components"
import { lineCamp } from "src/styles/Styled"

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
const VideoTitle = styled.h3<{ lineCount?: number }>`
  ${lineCamp};
  margin: 0;
`

const VideosSection = ({ videosServerData }: { videosServerData: RawYoutubeVideoResponse }) => {
  console.log(videosServerData, 'videosServerData')
  const videos = useMemo(() => createYoutubeVideosFromNet(videosServerData), [videosServerData])
  console.log(videos, 'videos')
  return <div>
    <div>tabs</div>
    <VideosWrapper flexWrap="wrap" justifyContent="space-between">
      {videos.map(({id, thumbnails, title, duration}) => <Video key={`videos-${id}`}>
        <VideoInner>
          <ThumbnailWrapper>
            <img src={thumbnails.medium.url} alt={`videos-thumbnail-${title}`} />
            <Duration>{duration}</Duration>
          </ThumbnailWrapper>
          <VideoContent>
            <VideoTitle lineCount={2} title={title}>{title}</VideoTitle>
          </VideoContent>
        </VideoInner>
      </Video>)}
    </VideosWrapper>
  </div>
}

export default VideosSection
