import { css } from "styled-components";

export const CustomAnimation = css`
  @keyframes slide-down {
    0% {
      visibility: hidden;
      height: 0;
    }

    95% {
      visibility: visible;
    }

    // 動畫結束時把高設成 auto
    100% {
      visibility: visible;
      height: auto;
    }
  }
  .slide-down {
    animation: slide-down 0.3s linear both;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeInfinite {
    0% {
      opacity: .3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: .3;
    }
  }

  .show {
    // animation: fadeIn 0.3s;
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }
  .fadeOut {
    animation: fadeOut 0.3s;
  }
  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .scaleIn {
    animation: scaleIn 0.3s;
    transform: translate(-50%, -50%);
  }
`
