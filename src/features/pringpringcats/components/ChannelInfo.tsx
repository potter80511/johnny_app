import { Snippet } from "src/features/pringpringcats/types/net"
import Flex from "src/components/Flex"
import { styled } from "styled-components"

const AvatarWrapper = styled.div`
  border-radius: 100rem;
  overflow: hidden;
  width: 160px;
  margin-right: 16px;
`

const ChannelTitle = styled.h2`
  font-size: 32px;
`

const ChannelInfo = ({ snippet }: { snippet: Snippet }) => {
  const { thumbnails, title } = snippet
  return <Flex>
    <AvatarWrapper><img src={thumbnails.medium.url} alt="pringpringcats" /></AvatarWrapper>
    <div>
      <ChannelTitle>{title}</ChannelTitle>
    </div>
  </Flex>
}

export default ChannelInfo
