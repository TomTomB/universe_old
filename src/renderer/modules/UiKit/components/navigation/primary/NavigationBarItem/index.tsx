import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import navHighlight from './assets/nav-highlight.png';
import navPointer from './assets/nav-pointer.png';
import styled from 'styled-components';

export const StyledNavigationBarItem = styled.li`
  all: unset;
`;

export const AlertImage = styled.div`
  position: absolute;
  right: 0px;
  top: -5px;
  background-color: #cdbe91;
  border-radius: 50%;
  width: 10px;
  height: 10px;

  .active & {
    background-color: #f0e6d2;
  }
`;

export const ItemLink = styled(NavLink)`
  font-family: LoL Display;
  text-decoration: none;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
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
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.075em;
  color: #cdbe91;
  height: 79px;

  &:hover,
  &:focus-visible {
    color: #f0e6d2;

    ${AlertImage} {
      background-color: #f0e6d2;
    }

    &::after {
      opacity: 1;
      transition: opacity 0.1s ease-out;
    }
  }

  &:active {
    color: #c89b3c;
  }

  &::after {
    content: '';
    background-image: linear-gradient(
      0deg,
      rgba(205, 190, 145, 0.2) 0%,
      rgba(31, 37, 38, 0) 55%
    );
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.4s ease-in;
  }

  &.active {
    cursor: default;
    position: relative;
    color: #f0e6d2;
    background-image: linear-gradient(
      0deg,
      rgba(205, 190, 145, 0.15) 0%,
      rgba(31, 37, 38, 0) 55%
    );

    &::before {
      content: '';
      height: 15px;
      width: 100%;
      position: absolute;
      top: -1px;
      left: 0;
      background-image: url(${navPointer});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      pointer-events: none;
    }

    &::after {
      opacity: 0;
      transition: opacity 0.4s ease-in;
    }
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

export const GlowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;
export const Glow = styled.div`
  width: 100%;
  height: 90px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url(${navHighlight}) no-repeat;
  background-position: bottom center;
  background-size: 100% 32px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s;
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
