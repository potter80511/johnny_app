import React from 'react';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LocationData } from 'src/features/weather/types';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import transitionStyles from 'src/styles/transition_group.module.scss';

type CreateLocationItemModalProps = {
  show: boolean;
  locationOptions: LocationData[];
  searchValue: string;
  nextIndex: number;
  onCancel: (show: boolean) => void;
  onSearchInputChange: (value: string) => void;
  onCreateLocation: (newLocation: LocationData, nextIndex: number) => void;
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .9);
  .container-wrap {
    display: block;
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
  }
  .input-head {
    padding: 15px;
    background: #2e2f30;
    border-bottom: 1px solid #404446;
    label {
      display: block;
      width: 100%;
      font-size: 15px;
      text-align: center;
      margin-bottom: 20px;
    }
    .input-block {
      display: flex;
      .input-group {
        flex: 1;
        background-color: #525759;
        padding: 5px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        position: relative;
        transition: all .3s;
        >svg {
          color: #b0b1b8;
          font-size: 13px;
          height: 13px;
          margin-right: 5px;
        }
        &:hover {
          background-color: #666d6f;
        }
        ::placeholder {
          color: #b0b1b8;
        }
        input {
          background: none;
          border: none;
          flex: 1;
          color: #fff;
          &:focus {
            outline: none;
          }
        }
        button {
          width: 15px;
          height: 15px;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #b0b1b8;
          border-radius: 50%;
          svg {
            font-size: 10px;
            height: 10px;
            color: #555;
          }
        }
      }
    }
  }
  .location-options {
    width: 100%;
    max-height: 400px;
    overflow: scroll;
    padding: 5px;
    background: #333;
    box-sizing: border-box;
    .location-option {
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background-color: #666d6f;
      }
    }
  }
`

const CreateLocationItemModal = (props: CreateLocationItemModalProps) => {
  const {
    show,
    locationOptions,
    searchValue,
    nextIndex,
    onCancel,
    onSearchInputChange,
    onCreateLocation,
  } = props;

  const locationOptionsBlock = locationOptions.map((item, index) => (
    <div
      className="location-option"
      key={`${index + 1}`}
      onClick={() => onCreateLocation(item, nextIndex)}
    >
      <span className="container-wrap">{item.name}</span>
    </div>
  ));
  return (
    <CSSTransition in={show} timeout={500} classNames={{
      appear: transitionStyles['slideFadeInUp-appear'],
      appearActive: transitionStyles['slideFadeInUp-appear-active'],
      enter: transitionStyles['slideFadeInUp-enter'],
      enterActive: transitionStyles['slideFadeInUp-enter-active'],
      exit: transitionStyles['slideFadeInUp-exit'],
      exitActive: transitionStyles['slideFadeInUp-exit-active']
    }} unmountOnExit>
      <ModalWrapper>
        <div className="input-head">
          <div className="container-wrap">
            <label>輸入城市或鄉鎮名字</label>
            <div className="input-block">
              <div className="input-group">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  type="text"
                  placeholder="搜尋"
                  value={searchValue}
                  onChange={e => onSearchInputChange(e.target.value)}
                />
                <button onClick={() => onSearchInputChange('')} type="button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <button onClick={() => onCancel(false)} type="button">
                取消
              </button>
            </div>
          </div>
        </div>
        {locationOptions.length > 0 && searchValue !== '' && (
          <div className="location-options">{locationOptionsBlock}</div>
        )}
      </ModalWrapper>
    </CSSTransition>
  );
};

export default CreateLocationItemModal;
