import React from 'react';
import MainLayout from 'src/components/MainLayout';
import styled from 'styled-components';
import WeatherContainer from 'src/features/weather';
import Head from 'next/head';

const meta = {
  title: "Johnny's App - 天氣 Weather",
  description: "Johnny's App - 天氣 Weather",
  keywords: "Johnny's App - 天氣 Weather",
  ogtitle: "Johnny's App - 天氣 Weather",
  ogdescription: "Johnny's App - 天氣 Weather",
  ogtype: 'website',
  ogimage: '',
  ogsitename: "Johnny's App - 天氣 Weather",
  ogurl: '',
};

const WeatherLayout = styled(MainLayout)`
  /* align-items: flex-start; */
  button {
    color: #fff;
  }
`

const weather = () => {
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
      <WeatherLayout id="weather">
        <WeatherContainer />
      </WeatherLayout>
    </>
  );
};

export default weather;
