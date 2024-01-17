import React from 'react';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import CounterIndex from '@/features/counter';
import Head from 'next/head';

const meta = {
  title: "Johnny's App - 倒數計時器 Counter",
  description: "Johnny's App - 倒數計時器 Counter",
  keywords: "Johnny's App - 倒數計時器 Counter",
  ogtitle: "Johnny's App - 倒數計時器 Counter",
  ogdescription: "Johnny's App - 倒數計時器 Counter",
  ogtype: 'website',
  ogimage: '',
  ogsitename: "Johnny's App - 倒數計時器 Counter",
  ogurl: '',
};

const CounterLayout = styled(Layout)`
  text-align: center;
  @media (max-width: 768px) {
    height: calc(100vh - 50px);
  }
`

const Counter = () => {
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
      <CounterLayout meta={meta} className="flex-center">
        <CounterIndex />
      </CounterLayout>
    </>
  );
};

export default Counter;
