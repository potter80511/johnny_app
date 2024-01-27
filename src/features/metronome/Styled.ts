import { keyframes } from "styled-components"

export const fadeOutSlowly = keyframes`
  0% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

export const lightsOn = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`

export const blueLightsOn = keyframes`
  0% {
    box-shadow: 0 0 5px black;
  }

  50% {
    box-shadow: 0 0 5px #61caf7;
  }

  100% {
    box-shadow: 0 0 5px black;
  }
`

export const greenLightsOn = keyframes`
  0% {
    opacity: 0.3;
    box-shadow: 0 0 5px black;
  }

  50% {
    box-shadow: 0 0 5px #7df79d;
  }

  100% {
    opacity: 1;
    box-shadow: 0 0 5px black;
  }
`
export const scaleBounceOn = keyframes`
  0% {
    transform: scale(0.9, 0.9);
  }

  25% {
    transform: scale(1.5, 1.5);
  }

  50% {
    transform: scale(1, 1) rotateZ(60deg);
  }

  75% {
    transform: rotateZ(-60deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
`

export const scaleBounceOff = keyframes`
  0% {
    transform: scale(0.9, 0.9);
  }

  25% {
    transform: scale(1.5, 1.5);
  }

  50% {
    transform: scale(0.8, 0.8) rotateZ(60deg);
  }

  75% {
    transform: rotateZ(-60deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
`
