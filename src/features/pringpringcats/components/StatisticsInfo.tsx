import Flex from "src/components/Flex"
import styled from "styled-components"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core"

const Wrapper = styled(Flex)`
  color: #aaa;
  font-size: 12px;
`
const Count = styled(Flex)`
  font-size: 14px;
  gap: 8px;
`

const StatisticsInfo = ({
  statistics,
  publishedAt
}: Pick<YoutubeVideo, 'statistics' | 'publishedAt'>) => {
  const { viewCount, likeCount, commentCount } = statistics
  return <Wrapper justifyContent="space-between">
    <span>觀看次數：{viewCount}次 ‧ {publishedAt}</span>
    <Count>
      <span><FontAwesomeIcon icon={faThumbsUp} /> {likeCount}</span>
      <span><FontAwesomeIcon icon={faMessage as IconProp} /> {commentCount}</span>
    </Count>
  </Wrapper>
}

export default StatisticsInfo
