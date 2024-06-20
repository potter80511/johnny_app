import styled from "styled-components"
import { getVideoSrc } from "../utils"

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Iframe = ({videoId}: {videoId: string}) => {
  const src = `https://www.youtube.com/embed/${videoId}`
  // const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=${process.env.NEXT_PUBLIC_SITE_URL}&enablejsapi=1`

  return <IframeWrapper>
    <iframe
      id="ytplayer"
      width="640"
      height="360"
      src={src}
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </IframeWrapper>
}

export default Iframe
