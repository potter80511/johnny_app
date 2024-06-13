import useSWRInfinite from 'swr/infinite'
import fetcher from "src/fetcher";
import { PringPringCatsVideosPayload } from 'src/features/pringpringcats/fetchers';
import { RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net';
import { useEffect, useState } from 'react';
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
  const [pageTokens, setPageTokens] = useState<{
    [pageIndex: number]: string
  } | null>(null)

  console.log(pageTokens, 'pageTokens')

  const {
    data = [],
    isValidating,
    error,
    size,
    setSize,
  } = useSWRInfinite<{data: RawYoutubeVideoResponse}>(
    (newPageIndex: number, previousPageData: {data: RawYoutubeVideoResponse}) => {
      console.log(newPageIndex, 'pageIndex')
      const currentPagePayload: PringPringCatsVideosPayload = !!pageTokens && pageTokens[newPageIndex] ? {pageToken: pageTokens[newPageIndex]} : {}
      console.log(currentPagePayload, 'currentPagePayload')
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
  console.log(size, 'size')

  useEffect(() => {
    if(data?.length > 0) {
      const currentPageIndex = data.length - 1
      const currentPage = data[currentPageIndex]
      setPageTokens({
        ...pageTokens,
        [currentPageIndex+1]: currentPage?.data.nextPageToken || ''
      })
    }
  }, [data])
  console.log(data, 'data')
  return {
    data,
    currentPageIndex: size,
    setPageSize: setSize
  }
}
