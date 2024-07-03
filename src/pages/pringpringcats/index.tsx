import React from 'react';
import MainLayout from 'src/components/MainLayout';
import PringPringCatsIndex from 'src/features/pringpringcats';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import fetcher from 'src/fetcher';
import { ChannelContentDetails, YoutubeData, ChannelSnippet, ChannelStatistics, RawYoutubeChannelResponse, RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net';
import { SWRConfig } from 'swr'
import { unstable_serialize } from "swr/infinite";
import { getSWRInfiniteKey } from 'src/features/pringpringcats/hooks';
import { PROMISE_STATUS } from 'src/types/enums';

const meta = {
  title: "Johnny's App - Pring Pring Cats 毛昕&毛馨",
  description: "Johnny's App - Pring Pring Cats 毛昕&毛馨",
  keywords: "Johnny's App - Pring Pring Cats 毛昕&毛馨",
  ogtitle: "Johnny's App - Pring Pring Cats 毛昕&毛馨",
  ogdescription: "Johnny's App - Pring Pring Cats 毛昕&毛馨",
  ogtype: 'website',
  ogimage: '',
  ogsitename: "Johnny's App - Pring Pring Cats 毛昕&毛馨",
  ogurl: '',
};

const PringPringCats = ({
  channelServerData,
  error,
  fallback,
}: {
  channelServerData: YoutubeData<ChannelContentDetails, ChannelStatistics, ChannelSnippet>,
  error?: {
    channel: string,
    videos: string
  },
  fallback: {
    [key: string]: {data: RawYoutubeVideoResponse}[]
  }
}) => {
  const {
    title,
    description,
    keywords,
    ogtitle,
    ogdescription,
    ogtype,
    ogsitename
  } = meta

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="og:title" content={ogtitle} />
        <meta name="og:description" content={ogdescription} />
        <meta name="og:type" content={ogtype} />
        <meta name="og:sitename" content={ogsitename} />
      </Head>
      <MainLayout>
        <SWRConfig
          value={{
            fallback,
            revalidateOnFocus: false,
            dedupingInterval: 3000000,
          }}
        >
          <PringPringCatsIndex
            channelServerData={channelServerData}
            error={error}
          />
        </SWRConfig>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, max-age=900')

  const defaultChannelData: RawYoutubeChannelResponse | null = null
  const defaultTopVideosPagesData: RawYoutubeVideoResponse | null = null

  const allPromiseDefaultResults = [
    defaultChannelData,
    defaultTopVideosPagesData,
  ]

  try {
    const promises: Array<Promise<any>> = [
      fetcher('/pringpringcats/channel'),
      fetcher('/pringpringcats/videos/topFifty'),
    ]
    const allPromiseResult = await Promise.allSettled(promises).then((results) => {
      return results.map((result, index) =>
        result.status === PROMISE_STATUS.FULFILLED && !!result.value
          ? result.value
          : allPromiseDefaultResults[index]
      )
    })

    const channelServerData = allPromiseResult[0]?.data as RawYoutubeChannelResponse || null
    const topFiftyServerData = allPromiseResult[1] as RawYoutubeVideoResponse || null

    const error = {
      channel: allPromiseResult[0]?.message || '',
      videos: allPromiseResult[1]?.message || '',
    }

    return {
      props: {
        channelServerData,
        fallback: {
          '/pringpringcats/videos/topFifty': topFiftyServerData
        },
        error,
      },
    }
  } catch(error) {
    console.log(error, 'fetchPringPringCatsError')
    return {
      props: {
        channelServerData: {data: {items: [], pageInfo: {totalResults: 0, resultsPerPage: 0}}} as RawYoutubeChannelResponse,
        fallback: {
          [unstable_serialize(() => getSWRInfiniteKey(null, {}))]:[],
        },
      },
    }
  }

}

export default PringPringCats;
