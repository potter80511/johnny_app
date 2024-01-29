import React from 'react';
import MainLayout from 'src/components/MainLayout';
import MetronomeContainer from 'src/features/metronome/MetronomeContainer';
import Head from 'next/head';
import PringPringCatsIndex from 'src/features/pringpringcats';

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

const PringPringCats = () => {
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
        <PringPringCatsIndex />
      </MainLayout>
    </>
  );
};

export default PringPringCats;
