import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTransition, animated } from 'react-spring';
import { styled } from 'styled-components';
import { alertBase } from '@/features/counter/Styled';

export type AlertProps = {
  id?: string;
  className?: string;
  viewHeight?: number;
  show?: boolean;
  message: string;
  yesText?: string;
  noText?: string;
  yes?(): void;
  no?(): void;
  onClose?(): void;
};

const AnimateWrapper = styled(animated.div)`
  ${alertBase};
  .background {
    background-color: rgba(0, 0, 0, .8);
    width: 100%;
    height: 100%;
  }
  .modal-block {
    text-align: center;
    border-radius: 5px;
    border: 2px solid #222;
    border: 1px solid #2c3745;
    padding: 10px 0 30px;
    width: 80%;
    max-width: 500px;
    background-color: rgba(29, 37, 47 ,.75);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #394d5c;
      transition: all .3s;
      svg {
        font-size: 18px;
        height: 18px;
      }
      &:hover {
        color: #506e85;
      }
    }
    .message {
      font-size: 22px;
    }
    button {
      padding: 4px 25px;
      font-size: 15px;
      border-radius: 100em;
      transition: all .3s;
    }
    .yes {
      background-color: #fe9e0c;
      color: #fff;
      &:hover {
        color: #724500;
        background-color: #ffe6c0;
      }
    }
    .no {
      background-color: #aaa;
      color: #333;
    }
  }
`

const Alert = (props: AlertProps) => {
  const className = props.className ? ` ${props.className}` : '';
  const {
    id,
    message,
    show,
    yesText = 'ok',
    noText = 'cancel',
    yes,
    no,
    onClose,
  } = props;

  const viewHeight = `${props.viewHeight}px`;

  const handleClose = () => {
    if(!!onClose) {
      onClose()
    } else if(!!no) {
      no()
    } else if(!!yes) {
      yes()
    } else {
      return
    }
  };

  const onYes = () => {
    yes && yes();
    handleClose();
  };
  const fade = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const fadeScale = useTransition(show, {
    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.7, 0.7)' },
    enter: { opacity: 1, transform: 'translate(-50%, -50%) scale(1, 1)' },
    leave: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.7, 0.7)' },
    config: {
      duration: 300,
    },
  });

  return fade(
    (fadeProps, fadeItem) =>
      fadeItem && (
        <AnimateWrapper
          id={id}
          className={`alert-modal${className}`}
          style={{ height: viewHeight, ...fadeProps }}
        >
          <div className="background" onClick={handleClose} />
          {fadeScale(
            (fadeScaleProps, fadeScaleItem) =>
              fadeScaleItem && (
                <animated.div
                  className="modal-block"
                  style={fadeScaleProps}
                >
                  <button className="close" onClick={handleClose} type="button">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div className="modal-content">
                    <p className="message">{message}</p>
                  </div>
                  <button
                    className="yes"
                    onClick={onYes}
                    style={{ marginRight: no ? 10 : 0 }}
                    type="button"
                  >
                    {yesText}
                  </button>
                  {no && (
                    <button className="no" onClick={handleClose} type="button">
                      {noText}
                    </button>
                  )}
                </animated.div>
              )
            )
          }
        </AnimateWrapper>
      )
  )
};

export default Alert;
