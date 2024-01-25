import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CSSTransition } from 'react-transition-group';
import styles from 'src/styles/transition_group.module.scss';
import IndexLinkStyles from 'src/styles/IndexLink.module.scss';

type IndexLinkProps = {
  className: string;
  url: string;
  icon?: IconProp;
  children?: React.ReactNode;
  tip: string;
  tipColor: string;
};

const IndexLink = (props: IndexLinkProps) => {
  const { className, url, icon, children, tip, tipColor } = props;

  const [showTip, setShowTip] = useState<boolean>(false);
  return (
    <Link
      href={url}
      className={`${IndexLinkStyles['nav-button']} nav-button flex-center ${IndexLinkStyles[`menu-${className}`]}`}
      onMouseOver={() => setShowTip(true)}
      onTouchStart={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      onTouchEnd={() => setShowTip(false)}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children && children}
      <CSSTransition
        appear
        in={showTip}
        timeout={300}
        classNames={{
          appear: styles['fade-appear'],
          appearActive: styles['fade-appear-active'],
          enter: styles['fade-enter'],
          enterActive: styles['fade-enter-active'],
          exit: styles['fade-exit'],
          exitActive: styles['fade-exit-active']
        }}
        unmountOnExit
      >
        <span className={IndexLinkStyles["tip"]} style={{ background: tipColor }}>
          {tip}
          <span
            className={IndexLinkStyles["tri"]}
            style={{
              borderColor: `transparent transparent ${tipColor} transparent`,
            }}
          />
        </span>
      </CSSTransition>
    </Link>
  );
};

export default IndexLink;
