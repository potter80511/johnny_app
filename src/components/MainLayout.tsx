import React, { useEffect, useState } from 'react';
import MobileMenu from 'src/components/MobileMenu';

type MainLayoutProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  shouldUseMinHeight?: boolean;
  shouldUseViewHeight?: boolean;
};

const MainLayout = (props: MainLayoutProps) => {
  const [viewHeight, setViewHeight] = useState<number>(0);
  const {
    id,
    className,
    children,
    shouldUseMinHeight = true,
    shouldUseViewHeight = false,
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
        {children}
      </div>
    </>
  );
};

export default MainLayout;
