import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/styles/counter/Alert.module.scss';
import { animated, useTransition } from 'react-spring';

export interface TimesUpAlertProps {
  id?: string;
  viewHeight?: number;
  className?: string;
  show?: boolean;
  message: string;
  yes(): void;
  onRecount(): void;
}

const TimesUpAlertModal = (props: TimesUpAlertProps) => {
  const { id, message, show, yes, onRecount } = props;

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const viewHeight = `${props.viewHeight}px`;
  const showClass = show ? ' show' : '';

  const onYes = () => {
    yes();
  };

  return transitions(
    (props, item) =>
      item && (
        <animated.div
          id={id}
          className={`${styles['ring-alert-modal']}${showClass}`}
          style={{ height: viewHeight, ...props }}
        >
          <div className="modal-block">
            <div className="modal-content">
              <p className="message">
                <FontAwesomeIcon icon={faBell} />
                <span>{message}</span>
              </p>
            </div>
            <button className="yes" type="button" onClick={onYes}>
              關閉
            </button>
            <button className="reset" type="button" onClick={onRecount}>
              重複
            </button>
          </div>
        </animated.div>
      )
  )
};

export default TimesUpAlertModal;
