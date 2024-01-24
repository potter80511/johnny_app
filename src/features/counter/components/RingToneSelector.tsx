import React from 'react';
import { RingToneType } from 'src/features/counter/types/ring_tone';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

type RingToneSelectorProps = {
  currentRingTone: RingToneType;
  onClick?(): void;
};

const Wrapper = styled.div`
  background-color: rgba(105, 105, 105, .2);
  min-width: 300px;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s;
  color: #888;
  .music-name {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    svg {
      color: #333;
      margin-left: 10px;
      transition: all .3s;
      height: 15px;
      font-size: 15px;
    }
  }
  &:hover {
    background-color: rgba(105, 105, 105, .5);
    color: #fff;
    svg {
      color: #888;
    }
  }
`

const RingToneSelector = (props: RingToneSelectorProps) => {
  const { currentRingTone, onClick } = props;
  return (
    <Wrapper onClick={onClick}>
      <label>計時結束鈴聲</label>
      <span className="music-name">
        {currentRingTone.name}
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </Wrapper>
  );
};

export default RingToneSelector;
