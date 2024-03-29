import React, { useState, useEffect, useRef } from 'react';
import {
  StartStatus,
  StartText,
  TimeSelectChangeType,
} from 'src/features/counter/types';
import ViewTimes from 'src/features/counter/components/ViewTimes';
import TimeSettingTools from 'src/features/counter/components/TimeSettingTools';
import RingToneSelectModal from 'src/features/counter/components/RingToneSelectModal';
import Alert from 'src/components/modals/Alert';
import TimesUpAlertModal from 'src/features/counter/components/TimesUpAlertModal';
import { RingToneType } from 'src/features/counter/types/ring_tone';
import { CounterCookie } from 'src/types/counterCookie';

import { Howl, Howler } from 'howler';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';

import transitionStyles from 'src/styles/transition_group.module.scss';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const RingToneSelector = dynamic(() => import('src/features/counter/components/RingToneSelector'), {
  ssr: false
})

const Wrapper = styled.div`
  width: 100%;
  max-width: 340px;
  position: relative;
  .show_total_seconds {
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px 0;
  }
  .content {
    .total_seconds {
      position: fixed;
      top: 0;
      left: 0;
      padding: 20px;
    }
    p {
      margin: 0;
    }
    .buttons {
      margin-top: 35px;
      button {
        font-size: 20px;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: relative;
        border: none;
        transition: all .3s;
        padding: 0;
        &:first-child {
          margin-right: 30px;
        }
        &:hover {
          transform: scale(1.05);
        }
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #000;
        }
      }
      .start {
        background-color: rgba(34, 138, 84, .4);
        color: ${({theme: { palette }}) => palette.iphoneGreen};
        &:hover {
          background-color: rgba(34, 138, 84, .6);
        }
      }
      .pause {
        background-color: rgba(205, 120, 31, .4);
        color: ${({theme: { palette }}) => palette.iphoneOrange};
        &:hover {
          background-color: rgba(205, 120, 31, .6);
        }
      }
      .cancel {
        background-color: rgba(105, 105, 105, .5);
        color: #fff;
        &:hover {
          background-color: rgba(105, 105, 105, .7);
        }
      }
    }
  }
`
let counting: any;

const CounterIndex = () => {
  const [cookies, setCookie] = useCookies(['counter_settings']);

  const onSetCookie = (settings: CounterCookie) => {
    setCookie('counter_settings', settings);
  };
  const counter_settings = cookies.counter_settings
    ? cookies.counter_settings
    : {};

  const presetTotalSeconds =
    counter_settings && counter_settings.hasOwnProperty('settingTimes')
      ? counter_settings.settingTimes
      : 0;

  const presetSeconds =
    counter_settings && counter_settings.hasOwnProperty('seconds')
      ? counter_settings.seconds
      : 0;
  const presetMinutesSeconds =
    counter_settings && counter_settings.hasOwnProperty('minutesSeconds')
      ? counter_settings.minutesSeconds
      : 0;
  const presetHoursSeconds =
    counter_settings && counter_settings.hasOwnProperty('hoursSeconds')
      ? counter_settings.hoursSeconds
      : 0;

  const presetViewSeconds =
    counter_settings && counter_settings.hasOwnProperty('viewSeconds')
      ? counter_settings.viewSeconds
      : '00';
  const presetViewMinutes =
    counter_settings && counter_settings.hasOwnProperty('viewMinutes')
      ? counter_settings.viewMinutes
      : '00';
  const presetViewHours =
    counter_settings && counter_settings.hasOwnProperty('viewHours')
      ? counter_settings.viewHours
      : '00';

  const presetRingTones =
    counter_settings && counter_settings.hasOwnProperty('ringTone')
      ? counter_settings.ringTone
      : {
          id: 'warm_morning',
          name: '溫暖早晨',
          url: '/audios/warm_morning.mp3',
        };
  // if (counter_settings) {
  //   console.log(counter_settings)
  // }

  const [remainTotalSeconds, setRemainTotalSeconds] = useState<number>(
    presetTotalSeconds,
  );
  const [tempRemainTotalSeconds, setTempRemainTotalSeconds] = useState<number>(
    presetTotalSeconds,
  );
  const [settingsTotalSeconds, setSettingsTotalSeconds] = useState<number>(
    presetTotalSeconds,
  );

  const [prevSeconds, setPrevSeconds] = useState<number>(presetSeconds);
  const [prevMinutesSeconds, setPrevMinutesSeconds] = useState<number>(
    presetMinutesSeconds,
  );
  const [prevHoursSeconds, setPrevHoursSeconds] = useState<number>(
    presetHoursSeconds,
  );

  const [viewSeconds, setViewSeconds] = useState<string>(presetViewSeconds);
  const [viewMinutes, setViewMinutes] = useState<string>(presetViewMinutes);
  const [viewHours, setViewHours] = useState<string>(presetViewHours);

  const [startStatus, setStartStatus] = useState<StartStatus>(StartStatus.stop);
  const [startText, setStartText] = useState<string>(StartText.start);

  const [showSettingAlert, setShowSettingAlert] = useState<boolean>(false);
  const [showTimesUpAlert, setShowTimesUpAlert] = useState<boolean>(false);
  const [showTotalSeconds, setShowTotalSeconds] = useState<boolean>(false);
  const [showViewTimes, setShowViewTimes] = useState<boolean>(false);
  const [showViewHours, setShowViewHours] = useState<boolean>(false);
  const [showRingToneSelect, setShowRingToneSelect] = useState<boolean>(false);
  const [showCircleBar, setShowCircleBar] = useState<boolean>(false);

  const [selectedRingTone, setSelectedRingTone] = useState<RingToneType>(
    presetRingTones,
  );

  const sound = new Howl({
    src: [selectedRingTone.url],
    loop: true,
    autoplay: false,
  });

  let t: number = remainTotalSeconds;
  let countingSeconds: string | number = 0;
  let countingMinutes: string | number = 0;
  let countingHours: string | number = 0;

  const calculateSettingsTime = (totalSeconds: number) => {
    // 一分鐘60秒 60分鐘3600秒(1小時) 24小時86400秒
    let newViewSeconds = '00';
    let numberSeconds = 0;
    let stringSeconds = '00';
    numberSeconds = totalSeconds % 60; // 餘分

    stringSeconds = String(numberSeconds);
    newViewSeconds = numberSeconds < 10 ? `0${stringSeconds}` : stringSeconds;
    setViewSeconds(newViewSeconds);

    let newViewMinutes = '00';
    let numberMinutes = 0;
    let stringMinutes = '00';

    numberMinutes = Math.floor(totalSeconds / 60); // 餘分
    numberMinutes = numberMinutes > 59 ? numberMinutes % 60 : numberMinutes;

    stringMinutes = String(numberMinutes);
    newViewMinutes = numberMinutes < 10 ? `0${stringMinutes}` : stringMinutes;
    setViewMinutes(newViewMinutes);

    let newViewHours = '00';
    let numberHours = 0;
    let stringHours = '00';

    numberHours = Math.floor(totalSeconds / 3600); // 餘小時
    stringHours = String(numberHours);
    newViewHours = numberHours < 10 ? `0${stringHours}` : stringHours;
    setViewHours(newViewHours);
  };

  const calculateTotalSeconds = (t: number) => {
    calculateSettingsTime(t);
    setRemainTotalSeconds(t);
  };

  const reset = () => {
    calculateSettingsTime(settingsTotalSeconds);
  };

  const onRing = () => {
    const sound1 = sound.play();
    sound.fade(0.0, 1.0, 1000, sound1);
    setShowCircleBar(false); // 為了重新刷動畫，要讓動畫的spring重新render
    setTempRemainTotalSeconds(remainTotalSeconds);
  };

  const myTimer = () => {
    t -= 1;
    countingSeconds = t % 60;
    countingMinutes = Math.floor(t / 60);
    countingMinutes =
      countingMinutes > 59 ? countingMinutes % 60 : countingMinutes;

    countingHours = Math.floor(t / 3600);

    countingSeconds =
      countingSeconds < 10 ? `0${countingSeconds}` : countingSeconds;
    countingMinutes =
      countingMinutes < 10 ? `0${countingMinutes}` : countingMinutes;
    countingHours = countingHours < 10 ? `0${countingHours}` : countingHours;

    setRemainTotalSeconds(t);
    setViewSeconds(countingSeconds as string);
    setViewMinutes(countingMinutes as string);
    setViewHours(countingHours as string);

    if (t === 0) {
      setStartStatus(StartStatus.stop);
      setStartText(StartText.start);
      setShowTimesUpAlert(true);
      onRing();

      setRemainTotalSeconds(settingsTotalSeconds);
      return clearInterval(counting);
    }
  };

  const onShowSettingAlert = () => {
    setShowSettingAlert(true);
  };

  const startCounting = () => {
    if (remainTotalSeconds < 1) {
      onShowSettingAlert();
      return;
    }
    switch (startStatus) {
      case StartStatus.start: // 按暫停
        clearInterval(counting);
        setTempRemainTotalSeconds(remainTotalSeconds);
        setShowCircleBar(false);
        setStartStatus(StartStatus.pause);
        setStartText(StartText.continue);
        break;
      case StartStatus.pause: // 按繼續
        setTempRemainTotalSeconds(remainTotalSeconds);
        setStartStatus(StartStatus.start);
        setShowCircleBar(true);
        setStartText(StartText.pause);
        counting = setInterval(myTimer, 1000);
        break;
      case StartStatus.stop: // 按開始
        setTempRemainTotalSeconds(remainTotalSeconds);
        setShowCircleBar(true);
        setStartStatus(StartStatus.start);
        setStartText(StartText.pause);
        setShowViewTimes(true);
        counting = setInterval(myTimer, 1000);
        break;
      default:
        break;
    }
  };

  const cancelCounting = () => {
    clearInterval(counting);
    setShowViewTimes(false);
    reset();
    setRemainTotalSeconds(settingsTotalSeconds);
    setStartStatus(StartStatus.stop);
    setStartText(StartText.start);
  };

  const onTotalSecondsChange = (
    t: number,
    type: string,
    viewTimes: number,
    numberTimes: number,
  ) => {
    setSettingsTotalSeconds(t);
    calculateTotalSeconds(t);

    const stringViewTimes =
      viewTimes < 10 ? `0${viewTimes}` : String(viewTimes);

    switch (type) {
      case TimeSelectChangeType.seconds:
        setPrevSeconds(numberTimes);
        onSetCookie({
          ...counter_settings,
          settingTimes: t,
          seconds: numberTimes,
          viewSeconds: stringViewTimes,
        });
        break;
      case TimeSelectChangeType.minutes:
        setPrevMinutesSeconds(numberTimes);
        onSetCookie({
          ...counter_settings,
          settingTimes: t,
          minutesSeconds: numberTimes,
          viewMinutes: stringViewTimes,
        });
        break;
      case TimeSelectChangeType.hour:
        setPrevHoursSeconds(numberTimes);
        onSetCookie({
          ...counter_settings,
          settingTimes: t,
          hoursSeconds: numberTimes,
          viewHours: stringViewTimes,
        });
        break;
      default:
        break;
    }
    
  };

  const onShowTotalSeconds = () => {
    const newShow = !showTotalSeconds;
    setShowTotalSeconds(newShow);
  };

  const onCloseTimesUpAlert = () => {
    setShowTimesUpAlert(false);
    reset();
  };

  const alertOk = () => {
    setShowSettingAlert(false);
    setShowViewTimes(false);
  };

  const onTimesUpOk = () => {
    onCloseTimesUpAlert();
    setShowViewTimes(false);
    Howler.stop();
  };

  const onRecount = () => {
    Howler.stop();
    startCounting();
    onCloseTimesUpAlert();
    setShowCircleBar(true);
    setTempRemainTotalSeconds(remainTotalSeconds);
  };

  const onSetRingTone = (rt: RingToneType) => {
    setSelectedRingTone(rt);
    setShowRingToneSelect(false);
    const newSettingCookie = { ...counter_settings, ringTone: rt };
    onSetCookie(newSettingCookie);
  };

  const stopClass = startStatus === StartStatus.start ? 'pause' : 'start';

  const [viewHeight, setViewHeight] = useState<number>(0);

  useEffect(() => {
    setViewHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    remainTotalSeconds < 3600
      ? setShowViewHours(false)
      : setShowViewHours(true);
  }, [remainTotalSeconds]);

  const viewTimesRef = useRef(null);
  const TimeSettingToolsRef = useRef(null);
  const nodeRef = showViewTimes ? viewTimesRef : TimeSettingToolsRef;

  return <Wrapper>
    <button
      className="show_total_seconds"
      type="button"
      onClick={onShowTotalSeconds}
    >
      show totalSeconds
    </button>
    <div className="content">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={showViewTimes ? 'ViewTimes' : "TimeSettingTools"}
          nodeRef={nodeRef}
          classNames={{
            appear: transitionStyles['fade-appear'],
            appearActive: transitionStyles['fade-appear-active'],
            enter: transitionStyles['fade-enter'],
            enterActive: transitionStyles['fade-enter-active'],
            exit: transitionStyles['fade-exit'],
            exitActive: transitionStyles['fade-exit-active'],
          }}
          timeout={300}
        >
          <div className="time-block">
            {showViewTimes ? (
              <ViewTimes
                ref={viewTimesRef}
                showViewHours={showViewHours}
                resetCircle={showCircleBar}
                totalSeconds={settingsTotalSeconds}
                remainTotalSeconds={tempRemainTotalSeconds}
                viewHours={viewHours}
                viewMinutes={viewMinutes}
                viewSeconds={viewSeconds}
                countingStatus={startStatus}
              />
            ) : (
              <TimeSettingTools
                ref={TimeSettingToolsRef}
                settingsTotalSeconds={settingsTotalSeconds}
                seconds={Number(viewSeconds)}
                minutes={Number(viewMinutes)}
                hours={Number(viewHours)}
                prevSeconds={prevSeconds}
                prevMinutesSeconds={prevMinutesSeconds}
                prevHoursSeconds={prevHoursSeconds}
                onTotalSecondsChange={(s, type, viewTimes, numberTimes) =>
                  onTotalSecondsChange(s, type, viewTimes, numberTimes)
                }
              />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <div className="buttons">
        <button className="cancel" onClick={cancelCounting} type="button">
          取消
        </button>
        <button className={stopClass} onClick={startCounting} type="button">
          {startText}
        </button>
      </div>
      {showTotalSeconds && (
        <div className="total_seconds">
          <div>剩餘總秒數：{remainTotalSeconds}</div>
          <div>設定總秒數：{settingsTotalSeconds}</div>
        </div>
      )}
    </div>
    <RingToneSelector
      currentRingTone={selectedRingTone}
      onClick={() => setShowRingToneSelect(true)}
    />
    <RingToneSelectModal
      show={showRingToneSelect}
      currentRingTone={selectedRingTone}
      viewHeight={viewHeight}
      onSubmit={rt => onSetRingTone(rt)}
      onCancel={() => setShowRingToneSelect(false)}
    />
    <Alert
      message="請設定時間再開始計時！"
      show={showSettingAlert}
      yes={alertOk}
      viewHeight={viewHeight}
    />
    <TimesUpAlertModal
      viewHeight={viewHeight}
      message="時間到"
      show={showTimesUpAlert}
      yes={onTimesUpOk}
      onRecount={onRecount}
    />
  </Wrapper>
}

export default CounterIndex
