import { ChannelContentDetails, YoutubeItem, ChannelSnippet, ChannelStatistics } from "src/features/pringpringcats/types/net"
import Flex from "src/components/Flex"
import { styled } from "styled-components"
import { convertUnitForChannelInfo } from "src/features/pringpringcats/utils"
import { urlify } from "src/features/pringpringcats/utils"
import { Description } from "src/features/pringpringcats/Styled"

const AvatarWrapper = styled.div`
  border-radius: 100rem;
  overflow: hidden;
  width: 160px;
  margin-right: 16px;
  align-self: flex-start;
`

const ChannelTitle = styled.h2`
  font-size: 32px;
  margin-top: 0;
  color: white;
`
const StatisticsWrapper = styled.div`
  a {
    color: #3ea6ff;
  }
`
const Right = styled.div`
  color: #aaa;
`

const ChannelInfo = ({
    snippet,
    id,
    statistics
  }: Pick<YoutubeItem<ChannelContentDetails, ChannelStatistics, ChannelSnippet>, 'snippet' | 'id' | 'statistics'>) => {
  const {
    thumbnails,
    customUrl,
    localized: { title, description }
  } = snippet

  return <Flex>
    <AvatarWrapper><img src={thumbnails.medium.url} alt="pringpringcats" /></AvatarWrapper>
    <Right>
      <ChannelTitle>{title}</ChannelTitle>
      <StatisticsWrapper>
        <a href={`https://www.youtube.com/channel/${id}`} target="_blank">{customUrl}</a> ‧ {statistics.subscriberCount}位訂閱者 ‧ {statistics.videoCount} 部影片 ‧ {convertUnitForChannelInfo(statistics.viewCount)} 觀看次數
      </StatisticsWrapper>
      <Description dangerouslySetInnerHTML={{__html: urlify(description)}}/>
    </Right>
  </Flex>
}

export default ChannelInfo
