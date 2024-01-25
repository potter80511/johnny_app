import React, { useEffect, useState } from 'react';
import MobileMenu from 'src/components/MobileMenu';

type MainLayoutProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  minHeight?: boolean;
  height?: boolean;
};

const MainLayout = (props: MainLayoutProps) => {
  const [viewHeight, setViewHeight] = useState<number>(0);

  useEffect(() => {
    setViewHeight(window.innerHeight);
  });

  const { id, className, children, minHeight = true, height } = props;

  return (
    <>
      <MobileMenu />
      <div
        id={id}
        style={{
          minHeight: minHeight ? viewHeight : 'unset',
          height: height ? viewHeight : 'auto',
        }}
        className={className}
      >
        {children}
      </div>
    </>
  );
};

export default MainLayout;
