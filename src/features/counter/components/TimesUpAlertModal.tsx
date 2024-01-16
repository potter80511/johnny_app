import React from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { alertBase } from '@/features/counter/Styled';

export interface TimesUpAlertProps {
  id?: string;
  viewHeight?: number;
  className?: string;
  show?: boolean;
  message: string;
  yes(): void;
  onRecount(): void;
}

const AnimateWrapper = styled(animated.div)`
  ${alertBase};
  background-color: rgba(22, 29, 35, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .modal-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    .modal-content {
      p {
        font-size: 22px;
        margin-bottom: 20px;
        line-height: 1;
        display: flex;
        align-items: center;
        svg {
          font-size: 18px;
          height: 18px;
          margin-right: 10px;
        }
      }
    }
    button {
      border-radius: 100em;
      color: #fff;
      transition: all .3s;
    }
    .yes {
      background-color: #fe9e0c;
      font-size: 22px;
      padding: 5px 40px;
      &:hover {
        color: #724500;
        background-color: #ffe6c0;
      }
    }
    .reset {
      background-color: rgba(255, 255, 255, .5);
      margin-top: 40px;
      font-size: 13px;
      padding: 5px 20px;
      &:hover {
        color: #333;
        background-color: rgba(255, 255, 255, .8);
      }
    }
  }
`

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
        <AnimateWrapper
          id={id}
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
        </AnimateWrapper>
      )
  )
};

export default TimesUpAlertModal;
