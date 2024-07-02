import Flex from "src/components/Flex"
import styled from "styled-components"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import Iframe from 'src/features/pringpringcats/components/Popular/Iframe'
import Skeleton from "@mui/material/Skeleton"
import StatisticsInfo from "src/features/pringpringcats/components/StatisticsInfo"
import { Description } from "src/features/pringpringcats/Styled"

const Wrapper = styled(Flex)`
  gap: 20px;
  margin: 40px 0;
  flex-wrap: wrap;

  a {
    color: #fff;
    text-decoration: none;
  }
`
const Left = styled.div`
  max-width: 424px;
  width: 100%;

  @media screen and (max-width: ${({theme: {breakpoint}}) => breakpoint.lg}) {
    max-width: unset;
  }
`
const Right = styled.div`
  flex: 1;
`

const Title = styled.h3`
  margin: 0 0 16px;
`

type SkeletonData = {
  width: number | string
  height: number | string
  marginBottom?: number
}
const RightSkeletonDatas: SkeletonData[] = [
  {
    width: '80%',
    height: 36,
    marginBottom: 24
  },
  {
    width: '90%',
    height: 22,
    marginBottom: 16
  },
  {
    width: '100%',
    height: 22,
    marginBottom: 16
  },
  {
    width: '100%',
    height: 22,
  },
]

const Popular = ({
  videoInfo,
  isLoading,
  shouldTrimDescription = false
}: {
  videoInfo?: YoutubeVideo;
  isLoading: boolean;
  shouldTrimDescription : boolean;
}) => {
  console.log(isLoading, 'isLoading')
  console.log(videoInfo, 'videoInfo')
  if(isLoading) {
    return <Wrapper alignItems="flex-start">
      <Left>
        <Skeleton
          variant="rounded"
          width={424}
          height={238}
        />
      </Left>
      <Right>
        {RightSkeletonDatas.map(({width, height, marginBottom}, index) =>
          <Skeleton
            key={`popular-skeleton-${index}`}
            width={width}
            variant="rounded"
            height={height}
            style={{marginBottom: marginBottom || 0}}
          />
        )}
      </Right>
    </Wrapper>
  } else if(!!videoInfo) {
    const {
      id,
      title,
      statistics,
      publishedAt,
      description
    } = videoInfo

    return <Wrapper alignItems="flex-start">
      <Left>
        <Iframe videoId={id} />
      </Left>
      <Right>
        <Title>
          <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank">{title}</a>
        </Title>
        <StatisticsInfo statistics={statistics} publishedAt={publishedAt} />
        <Description $lineCount={shouldTrimDescription ? 7 : undefined} dangerouslySetInnerHTML={{__html: description}}></Description>
      </Right>
    </Wrapper>
  }

  return <div>No Popular data</div>
  
}

export default Popular
