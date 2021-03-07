import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import styled from 'styled-components';
import contentGradientMaskBoth from '@assets/masks/content-gradient-mask-both-no-scrollbar.png';
import contentGradientMaskBottom from '@assets/masks/content-gradient-mask-bottom-no-scrollbar.png';
import contentGradientMaskTop from '@assets/masks/content-gradient-mask-top-no-scrollbar.png';
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import generateId from '@uikit/util/idGenerator';

export const StyledScrollContainer = styled(OverlayScrollbarsComponent)`
  &.with-overflow-masks {
    &[data-scrolled-top='false'][data-scrolled-bottom='true'] {
      -webkit-mask-box-image-source: url(${contentGradientMaskTop});
      -webkit-mask-box-image-slice: 18 8 0 0 fill;
    }
    &[data-scrolled-top='true'][data-scrolled-bottom='false'] {
      -webkit-mask-box-image-source: url(${contentGradientMaskBottom});
      -webkit-mask-box-image-slice: 0 8 18 0 fill;
    }
    &[data-scrolled-top='false'][data-scrolled-bottom='false'] {
      -webkit-mask-box-image-source: url(${contentGradientMaskBoth});
      -webkit-mask-box-image-slice: 18 8 18 0 fill;
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

export interface ScrollContainerProps {
  maskOverflow?: boolean;
  observeStartSelector?: string;
  observeEndSelector?: string;
}

const ScrollContainer: FC<PropsWithChildren<ScrollContainerProps>> = ({
  children,
  maskOverflow,
  observeStartSelector,
  observeEndSelector,
}) => {
  const scrollContainerId = useMemo(() => {
    return generateId();
  }, []);
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const targetStart = document.querySelector(
      `#${scrollContainerId} ${observeStartSelector}`
    );
    const targetEnd = document.querySelector(
      `#${scrollContainerId} ${observeEndSelector}`
    );

    const root = document.querySelector(`#${scrollContainerId}`);

    if (maskOverflow && targetStart && targetEnd) {
      const handleIntersect: IntersectionObserverCallback = entries => {
        entries.forEach(entry => {
          const { isIntersecting, target } = entry;

          if (isIntersecting) {
            if (target === targetStart) {
              setScrolledTop(true);
            }
            if (target === targetEnd) {
              setScrolledBottom(true);
            }
          } else {
            if (target === targetStart) {
              setScrolledTop(false);
            }
            if (target === targetEnd) {
              setScrolledBottom(false);
            }
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, {
        threshold: [1],
        root,
      });

      observer.observe(targetStart);
      observer.observe(targetEnd);

      return () => {
        observer?.unobserve(targetStart);
        observer?.unobserve(targetEnd);
      };
    }
    return () => {};
  }, [
    maskOverflow,
    scrollContainerId,
    observeStartSelector,
    observeEndSelector,
  ]);

  return (
    <StyledScrollContainer
      className={classNames({
        'with-overflow-masks': maskOverflow,
      })}
      id={scrollContainerId}
      data-scrolled-top={scrolledTop}
      data-scrolled-bottom={scrolledBottom}
    >
      {children}
    </StyledScrollContainer>
  );
};

export default ScrollContainer;
