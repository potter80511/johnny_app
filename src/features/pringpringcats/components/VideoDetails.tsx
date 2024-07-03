import { YoutubeVideo } from "src/features/pringpringcats/types"
import Popular from "src/features/pringpringcats/components/Popular"

const VideoDetails = ({ details }: {details: YoutubeVideo | null}) => {
  if(!details) {
    return null
  }

  return <Popular isLoading={false} videoInfo={details} />
}

export default VideoDetails
