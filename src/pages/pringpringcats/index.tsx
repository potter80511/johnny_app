import React from 'react';
import MainLayout from 'src/components/MainLayout';
import PringPringCatsIndex from 'src/features/pringpringcats';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

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

const PringPringCats = ({ channelServerData }: { channelServerData: any }) => {
  const {
    title,
    description,
    keywords,
    ogtitle,
    ogdescription,
    ogtype,
    ogsitename
  } = meta
  console.log(channelServerData, 'channelServerData')

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
        <PringPringCatsIndex />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, max-age=900')

  try {
    const response = await fetch('https://www.googleapis.com/youtube/v3/channels?key=AIzaSyDrvBbitoDXcIHklICoeE6w_guJrwotF0k&id=UCrfpfIhOA_bH9QJvZNluv9w&part=snippet,contentDetails,statistics')
    const rawData = await response.json()
    return {
      props: {
        channelServerData: rawData
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
