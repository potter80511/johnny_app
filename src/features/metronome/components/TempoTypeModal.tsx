import React, { useEffect } from 'react';
import { TimeSignature } from 'src/features/metronome/enums/TimeSignature';
import { timeSignatureData } from 'src/features/metronome/data';
import { Sound } from 'src/features/metronome/types/Sound';

import { Transition, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import transitionStyles from 'src/styles/transition_group.module.scss';

type TimeSignatureOptionProp = {
  name: TimeSignature;
  active: boolean;
  onClick: () => void;
};

const TimeSignatureOption = (props: TimeSignatureOptionProp) => {
  const { name, active, onClick } = props;
  const activeClass = active ? ' active' : '';
  return (
    <div className={`item${activeClass}`} onClick={onClick}>
      {name}
    </div>
  );
};

type TempoTypeModalProp = {
  show: boolean;
  currentTimeSignature: TimeSignature;
  sound: Sound;
  onSignatureChange: (signature: TimeSignature) => void;
  closeModal: () => void;
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  .back-drop {
    position: absolute;
  }
  .back-drop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
`
const Modal = styled.div`
  position: absolute;
  width: 100%;
  max-width: 575px;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  * {
    color: white;
  }
  .modal-head,
  .modal-body {
    text-align: center;
  }
  .modal-head {
    position: relative;
    background-color: #181918;
    padding: 10px;
    button {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s;
      margin: 0;
      font-size: 13px;
      &:hover {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
      }
    }
    h3 {
      margin: 0;
    }
  }
  .modal-body {
    height: 100%;
    max-height: 580px;
    overflow: scroll;
    background-image: linear-gradient(#4a4a4a, #191a19);
    .item {
      cursor: pointer;
      padding: 5px 0;
      transition: all 0.3s;
      text-shadow: 1px 1px 2px black;
      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
      &.active {
        color: #fcfe08;
      }
      &:first-child {
        padding-top: 10px;
      }
      &:last-child {
        padding-bottom: 10px;
      }
    }
  }
`

const TempoTypeModal = (props: TempoTypeModalProp) => {
  const {
    show,
    currentTimeSignature,
    sound: { show: showSound, select },
    onSignatureChange,
    closeModal,
  } = props;

  useEffect(() => {
    if (show) {
      showSound.play();
    }
  }, [show]);

  return (
    <Transition in={show} timeout={600} unmountOnExit>
      <ModalWrapper>
        <CSSTransition
          appear
          in={show}
          timeout={300}
          classNames={{
            appear: transitionStyles['fade-appear'],
            appearActive: transitionStyles['fade-appear-active'],
            enter: transitionStyles['fade-enter'],
            enterActive: transitionStyles['fade-enter-active'],
            exit: transitionStyles['fade-exit'],
            exitActive: transitionStyles['fade-exit-active'],
          }}
          unmountOnExit
        >
          <div className="back-drop" onClick={closeModal} />
        </CSSTransition>
        <CSSTransition
          appear
          in={show}
          timeout={600}
          classNames={{
            appear: transitionStyles['slideInCenterUp-appear'],
            appearActive: transitionStyles['slideInCenterUp-appear-active'],
            enter: transitionStyles['slideInCenterUp-enter'],
            enterActive: transitionStyles['slideInCenterUp-enter-active'],
            exit: transitionStyles['slideInCenterUp-exit'],
            exitActive: transitionStyles['slideInCenterUp-exit-active'],
          }}
          unmountOnExit
        >
          <Modal>
            <div className="modal-head">
              <button type="button" onClick={closeModal}>
                取消
              </button>
              <h3>拍號</h3>
            </div>
            <div className="modal-body">
              {timeSignatureData.map(signature => {
                return (
                  <TimeSignatureOption
                    key={signature}
                    name={signature}
                    active={signature === currentTimeSignature}
                    onClick={() => {
                      select.play();
                      onSignatureChange(signature);
                    }}
                  />
                );
              })}
            </div>
          </Modal>
        </CSSTransition>
      </ModalWrapper>
    </Transition>
  );
};

export default TempoTypeModal;
