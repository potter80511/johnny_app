import React from 'react';
import { animated, Spring, SpringValue } from 'react-spring';
import { CSSTransition } from 'react-transition-group';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StartStatus } from '@/features/counter/types';
import transitionStyles from '@/styles/transition_group.module.scss';
import styled from 'styled-components';
import { CustomAnimation } from '@/styles/Styled/CustomAnimation';

interface ViewTimesProps {
  showViewHours: boolean;
  resetCircle: boolean;
  totalSeconds: number;
  remainTotalSeconds: number;
  viewHours: string;
  viewMinutes: string;
  viewSeconds: string;
  countingStatus: StartStatus;
}

const ViewTimesWrapper = styled.div`
  ${CustomAnimation};
  .circle {
    position: relative;
    width: 90%;
    margin: 0 auto;
    z-index: 1;
    display: flex;
    align-items: center;
    .counting {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .label {
        color: #0e9457;
        font-size: 18px;
        transition: color .3s;
        &.startCounting {
          color: #888;
          animation: fadeInfinite 2.5s infinite ease-in-out;
        }
        svg {
          font-size: 13px;
          height: 13px;
          margin-right: 5px;
        }
      }
      .time {
        font-size: 45px;
        transition: font-size .6s;
        &.font-big {
          font-size: 55px;
        }
      }
    }
    .circleSvg {
      transform: rotate(-90deg);
    }
  }
  .notice {
    margin: 20px 0 !important;
  }
`

const ViewTimes = (props: ViewTimesProps) => {
  const {
    showViewHours,
    resetCircle,
    totalSeconds,
    remainTotalSeconds,
    viewHours,
    viewMinutes,
    viewSeconds,
    countingStatus,
  } = props;

  const height = 300;
  const r = (height - 10) / 2;
  const circleHeight = height;
  const circleRadius = r;
  const circleLength = 2 * r * Math.PI;
  const circleStrokeWidth = 7;
  const circleStrokeColor = '#ee951b';

  const passedTimeRate =
    totalSeconds - remainTotalSeconds === 0
      ? 0
      : (totalSeconds - remainTotalSeconds) / totalSeconds;
  const circlePassedLength = circleLength * passedTimeRate;

  const fontBigClass = !showViewHours ? ' font-big' : '';
  const countingClass =
    countingStatus === StartStatus.start ? ' startCounting' : '';

  const statusText = () => {
    switch (countingStatus) {
      case StartStatus.start:
        return '計時中..';
      case StartStatus.pause:
        return '計時暫停';
      case StartStatus.stop:
        return '計時停止';
      default:
        break;
    }
  };

  return (
    <ViewTimesWrapper style={{ height: circleHeight }}>
      <div className="circle" style={{ height: circleHeight }}>
        <svg height="100%" width="100%" className="circleSvg">
          <circle
            cx={circleHeight / 2}
            cy={circleHeight / 2}
            r={circleRadius}
            stroke="#222"
            strokeWidth="7"
            fill="none"
          />
          {resetCircle ? (
            <Spring
              from={{ strokeDashoffset: circlePassedLength }}
              to={{ strokeDashoffset: circleLength }}
              config={{ duration: remainTotalSeconds * 1000 }}
            >
              {(springValues: { strokeDashoffset: SpringValue<number>; }) => (
                <animated.circle
                  style={springValues}
                  cx={circleHeight / 2}
                  cy={circleHeight / 2}
                  r={circleRadius}
                  stroke={circleStrokeColor}
                  strokeWidth={circleStrokeWidth}
                  strokeDasharray={circleLength}
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </Spring>
          ) : (
            <circle
              cx={circleHeight / 2}
              cy={circleHeight / 2}
              r={circleRadius}
              stroke={circleStrokeColor}
              strokeWidth={circleStrokeWidth}
              strokeDasharray={circleLength}
              strokeDashoffset={
                countingStatus === StartStatus.pause
                  ? circlePassedLength
                  : circleLength
              }
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>
        <div className="counting">
          <span className={`label${countingClass}`}>
            <FontAwesomeIcon icon={faStopwatch} />
            {statusText()}
          </span>
          <p className={`time${fontBigClass}`}>
            <CSSTransition
              in={showViewHours}
              classNames={{
                appear: transitionStyles['fade-appear'],
                appearActive: transitionStyles['fade-appear-active'],
                enter: transitionStyles['fade-enter'],
                enterActive: transitionStyles['fade-enter-active'],
                exit: transitionStyles['fade-exit'],
                exitActive: transitionStyles['fade-exit-active'],
              }}
              timeout={300}
              unmountOnExit
            >
              <span>{viewHours}：</span>
            </CSSTransition>
            <span>{viewMinutes}：</span>
            <span>{viewSeconds}</span>
          </p>
        </div>
      </div>
    </ViewTimesWrapper>
  );
};

export default ViewTimes;
