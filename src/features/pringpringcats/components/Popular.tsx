import Flex from "src/components/Flex"
import styled from "styled-components"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import dynamic from 'next/dynamic'
import Iframe from 'src/features/pringpringcats/components/Iframe'

const Wrapper = styled(Flex)`

`

const DynamicIframe = dynamic(() => import('src/features/pringpringcats/components/Iframe'), {
  ssr: false
})

const Popular = (props: YoutubeVideo) => {
  const { id } = props

  return <Flex>
    <Iframe videoId={id} />
    <div>fdsf</div>
  </Flex>
}

export default Popular
