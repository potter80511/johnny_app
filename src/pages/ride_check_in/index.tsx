import React from 'react';
import MainLayout from 'src/components/MainLayout';
import RideCheckInIndex from 'src/features/ride_check_in';
import Head from 'next/head';

const meta = {
  title: "Johnny's App - 共乘打卡",
  description: "Johnny's App - 共乘打卡管理系統",
  keywords: "共乘, 打卡",
  ogtype: 'website',
  ogimage: '',
  ogurl: '',
};

const RideCheckin = () => {
  const {
    title,
    description,
    keywords,
    ogtype,
  } = meta

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:type" content={ogtype} />
        <meta name="og:sitename" content={title} />
      </Head>
      <MainLayout id="ride-check-in">
        <RideCheckInIndex/>
      </MainLayout>
    </>
  );
};

export default RideCheckin;
