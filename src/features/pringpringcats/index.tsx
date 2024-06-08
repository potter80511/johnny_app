import { CommonWrap } from "src/styles/Styled"
import { ChannelData } from "src/features/pringpringcats/types/net"
import ChannelInfo from "src/features/pringpringcats/components/ChannelInfo"

const PringPringCatsIndex = ({ channelServerData: { items } }: { channelServerData: ChannelData }) => {
  const channel = items[0]
  const { snippet } = channel
  return <CommonWrap>
    <ChannelInfo snippet={snippet} />
  </CommonWrap>
}

export default PringPringCatsIndex
