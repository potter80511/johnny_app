import React from 'react';
import MainLayout from 'src/components/MainLayout';
import PringPringCatsIndex from 'src/features/pringpringcats';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import fetcher from 'src/fetcher';
import { ChannelContentDetails, YoutubeData, ChannelSnippet, ChannelStatistics, RawYoutubeChannelResponse, RawYoutubeVideoResponse } from 'src/features/pringpringcats/types/net';
import { SWRConfig } from 'swr'

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
  videosServerData,
  fallback,
}: {
  channelServerData: YoutubeData<ChannelContentDetails, ChannelStatistics, ChannelSnippet>
  videosServerData: RawYoutubeVideoResponse
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
  console.log(fallback, 'fallback')

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
          <PringPringCatsIndex channelServerData={channelServerData} />
        </SWRConfig>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, max-age=900')

  try {
    const rawData = await fetcher('/pringpringcats/channel') as RawYoutubeChannelResponse
    const rawVideosData = await fetcher('/pringpringcats/videos') as { data: RawYoutubeVideoResponse }
    return {
      props: {
        channelServerData: rawData.data,
        videosServerData: rawVideosData.data,
        fallback: {
          ['/pringpringcats/videos']: [rawVideosData.data],
        },
      },
    }
  } catch(error) {
    console.log(error, 'fetchPringPringCatsError')
    return {
      props: {
        channelServerData: null
      },
    }
  }

}

export default PringPringCats;
