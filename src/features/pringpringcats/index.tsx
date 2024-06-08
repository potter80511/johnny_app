import { CommonWrap } from "src/styles/Styled"
import { ChannelData } from "src/features/pringpringcats/types/net"
import ChannelInfo from "src/features/pringpringcats/components/ChannelInfo"
import styled from "styled-components"

const Banner = styled.div<{$backgroundImage: string}>`
  background-image: ${({ $backgroundImage: backgroundImage }) => `url(${backgroundImage})`};
  background-repeat: none;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
`
const PringPringCatsIndex = ({ channelServerData: { items } }: { channelServerData: ChannelData }) => {
  const channel = items[0]
  const { snippet, brandingSettings } = channel
  return <CommonWrap>
    <Banner $backgroundImage={brandingSettings.image.bannerExternalUrl} />
    <ChannelInfo snippet={snippet} />
  </CommonWrap>
}

export default PringPringCatsIndex
