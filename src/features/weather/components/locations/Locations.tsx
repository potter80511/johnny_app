import React from 'react';
import LocationItem from 'src/features/weather/components/locations/LocationItem';
import {
  WeatherLocationType,
  TaiwanCities,
  TemperatureType,
} from 'src/features/weather/enums';
import {
  CurrentDayDetails,
  WeekTemperature,
} from 'src/features/weather/types/Weather';
import {
  LocationValue,
  SpreadIndex,
} from 'src/features/weather/types';
import { styled } from 'styled-components';

type LocationsProps = {
  spread: boolean;
  translateY: number;
  openedLocationIndex: number | null;
  temperatureType: TemperatureType;
  locationsData: CurrentDayDetails[];
  weekTemperatureArray: WeekTemperature[];
  spreadOut: (tlY: number, spreadIndex: SpreadIndex) => void;
  getWeekWeather: (
    locationName: LocationValue,
    locationType: WeatherLocationType,
    city: TaiwanCities,
  ) => void;
  onDelete: (deleteIndex: number) => void;
};

const border = '1px solid rgba(255, 255, 255, .3)';

const Wrapper = styled.div`
  overflow: hidden;
  transition: all .3s;
  .wrap {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
    @media (min-width: 769px) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
  .location-item {
    background-size: cover;
    background-position: center;
    padding: 15px;
    overflow: hidden;
    transition: min-height .3s;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    text-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, .2);
    }
    &.item-spread {
      padding: 15px 0;
      cursor: unset;
    }
    .overview {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      position: relative;
      .moment, .location-name {
        display: block;
      }
      .flex-left {
        .location-name {
          font-size: 24px;
          .city-name {
            font-size: 13px;
          }
        }
      }
      .temperature {
        font-size: 42px;
      }
      .delete {
        position: absolute;
        right: -5px;
        top: -5px;
        padding: 0;
        svg {
          color: #fff;
          opacity: .3;
          height: 15px;
          font-size: 15px;
        }
        &:hover svg {
          opacity: .7;
        }
      }
    }
    .location-details {
      overflow: scroll;
      .city-name {
        font-size: 13px;
        position: absolute;
        right: 15px;
        top: 15px;
      }
      .details-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .1);
        z-index: 1;
      }
      .today-every-time, .current-description {
        border-top: ${border};
        border-bottom: ${border};
      }
      .today-every-time {
        padding: 8px 0;
        width: 100%;
        display: flex;
        transition: all .3s;
        overflow: scroll;
        .item {
          min-width: 60px;
          span {
            display: block;
            text-align: center;
          }
          .wx {
            padding: 10px 0;
            img {
              width: auto;
              height: 16px;
            }
          }
        }
      }
      .location-wx-common {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: -15px;
        padding-top: 12px;
        h2, span {
          text-align: center;
        }
        h2 {
          margin: 0;
          font-size: 26px;
          font-weight: normal;
        }
        .wx {
          font-size: 15px;
          img {
            height: 15px;
            width: auto;
            display: inline-block;
          }
        }
        .current-temperature {
          font-size: 74px;
          font-weight: lighter;
        }
      }
      .location-wx-fixed {
        position: absolute;
        top: 15px;
        z-index: 100000;
        .today-every-time {
          margin-top: 30px;
        }
      }
      .content {
        z-index: 10;
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: scroll;
        .location-wx {
          position: fixed;
          top: 0;
          transition: all .3s;
          transform: translate3d(0,0,0);

        }
        .more {
          .today {
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              display: inline-block;
            }
            .day {
              .day-name {
                font-size: 18px;
              }
              .today-today {
                margin-left: 10px;
                font-size: 13px;
              }
            }
            .min-t {
              margin-left: 20px;
            }
          }
          .week-weather {
            padding: 10px 15px;
            div.week-item{
              justify-content: space-between;
              align-items: center;
              &:not(:last-child) {
                padding-bottom: 10px;
              }
              .extreame-t {
                span {
                  display: inline-block;
                }
                .min {
                  margin-left: 20px;
                }
              }
            }
          }
          .current-description {
            padding: 10px 15px;
            p {
              margin: 0;
            }
          }
          .others {
            padding: 0 15px 15px;
            flex-wrap: wrap;
            div.other-item {
              padding: 10px 0;
              width: 50%;
              border-bottom: ${border};
              &:last-child {
                border-bottom: none;
              }
              @media (min-width: 576px) {
                &:nth-last-child(2) {
                  border-bottom: none;
                }
              }
              @media (max-width: 575px) {
                width: 100%;
              }
              label, .value {
                display: block;
                text-shadow: 0px 2px 5px rgba(0, 0, 0, .5);
              }
              label {
                font-size: 13px;
                color: #ccc;
              }
              .value {
                font-size: 30px;
              }
              .unit {
                font-size: 20px;
              }
            }
          }
        }
      }
      .details-tools {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        z-index: 100;
        background: rgba(0, 0, 0, .4);
        border-top: ${border};
        svg {
          color: #ccc;
          transition: all .3s;
          font-size: 16px;
          height: 16px;
          &:hover {
            color: #fff;
          }
        }
        .close {
          padding: 0;

        }
      }
    }
  }
`
const Locations = (props: LocationsProps) => {
  const {
    spread,
    translateY,
    openedLocationIndex,
    temperatureType,
    locationsData,
    weekTemperatureArray,
    spreadOut,
    getWeekWeather,
    onDelete,
  } = props;

  const locationItem = locationsData.map((item, index) => (
    <LocationItem
      key={`location-item- + ${index + 1}`}
      locationData={item}
      weekTemperatureArray={weekTemperatureArray}
      index={index}
      temperatureType={temperatureType}
      translateD={translateY}
      spread={openedLocationIndex === index}
      spreadOut={(tlY, spreadIndex) => spreadOut(tlY, spreadIndex)}
      getWeekWeather={(locationName, locationType, city) =>
        getWeekWeather(locationName, locationType, city)
      }
      onDelete={deleteIndex => onDelete(deleteIndex)}
    />
  ));

  return (
    <Wrapper
      style={{ transform: `translateY(-${translateY}px)` }}
    >
      {locationsData.length > 0 ? locationItem : <div>loading</div>}
    </Wrapper>
  );
};

export default Locations;
