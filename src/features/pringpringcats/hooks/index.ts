import useSWRInfinite from 'swr/infinite'
import fetcher from "src/fetcher";
import { PringPringCatsVideosPayload } from 'src/features/pringpringcats/fetchers';
import { RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net';
import { useEffect, useRef } from 'react';
import { getAPIQueryStringByOption } from 'src/helpers/fetch';

export const getSWRInfiniteKey = (
  previousPageData: {data: RawYoutubeVideoResponse} | null,
  payload: PringPringCatsVideosPayload
) => {
  console.log(previousPageData, 'previousPageData')
  const options = getAPIQueryStringByOption(payload)
  if (
    previousPageData && !previousPageData.data.nextPageToken// reached the end
  ) {
    return null
  } else {
    return `/pringpringcats/videos${options}` // SWR key
  }
}

export const useFetchVideosInfinite = () => {
  const pageTokensRef = useRef<{ [pageIndex: number]: string | null; }>({0: null})

  const {
    data: pagesData = [],
    isValidating,
    error,
    size,
    setSize,
  } = useSWRInfinite<{data: RawYoutubeVideoResponse}>(
    (newPageIndex: number, previousPageData: {data: RawYoutubeVideoResponse}) => {
      const pageTokens = pageTokensRef.current
      const nextPageToken = pageTokens[newPageIndex] || null
      const currentPagePayload: PringPringCatsVideosPayload = !!nextPageToken ? {pageToken: nextPageToken} : {}
      return getSWRInfiniteKey(previousPageData, currentPagePayload)
    },
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      dedupingInterval: 3000000,
      revalidateIfStale: false,
    }
  )

  useEffect(() => {
    if(pagesData?.length > 0) {
      const currentPageIndex = pagesData.length - 1
      const currentPage = pagesData[currentPageIndex]
      pageTokensRef.current = {
        ...pageTokensRef.current,
        [currentPageIndex+1]: currentPage?.data.nextPageToken || ''
      }
    }
  }, [pagesData])

  return {
    pagesData,
    currentPageSize: size,
    setPageSize: setSize,
    hasMore: !!pagesData[pagesData.length - 1]?.data.nextPageToken,
    isValidating,
  }
}
