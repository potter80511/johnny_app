import React, { useState } from 'react';
import Link from 'next/link';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import styles from 'src/styles/components/MobileMenu.module.scss';
import transitionStyles from 'src/styles/transition_group.module.scss';
import { navigation } from 'src/constants';

const Height22Icon = styled(FontAwesomeIcon)`
  height: 22px;
`
const MobileMenu = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const onShowList = () => {
    setShowList(!showList);
  };
  return (
    <div id="mobile-menu">
      <CSSTransition
        in={showList}
        classNames={{
          enter: transitionStyles['fade-enter'],
          enterActive: transitionStyles['fade-enter-active'],
          exit: transitionStyles['fade-exit'],
          exitActive: transitionStyles['fade-exit-active']
        }}
        timeout={300}
        unmountOnExit
      >
        <div className={styles['menu-list-bg']} onClick={() => setShowList(false)} />
      </CSSTransition>
      <button className={styles['menu-bars']} onClick={onShowList} type="button">
        Menu
      </button>
      <CSSTransition
        in={showList}
        classNames={{
          enter: styles['show-list-enter'],
          enterActive: styles['show-list-enter-active'],
          exit: styles['show-list-exit'],
          exitActive: styles['show-list-exit-active']
        }}
        timeout={300}
        unmountOnExit
      >
        <div className={styles['menu-list']}>
          <div className={styles['mobile-menu-items']}>
            <Link href="/" className="nav-button menu-home flex-center">
              <Height22Icon icon={faHome} />
            </Link>
            {navigation.map(({ name, icon }) =>
              <Link
                key={`mobiile-menu-${name}`}
                href={`/${name}`}
                className={`nav-button menu-${name} flex-center`}
              >
                {icon.fontAwsome ? <Height22Icon icon={icon.fontAwsome} /> : icon.childrenSvg}
              </Link>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default MobileMenu;
