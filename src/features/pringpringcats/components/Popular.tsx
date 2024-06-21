import Flex from "src/components/Flex"
import styled from "styled-components"
import { YoutubeVideo } from "src/features/pringpringcats/types"
import dynamic from 'next/dynamic'
import Iframe from 'src/features/pringpringcats/components/Iframe'
import { useEffect } from "react"

const Wrapper = styled(Flex)`

`

const DynamicIframe = dynamic(() => import('src/features/pringpringcats/components/Iframe'), {
  ssr: false
})

const Popular = (props: YoutubeVideo) => {
  const id = 'eahLK8o2R5s'
  useEffect(() => {

  }, [])

  return <Flex>
    <iframe
      id="ytplayer"
      width="424"
      height="238"
      src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&origin=${process.env.NEXT_PUBLIC_SITE_URL}`}
      allow="autoplay"
      style={{border: 'none'}}
    />
    <div>fdsf</div>
  </Flex>
}

export default Popular
