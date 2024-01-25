import React from 'react';
import { optionType } from 'src/types';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
// import '@styles/components/NormalSelect.scss';

type NormalSelectProps = {
  className?: string;
  unit?: string;
  value?: number;
  optionDatas: optionType[];
  onSelectChange(value: string): void;
};

const Wrapper = styled.div`
  .times {
    .select {
      position: relative;
      svg {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        height: 15px;
        color: #666;
        transition: all .3s;
      }
      &:hover {
        select {
          opacity: 1;
        }
        svg {
          color: #fff;
        }
      }
      select {
        text-align: center;
        background-color: #333;
        opacity: .7;
        color: #fff;
        border: none;
        padding: 5px 20px;
        font-size: 30px;
        border-radius: 2px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        transition: all .3s;
      }
    }
    .unit {
      display: inline-block;
      margin-top: 10px;
      font-size: 15px;
      color: #ccc;
    }
  }
`

const NormalSelect = (props: NormalSelectProps) => {
  const className = props.className ? ` ${props.className}` : '';
  const { unit, value, optionDatas, onSelectChange } = props;
  const options = optionDatas.map(num => (
    <option value={num.value} key={num.label}>
      {num.label}
    </option>
  ));
  return (
    <Wrapper>
      <div className={`times${className}`}>
        <div className="select">
          <select value={value} onChange={e => onSelectChange(e.target.value)}>
            {options}
          </select>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {unit && <label className="unit">{unit}</label>}
      </div>
    </Wrapper>
  );
};

export default NormalSelect;
