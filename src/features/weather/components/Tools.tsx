import React from 'react';
import {
  TemperatureType,
  SwitchButtonDataType,
} from 'src/features/weather/enums';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styled from 'styled-components';

type SwitchButtonProps = SwitchButtonDataType & {
  currentType: TemperatureType;
  onClick: (value: TemperatureType) => void;
};

const SwitchButton = (props: SwitchButtonProps) => {
  const { currentType, value, name, onClick } = props;
  const className = currentType === value ? 'active' : '';
  return (
    <button className={className} onClick={() => onClick(value)} type="button">
      {name}
    </button>
  );
};

type ToolsProps = {
  show: boolean;
  temperatureType: TemperatureType;
  showCreateItemModal: (show: boolean) => void;
  onSwitchTemperatureType: (value: TemperatureType) => void;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  .switch {
    font-size: 15px;
    button {
      font-size: 15px;
      padding: 0;
      opacity: .3;
      &.active {
        opacity: 1;
      }
    }
    span {
      padding: 0 5px;
    }
  }
  .home {
    color: #888;
    text-decoration: none;
    font-weight: bold;
    transition: all .3s;
    &:hover {
      color: #eee;
    }
  }
  #add-location {
    border: 1px solid #fff;
    width: 20px;
    height: 20px;
    line-height: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 16px;
    svg {
      color: #fff;
      height: 11px;
    }
  }
`

const Tools = (props: ToolsProps) => {
  const {
    show,
    temperatureType,
    showCreateItemModal,
    onSwitchTemperatureType,
  } = props;
  return (
    show && (
      <Wrapper>
        <div className="switch">
          <SwitchButton
            currentType={temperatureType}
            value={TemperatureType.Celsius}
            name="°C"
            onClick={value => onSwitchTemperatureType(value)}
          />
          <span>/</span>
          <SwitchButton
            currentType={temperatureType}
            value={TemperatureType.Fahrenheit}
            name="°F"
            onClick={value => onSwitchTemperatureType(value)}
          />
        </div>
        <Link href="/" className="home">
          Johnny's App
        </Link>
        <button
          id="add-location"
          onClick={() => showCreateItemModal(true)}
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </Wrapper>
    )
  );
};

export default Tools;
