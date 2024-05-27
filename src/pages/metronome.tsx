import React from 'react';
import MainLayout from 'src/components/MainLayout';
import MetronomeContainer from 'src/features/metronome/MetronomeContainer';
import Head from 'next/head';

const meta = {
  title: "Johnny's App - 節拍器 Metronome",
  description: "Johnny's App - 節拍器 Metronome",
  keywords: "Johnny's App - 節拍器 Metronome",
  ogtitle: "Johnny's App - 節拍器 Metronome",
  ogdescription: "Johnny's App - 節拍器 Metronome",
  ogtype: 'website',
  ogimage: '',
  ogsitename: "Johnny's App - 節拍器 Metronome",
  ogurl: '',
};

const metronome = () => {
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
      <MainLayout id="metronome" className="flex-center" height>
        <MetronomeContainer />
      </MainLayout>
    </>
  );
};

export default metronome;
