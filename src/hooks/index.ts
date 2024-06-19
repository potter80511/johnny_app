import { useCallback, useRef } from "react"

export const useInfiniteScroll = (hasMore: boolean, isLoading: boolean, callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const triggerRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    if(observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore) {
        callback()
      }
    })
    if(node) {
      observer.current.observe(node)
    }
  }, [hasMore, isLoading, callback])

  return {
    triggerRef
  }
}
