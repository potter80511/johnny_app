import React from 'react';
import Layout from '@/components/Layout';
import styled from 'styled-components';
import CounterIndex from '@/features/counter';

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
  return (
    <CounterLayout meta={meta} className="flex-center">
      <CounterIndex />
    </CounterLayout>
  );
};

export default Counter;
