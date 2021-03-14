import React, { FC } from 'react';
import styled, { css } from 'styled-components';

const getNavDirection = (dir: NavigationBarDirection) => {
  switch (dir) {
    case 'down':
      return css`
        justify-content: flex-start;
        flex-direction: column;
      `;
    case 'left':
      return css`
        justify-content: flex-start;
        flex-direction: row;
      `;
    case 'right':
      return css`
        justify-content: flex-end;
        flex-direction: row-reverse;
      `;
    case 'up':
      return css`
        justify-content: flex-end;
        flex-direction: column-reverse;
      `;
  }
};

export const StyledNavigationBar = styled.nav<{ navType: NavigationBarType }>`
  font-family: LoL Display;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: subpixel-antialiased;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #cdbe91;
`;

const NavigationBarList = styled.ul<{ direction: NavigationBarDirection }>`
  all: unset;
  display: flex;
  width: 100%;
  height: 100%;

  ${({ direction }) => getNavDirection(direction)};
`;

export type NavigationBarDirection = 'up' | 'right' | 'down' | 'left';
export type NavigationBarType = 'primary' | 'secondary' | 'tabbed';

export interface NavigationBarProps {
  className?: string;
  navType: NavigationBarType;
  direction: NavigationBarDirection;
}

const NavigationBar: FC<NavigationBarProps> = ({
  className,
  children,
  direction,
  navType,
}) => {
  return (
    <StyledNavigationBar
      className={className}
      navType={navType}
      data-nav-type={navType}
    >
      <NavigationBarList direction={direction}>{children}</NavigationBarList>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
