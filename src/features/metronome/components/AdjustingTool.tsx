import React, { useState, useEffect } from 'react';

import { Sound } from 'src/features/metronome/types/Sound';
import ClickNHold from 'react-click-n-hold';
import styled from 'styled-components';

const pressingTime = 1;

type AdjustingToolProp = {
  label: string;
  currentValue: string | number;
  sound: Sound;
  onClick: (newValue: number) => void;
};

const Wrapper = styled.div`
  max-width: 150px;
  label {
    display: inline-block;
    margin-bottom: 10px;
    color: #aaa;
  }
`
const ToolButtons = styled.div`
  display: flex;
  justify-content: center;
  button {
    width: 60px;
    height: 60px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid #111;
    font-size: 0;
    text-shadow: 1px 1px 1px #888;
    box-shadow: inset 1px 1px 0 #888;
    &:first-child {
      margin-right: 10px;
    }
    &:after {
      font-size: 32px;
    }
    &.add {
      &:after {
        content: '＋';
      }
    }
    &.reduce {
      &:after {
        content: '－';
      }
    }
    &.active {
      background: #49595f;
      box-shadow: inset 2px 3px 2px #2f3c41;
      &:after {
        color: #44feff;
        text-shadow: 0 0 5px #44feff;
      }
    }
  }
`

const AdjustingTool = (props: AdjustingToolProp) => {
  const {
    label,
    currentValue,
    sound: { adjust },
    onClick,
  } = props;

  const [onLeft, setOnLeft] = useState<boolean>(false);
  const [onRight, setOnRight] = useState<boolean>(false);
  const [longClick, setLongClick] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [temp, setTemp] = useState<boolean>(false);

  const addStart = () => {
    setIsAdding(true);
  };

  const end = () => {
    setLongClick(false);
    setIsAdding(false);
  };

  const clickNHold = () => {
    setLongClick(true);
    setTemp(!temp);
  };

  useEffect(() => {
    if (longClick) {
      if (isAdding) {
        onClick(Number(currentValue) + 1);
      } else {
        onClick(Number(currentValue) - 1);
      }
      adjust.play();
      setTimeout(() => {
        setTemp(!temp);
      }, 100);
    }
  }, [temp]);

  const click = (newValue: number) => {
    adjust.play();
    onClick(newValue);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <ToolButtons>
        <ClickNHold
          time={pressingTime}
          onStart={addStart}
          onClickNHold={clickNHold}
          onEnd={end}
        >
          <button
            type="button"
            onClick={() => click(Number(currentValue) + 1)}
            className={`add${onLeft ? ' active' : ''}`}
            onMouseDown={() => setOnLeft(true)}
            onMouseUp={() => setOnLeft(false)}
            onTouchStart={() => setOnLeft(true)}
            onTouchEnd={() => setOnLeft(false)}
          >
            <span />
          </button>
        </ClickNHold>
        <ClickNHold time={pressingTime} onClickNHold={clickNHold} onEnd={end}>
          <button
            type="button"
            onClick={() => click(Number(currentValue) - 1)}
            className={`reduce${onRight ? ' active' : ''}`}
            onMouseDown={() => setOnRight(true)}
            onMouseUp={() => setOnRight(false)}
            onTouchStart={() => setOnRight(true)}
            onTouchEnd={() => setOnRight(false)}
          >
            <span />
          </button>
        </ClickNHold>
      </ToolButtons>
    </Wrapper>
  );
};

export default AdjustingTool;
