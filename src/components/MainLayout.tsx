import React, { useEffect, useState } from 'react';
import MobileMenu from 'src/components/MobileMenu';
import { CommonWrap } from 'src/styles/Styled';

type MainLayoutProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  shouldUseMinHeight?: boolean;
  shouldUseViewHeight?: boolean;
  shouldCenter?: boolean;
};

const MainLayout = (props: MainLayoutProps) => {
  const [viewHeight, setViewHeight] = useState<number>(0);
  const {
    id,
    className,
    children,
    shouldUseMinHeight = true,
    shouldUseViewHeight = false,
    shouldCenter = false
  } = props;

  useEffect(() => {
    setViewHeight(window.innerHeight);
  }, []);


  return (
    <>
      <MobileMenu />
      <div
        id={id}
        style={{
          minHeight: shouldUseMinHeight ? viewHeight : 'unset',
          height: shouldUseViewHeight ? viewHeight : 'auto',
        }}
        className={className}
      >
        <CommonWrap className={shouldCenter ? 'flex-center' : ''}>
          {children}
        </CommonWrap>
      </div>
    </>
  );
};

export default MainLayout;
