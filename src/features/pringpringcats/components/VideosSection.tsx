import Flex from "src/components/Flex"
import { RawYoutubeVideoResponse } from "src/features/pringpringcats/types/net"
import styled from "styled-components"
import { lineCamp } from "src/styles/Styled"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import InfiniteScrollTriggerElement from "src/components/InfiniteScrollTriggerElement"
import VideoList from "src/features/pringpringcats/components/VideoList"



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
  return <div>
    <VideoList videos={videos} />
    <InfiniteScrollTriggerElement
      hasMore={hasMore}
      isValidating={isValidating}
      triggerCallback={onLoadMore}
    />
  </div>
}

export default VideosSection
