import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Common } from '@typings';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import classNames from 'classnames';
import contentGradientMaskBothHorizontal from './assets/content-gradient-mask-both-horizontal-no-scrollbar.png';
import contentGradientMaskBothVertical from './assets/content-gradient-mask-both-no-scrollbar.png';
import contentGradientMaskBottom from './assets/content-gradient-mask-bottom-no-scrollbar.png';
import contentGradientMaskLeft from './assets/content-gradient-mask-left-no-scrollbar.png';
import contentGradientMaskRight from './assets/content-gradient-mask-right-no-scrollbar.png';
import contentGradientMaskTop from './assets/content-gradient-mask-top-no-scrollbar.png';
import generateId from '@uikit/util/idGenerator';
import styled from 'styled-components';

export const StyledScrollContainer = styled(OverlayScrollbarsComponent)`
  &.with-overflow-masks {
    &.vertical {
      &[data-scrolled-top='false'][data-scrolled-bottom='true'] {
        -webkit-mask-box-image-source: url(${contentGradientMaskTop});
        -webkit-mask-box-image-slice: 18 8 0 0 fill;
      }
      &[data-scrolled-top='true'][data-scrolled-bottom='false'] {
        -webkit-mask-box-image-source: url(${contentGradientMaskBottom});
        -webkit-mask-box-image-slice: 0 8 18 0 fill;
      }
      &[data-scrolled-top='false'][data-scrolled-bottom='false'] {
        -webkit-mask-box-image-source: url(${contentGradientMaskBothVertical});
        -webkit-mask-box-image-slice: 18 8 18 0 fill;
      }
    }
    &.horizontal {
      &[data-scrolled-left='false'][data-scrolled-right='true'] {
        -webkit-mask-box-image-source: url(${contentGradientMaskLeft});
        -webkit-mask-box-image-slice: 0 18 8 0 fill;
      }
      &[data-scrolled-left='true'][data-scrolled-right='false'] {
        -webkit-mask-box-image-source: url(${contentGradientMaskRight});
        -webkit-mask-box-image-slice: 0 0 8 18 fill;
      }
      &[data-scrolled-left='false'][data-scrolled-right='false'] {
        -webkit-mask-box-image-source: url(${contentGradientMaskBothHorizontal});
        -webkit-mask-box-image-slice: 0 18 8 18 fill;
      }
    }
  }

  .os-scrollbar {
    .os-scrollbar-handle {
      background-color: ${props => props.theme.colors.gold[5]} !important;
    }
    &:hover {
      .os-scrollbar-handle {
        background-color: ${props => props.theme.colors.gold[3]} !important;
      }
    }
    &.active {
      .os-scrollbar-handle {
        background-color: ${props => props.theme.colors.gold[6]} !important;
      }
    }
  }
`;

const ScrollPoint = styled.div`
  position: absolute;
`;

export const ScrollPointTop = styled(ScrollPoint)`
  top: 0;
`;

export const ScrollPointBottom = styled(ScrollPoint)`
  bottom: 0;
`;

export const ScrollPointLeft = styled(ScrollPoint)`
  left: 0;
`;

export const ScrollPointRight = styled(ScrollPoint)`
  right: 0;
`;

export const InnerScrollContainer = styled.div`
  position: relative;
`;

export interface ScrollContainerProps {
  maskOverflow?: boolean;
  scrollDirection?: Common.Direction;
  observeTopSelector?: string;
  observeBottomSelector?: string;
  observeLeftSelector?: string;
  observeRightSelector?: string;
}

const ScrollContainer: FC<PropsWithChildren<ScrollContainerProps>> = ({
  children,
  maskOverflow,
  scrollDirection = 'vertical',
  observeTopSelector,
  observeBottomSelector,
  observeLeftSelector,
  observeRightSelector,
}) => {
  const scrollContainerId = useMemo(() => {
    return generateId();
  }, []);
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);
  const [scrolledLeft, setScrolledLeft] = useState(false);
  const [scrolledRight, setScrolledRight] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const targetTop = document.querySelector(
      `#${scrollContainerId} ${observeTopSelector}`
    );
    const targetBottom = document.querySelector(
      `#${scrollContainerId} ${observeBottomSelector}`
    );

    const targetLeft = document.querySelector(
      `#${scrollContainerId} ${observeLeftSelector}`
    );
    const targetRight = document.querySelector(
      `#${scrollContainerId} ${observeRightSelector}`
    );

    const root = document.querySelector(`#${scrollContainerId}`);

    if (maskOverflow) {
      const handleIntersect: IntersectionObserverCallback = entries => {
        entries.forEach(entry => {
          const { isIntersecting, target } = entry;

          if (target === targetTop) {
            setScrolledTop(isIntersecting);
          }
          if (target === targetBottom) {
            setScrolledBottom(isIntersecting);
          }
          if (target === targetLeft) {
            setScrolledLeft(isIntersecting);
          }
          if (target === targetRight) {
            setScrolledRight(isIntersecting);
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, {
        threshold: [1],
        root,
      });

      if (targetTop && targetBottom) {
        observer.observe(targetTop);
        observer.observe(targetBottom);
      }
      if (targetLeft && targetRight) {
        observer.observe(targetLeft);
        observer.observe(targetRight);
      }

      return () => {
        if (targetTop && targetBottom) {
          observer?.unobserve(targetTop);
          observer?.unobserve(targetBottom);
        }
        if (targetLeft && targetRight) {
          observer?.unobserve(targetLeft);
          observer?.unobserve(targetRight);
        }
      };
    }
    return () => {};
  }, [
    maskOverflow,
    scrollContainerId,
    observeTopSelector,
    observeBottomSelector,
    observeLeftSelector,
    observeRightSelector,
    scrollDirection,
  ]);

  return (
    <StyledScrollContainer
      className={classNames(scrollDirection, {
        'with-overflow-masks': maskOverflow,
      })}
      id={scrollContainerId}
      data-scrolled-top={scrolledTop}
      data-scrolled-bottom={scrolledBottom}
      data-scrolled-left={scrolledLeft}
      data-scrolled-right={scrolledRight}
    >
      <InnerScrollContainer>{children}</InnerScrollContainer>
    </StyledScrollContainer>
  );
};

export default ScrollContainer;
