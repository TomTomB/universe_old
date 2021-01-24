import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import styled from 'styled-components';
import contentGradientMaskBoth from '@assets/content-gradient-mask-both.png';
import contentGradientMaskBottom from '@assets/content-gradient-mask-bottom.png';
import contentGradientMaskTop from '@assets/content-gradient-mask-top.png';
import React, { FC, PropsWithChildren, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import generateId from '@uikit/util/idGenerator';

const StyledScrollContainer = styled(OverlayScrollbarsComponent)`
  &.with-overflow-masks {
    &[scrolled-top='false'][scrolled-bottom='true'] {
      -webkit-mask-box-image-source: url(${contentGradientMaskTop});
      -webkit-mask-box-image-slice: 18 8 0 0 fill;
    }
    &[scrolled-top='true'][scrolled-bottom='false'] {
      -webkit-mask-box-image-source: url(${contentGradientMaskBottom});
      -webkit-mask-box-image-slice: 0 8 18 0 fill;
    }
    &[scrolled-top='false'][scrolled-bottom='false'] {
      -webkit-mask-box-image-source: url(${contentGradientMaskBoth});
      -webkit-mask-box-image-slice: 18 8 18 0 fill;
    }
  }

  .os-scrollbar-vertical {
    width: 9px;
  }

  .os-scrollbar {
    .os-scrollbar-handle {
      background-color: ${(props) => props.theme.colors.gold[5]} !important;
    }
    &:hover {
      .os-scrollbar-handle {
        background-color: ${(props) => props.theme.colors.gold[3]} !important;
      }
    }
    &.active {
      .os-scrollbar-handle {
        background-color: ${(props) => props.theme.colors.gold[6]} !important;
      }
    }
  }
`;

interface ScrollContainerProps {
  maskOverflow?: boolean;
}

const ScrollContainer: FC<PropsWithChildren<ScrollContainerProps>> = ({
  children,
  maskOverflow,
}) => {
  const scrollContainerId = useMemo(() => {
    return generateId();
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const target = document.querySelector(
      `#${scrollContainerId} .os-viewport ul`
    );

    if (maskOverflow && target) {
      const handleIntersect: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          const currentY = entry.boundingClientRect.y;
          const currentRatio = entry.intersectionRatio;
          const { isIntersecting } = entry;

          // eslint-disable-next-line no-console
          console.log(isIntersecting, currentY, currentRatio);
        });
      };

      observer = new IntersectionObserver(handleIntersect, {
        threshold: [0, 0.5, 1],
      });

      observer.observe(target);

      return () => {
        observer?.unobserve(target);
      };
    }
    return () => {};
  }, [maskOverflow, scrollContainerId]);

  return (
    <StyledScrollContainer
      className={classNames({ 'with-overflow-masks': maskOverflow })}
      id={scrollContainerId}
    >
      {children}
    </StyledScrollContainer>
  );
};

export default ScrollContainer;
