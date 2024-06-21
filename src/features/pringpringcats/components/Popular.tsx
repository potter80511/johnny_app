import Flex from "src/components/Flex"
import styled from "styled-components"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import Iframe from 'src/features/pringpringcats/components/Iframe'

const Wrapper = styled(Flex)`
  gap: 20px;
  margin-bottom: 36px;
  a {
    color: #fff;
    text-decoration: none;
  }
`
const Left = styled.div`
  max-width: 424px;
  width: 100%;
`
const Right = styled.div`
  flex: 1;
`

const Title = styled.h3`
  margin: 0 0 16px;
`

const Popular = (props: YoutubeVideo) => {
  const { id, title } = props

  return <Wrapper alignItems="flex-start">
    <Left>
      <Iframe videoId={id} />
    </Left>
    <Right>
      <Title>
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank">{title}</a></Title>
    </Right>
  </Wrapper>
}

export default Popular
