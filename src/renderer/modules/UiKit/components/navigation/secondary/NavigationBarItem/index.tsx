import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavigationBarItem = styled.li`
  all: unset;
`;

export const AlertImage = styled.div`
  position: absolute;
  border-radius: 50%;
  right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  background-color: #c89b3c;

  .active & {
    background-color: #f0e6d2;
  }
`;

export const ItemLink = styled(NavLink)`
  font-family: LoL Display;
  text-decoration: none;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: subpixel-antialiased;
  text-transform: uppercase;
  min-width: 28px;
  min-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  margin: 0;
  outline: none;
  transition: text-shadow 0.3s ease-in-out, background 1.5s;
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #cdbe91;

  &:hover,
  &:focus-visible {
    color: #f0e6d2;

    ${AlertImage} {
      background-color: #f0e6d2;
    }
  }

  &:active {
    color: #c89b3c;
  }

  &.active {
    cursor: default;
    position: relative;
    color: #f0e6d2;
  }

  &[data-disabled='true'] {
    pointer-events: none;
    color: #888;
  }
`;

export const TextContainer = styled.div`
  padding: 0px 15px;
  position: relative;
`;
export const TextSpan = styled.span``;

export const GlowContainer = styled.div``;

export const Glow = styled.div`
  .active & {
    height: 1px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 20px;
    margin: 0;
    background: linear-gradient(to left, transparent, #cdbe91, transparent);
  }
`;

export interface NavigationBarItemProps {
  className?: string;
  linksTo: string;
  disabled?: boolean;
  alert?: boolean;
}

const NavigationBarItem: FC<NavigationBarItemProps> = ({
  className,
  children,
  linksTo,
  disabled,
  alert,
}) => {
  return (
    <StyledNavigationBarItem className={className}>
      <ItemLink
        to={linksTo}
        activeClassName="active"
        data-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <TextContainer>
          <TextSpan> {children} </TextSpan>
          {alert && <AlertImage />}
        </TextContainer>
        <GlowContainer>
          <Glow />
        </GlowContainer>
      </ItemLink>
    </StyledNavigationBarItem>
  );
};

export default NavigationBarItem;
