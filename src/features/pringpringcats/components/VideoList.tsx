import Flex from "src/components/Flex";
import StatisticsInfo from "src/features/pringpringcats/components/StatisticsInfo";
import { lineCamp } from "src/styles/Styled";
import { styled } from "styled-components";
import { YoutubeVideo } from "src/features/pringpringcats/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
const YoutubeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 8px;
  bottom: 8px;
  font-size: 26px;
`
const VideoContent = styled.div`
  padding: 16px 8px;
`
const VideoTitle = styled.h3<{ $lineCount?: number }>`
  ${lineCamp};
  margin: 0 0 8px;
`

const VideoList = ({
  videos,
  onShowVideoDetails
}: {
  videos: Array<YoutubeVideo>;
  onShowVideoDetails: (v: YoutubeVideo) => void
}) => {
  return <VideosWrapper flexWrap="wrap" justifyContent="space-between">
    {videos.map((video) => {
      const {
        id,
        thumbnails,
        title,
        duration,
        statistics,
        publishedAt
      } = video
      return <Video key={`videos-${id}`} onClick={() => onShowVideoDetails(video)}>
        <VideoInner>
          <ThumbnailWrapper>
            <img src={thumbnails.medium.url} alt={`videos-thumbnail-${title}`} />
            <YoutubeIcon icon={faYoutube as IconProp} />
            <Duration>{duration}</Duration>
          </ThumbnailWrapper>
          <VideoContent>
            <VideoTitle
              $lineCount={2}
              title={title}
            >{title}</VideoTitle>
            <StatisticsInfo publishedAt={publishedAt} statistics={statistics} />
          </VideoContent>
        </VideoInner>
      </Video>
    })}
  </VideosWrapper>
}

export default VideoList
