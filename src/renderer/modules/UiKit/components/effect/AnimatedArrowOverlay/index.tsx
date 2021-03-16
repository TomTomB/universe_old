import React, { FC, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import noiseTileAlphaTintLarge from '@assets/components/noise/noise-tile-alpha-tint-large.png';

export interface AnimatedArrowOverlayProps {
  isCarrot?: boolean;
  className?: string;
}

const dashStrokeAnimation = keyframes`
  to {
    stroke-dashoffset: -100;
  }
`;

const dashStrokeOffsetAnimation = keyframes`
  to {
    stroke-dashoffset: -150;
  }
`;

const Container = styled.div`
  width: calc(100% + 16px) !important;
  height: calc(100% + 16px) !important;
  left: -8px;
  top: -8px;
  position: absolute;
  cursor: default;
  pointer-events: none;

  #scalable-path {
    transform: translate(8px, 8px);
  }

  #animated-magic-container {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    transition: opacity 300ms linear;
  }

  #animated-magic-low {
    filter: blur(2px) contrast(1.15);
    opacity: 0.75;
  }

  #animated-magic-high {
    filter: blur(4px) contrast(1.35) brightness(1.5);
    opacity: 0.85;
  }

  .svg-container {
    position: absolute;
    left: 0;
    top: 0;
  }

  .dashed-border {
    stroke: #fff;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 0ms;
    stroke-dasharray: 50;
    animation-name: ${dashStrokeAnimation};
    &.offset {
      stroke-dashoffset: -50;
      animation-name: ${dashStrokeOffsetAnimation};
    }
  }
`;

const AnimatedArrowOverlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const AnimatedArrowOverlayStateIntro = css`
  ${Container} {
    .dashed-border {
      animation-duration: 750ms;
    }

    #animated-magic-container {
      opacity: 1;
    }
  }
`;

export const AnimatedArrowOverlayStateHoverFocus = css`
  ${Container} {
    .dashed-border {
      animation-duration: 1500ms;
    }

    #animated-magic-container {
      opacity: 1;
    }
  }
`;

export const AnimatedArrowOverlayStateActive = css`
  ${Container} {
    .dashed-border {
      animation-duration: 750ms;
    }

    #animated-magic-container {
      opacity: 1;
    }
  }
`;

const AnimatedArrowOverlay: FC<AnimatedArrowOverlayProps> = ({
  isCarrot = true,
  className,
}) => {
  const animatedArrowOverlayWrapper = useRef<HTMLDivElement | null>(null);

  const generatePath = () => {
    if (!animatedArrowOverlayWrapper.current) {
      return '';
    }
    const width = animatedArrowOverlayWrapper.current.offsetWidth - 31;
    const pathArrow = `M0, 0 h${width} l15 16 l-15 16 H0 a21.461 21.461,0,0,0,8.4 -16,21.461 21.461,0,0,0,-8.4 -16 Z`;
    const pathCarrot = `M0, 0 h${width} l15 16 l-15 16 H0 0,0 Z`;

    return isCarrot ? pathCarrot : pathArrow;
  };

  return (
    <Container className={className}>
      <AnimatedArrowOverlayWrapper ref={animatedArrowOverlayWrapper}>
        <svg
          id="path-defs"
          className="svg-container"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="noise-map"
              x="0"
              y="0"
              width="400"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <image
                xlinkHref={noiseTileAlphaTintLarge}
                x="0"
                y="0"
                width="400"
                height="40"
              />
              <animate
                dur="20s"
                repeatCount="indefinite"
                attributeName="y"
                values="0;20;0"
              />
              <animate
                dur="40s"
                repeatCount="indefinite"
                attributeName="x"
                values="0;50;0;-50;0"
              />
            </pattern>
            <pattern
              id="noise-map-offset"
              x="25%"
              y="0"
              width="400"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <image
                xlinkHref={noiseTileAlphaTintLarge}
                x="0"
                y="0"
                width="400"
                height="40"
              />
              <animate
                dur="20s"
                repeatCount="indefinite"
                attributeName="y"
                values="0;20;0"
              />
              <animate
                dur="40s"
                repeatCount="indefinite"
                attributeName="x"
                values="25;75;25;-25;25"
              />
            </pattern>
            <path
              id="scalable-path"
              d={generatePath()}
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            />
            <mask
              id="mask-dashed-border"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="100%"
              height="100%"
            >
              <use
                className="dashed-border"
                xlinkHref="#scalable-path"
                strokeWidth="4"
              />
            </mask>
            <mask
              id="mask-dashed-border-offset"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <use
                className="dashed-border offset"
                xlinkHref="#scalable-path"
                strokeWidth="4"
              />
            </mask>
          </defs>
        </svg>

        <div id="animated-magic-container">
          <svg
            id="animated-magic-low"
            className="svg-container"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              mask="url(#mask-dashed-border)"
              fill="url(#noise-map)"
            />
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              mask="url(#mask-dashed-border-offset)"
              fill="url(#noise-map-offset)"
            />
          </svg>
          <svg
            id="animated-magic-high"
            className="svg-container"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              mask="url(#mask-dashed-border)"
              fill="url(#noise-map)"
            />
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              mask="url(#mask-dashed-border-offset)"
              fill="url(#noise-map-offset)"
            />
          </svg>
        </div>
      </AnimatedArrowOverlayWrapper>
    </Container>
  );
};

export default AnimatedArrowOverlay;
