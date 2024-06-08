import { ChannelItem, Snippet } from "src/features/pringpringcats/types/net"
import Flex from "src/components/Flex"
import { styled } from "styled-components"
import { convertUnit } from "src/features/pringpringcats/utils"

const AvatarWrapper = styled.div`
  border-radius: 100rem;
  overflow: hidden;
  width: 160px;
  margin-right: 16px;
`

const ChannelTitle = styled.h2`
  font-size: 32px;
  margin-top: 0;
`
const StatisticsWrapper = styled.div`
  color: #aaa;
  a {
    color: #7a95a2;
  }
`

const ChannelInfo = ({
    snippet,
    id,
    statistics
  }: Pick<ChannelItem, 'snippet' | 'id' | 'statistics'>) => {
  const {
    thumbnails,
    customUrl,
    localized: { title }
  } = snippet

  return <Flex>
    <AvatarWrapper><img src={thumbnails.medium.url} alt="pringpringcats" /></AvatarWrapper>
    <div>
      <ChannelTitle>{title}</ChannelTitle>
      <StatisticsWrapper>
        <a href={`https://www.youtube.com/channel/${id}`} target="_blank">{customUrl}</a> ‧ {statistics.subscriberCount}位訂閱者 ‧ {statistics.videoCount} 部影片 ‧ {convertUnit(statistics.viewCount)} 觀看次數
      </StatisticsWrapper>
    </div>
  </Flex>
}

export default ChannelInfo
