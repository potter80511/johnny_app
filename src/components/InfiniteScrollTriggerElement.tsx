import { useInfiniteScroll } from "src/hooks"

const InfiniteScrollTriggerElement = ({
  hasMore,
  isValidating,
  triggerCallback
}: {
  hasMore: boolean,
  isValidating: boolean,
  triggerCallback: () => void
}) => {
  const { triggerRef } = useInfiniteScroll(hasMore, isValidating, triggerCallback)
  return <div ref={triggerRef}></div>
}

export default InfiniteScrollTriggerElement
