import React from 'react';
import Head from 'next/head';

export type MetaType = {
  title?: string;
  description?: string;
  keywords?: string;
  ogtitle?: string;
  ogdescription?: string;
  ogtype?: string;
  ogimage?: string;
  ogsitename?: string;
  ogurl?: string;
};

type MetaProps = {
  meta?: MetaType;
};

const Meta = (props: MetaProps) => {
  const {
    meta,
  } = props;
  return (
    <Head>
      <title>{meta?.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="description" content={meta?.description} />
      <meta name="keywords" content={meta?.keywords} />
      <meta property="og:title" content={meta?.ogtitle} />
      <meta property="og:description" content={meta?.ogdescription} />
      <meta property="og:type" content={meta?.ogtype} />
      <meta property="og:image" content={meta?.ogimage} />
      <meta property="og:site_name" content={meta?.ogsitename} />
      <meta property="og:url" content={meta?.ogurl} />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
