import React, { useState, useEffect, ForwardedRef, forwardRef } from 'react';
import NormalSelect from 'src/components/form_elements/NormalSelect';
import { OptionType } from 'src/types';
import { TimeSelectChangeType } from 'src/features/counter/types';
import { styled } from 'styled-components';

type TimeSettingToolDatas = {
  seconds: OptionType[];
  minutes: OptionType[];
  hours: OptionType[];
};

type TimeSettingToolsType = {
  seconds: number;
  minutes: number;
  hours: number;
  prevSeconds: number;
  prevMinutesSeconds: number;
  prevHoursSeconds: number;
  settingsTotalSeconds: number;
  onTotalSecondsChange(
    s: number,
    type: string,
    viewTimes: number,
    numberTimes: number,
  ): void;
};

const Wrapper = styled.div`
  .flex.tools {
    margin-top: 20px;
    justify-content: center;
    > div:not(:last-child) {
      margin-right: 20px;
    }
  }
`
const Title = styled.h1`
  font-size: 80px;
  margin: 0 0 30px;
  color: #8d8d92;
  @media (max-width: 575px) {
    font-size: 50px;
    margin: 0 0 20px;
  }
`

const toolDatas: TimeSettingToolDatas = {
  seconds: [],
  minutes: [],
  hours: [],
};

for (let i = 0; i <= 59; i++) {
  toolDatas.seconds.push({
    label: String(i),
    value: String(i),
  });
  toolDatas.minutes.push({
    label: String(i),
    value: String(i),
  });
}
for (let i = 0; i <= 23; i++) {
  toolDatas.hours.push({
    label: String(i),
    value: String(i),
  });
}

const TimeSettingTools = (props: TimeSettingToolsType, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    seconds,
    minutes,
    hours,
    prevSeconds,
    prevMinutesSeconds,
    prevHoursSeconds,
    settingsTotalSeconds,
    onTotalSecondsChange,
  } = props;
  const [tempTotalSeconds, setTempTotalSeconds] = useState<number>(
    settingsTotalSeconds,
  );

  const onTimeChange = (t: string, type: string) => {
    let numberTimes = Number(t);
    let newTotalSeconds: number = 0;
    switch (type) {
      case TimeSelectChangeType.seconds:
        newTotalSeconds = tempTotalSeconds - prevSeconds + numberTimes;
        break;
      case TimeSelectChangeType.minutes:
        numberTimes *= 60;
        newTotalSeconds = tempTotalSeconds - prevMinutesSeconds + numberTimes;
        break;
      case TimeSelectChangeType.hour:
        numberTimes *= 3600;
        newTotalSeconds = tempTotalSeconds - prevHoursSeconds + numberTimes;
        break;
      default:
        break;
    }

    setTempTotalSeconds(newTotalSeconds);
    onTotalSecondsChange(newTotalSeconds, type, Number(t), numberTimes);
  };
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (firstLoad) {
      onTimeChange(String(seconds), TimeSelectChangeType.seconds);
      onTimeChange(String(minutes), TimeSelectChangeType.minutes);
      onTimeChange(String(hours), TimeSelectChangeType.hour);
      setFirstLoad(false);
    }
  }, [firstLoad]);

  return (
    <Wrapper ref={ref}>
      <Title>Counter</Title>
      <p>請設定時間開始計時</p>
      <div className="flex tools">
        <NormalSelect
          className="hours"
          unit="小時"
          value={hours}
          optionDatas={toolDatas.hours}
          onSelectChange={t => onTimeChange(t, TimeSelectChangeType.hour)}
        />
        <NormalSelect
          className="minutes"
          unit="分鐘"
          value={minutes}
          optionDatas={toolDatas.minutes}
          onSelectChange={t => onTimeChange(t, TimeSelectChangeType.minutes)}
        />
        <NormalSelect
          className="seconds"
          unit="秒鐘"
          value={seconds}
          optionDatas={toolDatas.seconds}
          onSelectChange={t => onTimeChange(t, TimeSelectChangeType.seconds)}
        />
      </div>
    </Wrapper>
  );
};

export default forwardRef(TimeSettingTools);
