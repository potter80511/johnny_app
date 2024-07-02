import Flex from "src/components/Flex"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import styled from "styled-components"
import Popular from "src/features/pringpringcats/components/Popular"

const Wrapper = styled.div`
  /* max-width: 768px; */
  width: 100%;
`

const VideoDetails = ({ details }: {details: YoutubeVideo | null}) => {
  if(!details) {
    return null
  }

  return <Popular isLoading={false} videoInfo={details} />
}

export default VideoDetails
