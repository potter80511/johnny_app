import React from 'react';
import MainLayout from 'src/components/MainLayout';
import IndexLink from 'src/features/home/components/IndexLink';

import styles from 'src/styles/features/index.module.scss';
import Head from 'next/head';
import { navigation } from 'src/constants';

const meta = {
  title: "Johnny's App",
  description: "Johnny's App",
  keywords: "Johnny's App",
  ogtitle: "Johnny's App",
  ogdescription: "Johnny's App",
  ogtype: 'website',
  ogimage: '',
  ogsitename: "Johnny's App",
  ogurl: '',
};

const index = () => {
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
      <MainLayout id={styles["index"]} className="flex-center">
        <div className="index">
          <h2>Johnny's App</h2>
          <nav>
            {navigation.map(({ name, icon }) =>
              <IndexLink
                key={`home-menu-${name}`}
                url={`/${name}`}
                className={name}
                icon={icon.fontAwsome}
                tip={icon.tip}
                tipColor={icon.tipColor}
              >
                {icon.childrenSvg}
              </IndexLink>
            )}
          </nav>
        </div>
      </MainLayout>
    </>
  );
};

export default index;
