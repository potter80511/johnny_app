import { YoutubeVideo } from "src/features/pringpringcats/types"
import InfiniteScrollTriggerElement from "src/components/InfiniteScrollTriggerElement"
import VideoList from "src/features/pringpringcats/components/VideoList"

const VideosSection = ({
  videos,
  isValidating,
  hasMore,
  onLoadMore,
  onShowVideoDetails
}: {
  videos: Array<YoutubeVideo>
  isValidating: boolean
  hasMore: boolean
  onLoadMore: () => void
  onShowVideoDetails: (v: YoutubeVideo) => void
}) => {
  return <div>
    <VideoList videos={videos} onShowVideoDetails={onShowVideoDetails} />
    <InfiniteScrollTriggerElement
      hasMore={hasMore}
      isValidating={isValidating}
      triggerCallback={onLoadMore}
    />
  </div>
}

export default VideosSection
