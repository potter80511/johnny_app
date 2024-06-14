import useSWRInfinite from 'swr/infinite'
import {useSWRConfig} from 'swr'
import fetcher from "src/fetcher";
import { PringPringCatsVideosPayload } from 'src/features/pringpringcats/fetchers';
import { RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net';
import { useEffect, useMemo, useRef } from 'react';
import { getAPIQueryStringByOption } from 'src/helpers/fetch';
import { YoutubeVideo } from 'src/features/pringpringcats/types';
import { createYoutubeVideosFromNet } from 'src/features/pringpringcats/factories';

export const getSWRInfiniteKey = (
  previousPageData: {data: RawYoutubeVideoResponse} | null,
  payload: PringPringCatsVideosPayload
) => {
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
  const { cache } = useSWRConfig()
  console.log(cache, 'cache')
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

  const allVideos: Array<YoutubeVideo> = useMemo(() => {
    return pagesData.reduce((result, pageData) => {
      return [...result, ...createYoutubeVideosFromNet(pageData.data)]
    }, [] as Array<YoutubeVideo>)
  }, [pagesData])

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
    allVideos,
    currentPageSize: size,
    setPageSize: setSize,
    hasMore: !!pagesData[pagesData.length - 1]?.data.nextPageToken,
    isValidating,
  }
}
