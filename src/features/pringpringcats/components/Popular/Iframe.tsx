import styled from "styled-components"

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: 10px;

  iframe, object, embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const Iframe = ({
  videoId,
  allowAutoPlay
}: {
  videoId: string;
  allowAutoPlay: boolean;
}) => {
  const autoPlayParam = allowAutoPlay ? '&autoplay=1' : ''
  const src = `https://www.youtube.com/embed/${videoId}?&mute=1&origin=${process.env.NEXT_PUBLIC_SITE_URL}${autoPlayParam}`

  return <IframeWrapper>
    <iframe
      id="ytplayer"
      width="424"
      height="238"
      src={src}
      allow="autoplay"
      style={{border: 'none'}}
    />
  </IframeWrapper>
}

export default Iframe
