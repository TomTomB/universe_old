import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import navPointer from './assets/nav-pointer.png';
import navHighlight from './assets/nav-highlight.png';

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

  [data-nav-type='secondary'] & {
    right: 5px;
    top: -3px;
    width: 6px;
    height: 6px;
    background-color: #c89b3c;
  }

  [data-nav-type='tabbed'] & {
    right: -12px;
    top: 0px;
  }

  [data-nav-type='tabbed'] .active & {
    background-color: #f0e6d2;
  }
`;

export const ItemLink = styled(NavLink)`
  font-family: LoL Display;
  text-decoration: none;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;

  [data-nav-type='primary'] &,
  [data-nav-type='secondary'] & {
    text-transform: uppercase;
    min-width: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #cdbe91;
    border: none;
    margin: 0;
    outline: none;
    transition: text-shadow 0.3s ease-in-out, background 1.5s;
    width: 100%;
    height: 100%;
    min-height: 20px;
    cursor: pointer;

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
  }

  [data-nav-type='primary'] & {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.075em;
    color: #cdbe91;
    height: 79px;

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

    &:hover,
    &:focus-visible {
      &::after {
        opacity: 1;
        transition: opacity 0.1s ease-out;
      }
    }

    &.active ::after {
      opacity: 0;
      transition: opacity 0.4s ease-in;
    }
  }

  [data-nav-type='secondary'] & {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: #cdbe91;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  [data-nav-type='tabbed'] & {
    color: #c8aa6e;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.0325em;

    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding-left: 12px;
    text-align: left;
    line-height: 30px;
    vertical-align: middle;
    transition: 300ms color;

    &.active {
      color: #f0e6d2;
      cursor: default;

      &::before {
        opacity: 1;
      }
    }

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      top: 0;
      left: 1px;
      background-image: linear-gradient(to bottom, #c89b3c, #c89b3c);
      background-size: 100% 100%;
      background-position: left center;
      background-repeat: no-repeat;
      opacity: 0;
      transition: 400ms opacity;
    }

    &:hover,
    &:focus-visible {
      color: #f0e6d2;
    }

    &:active {
      color: #785a28;
    }
  }

  &.active {
    cursor: default;

    [data-nav-type='primary'] &,
    [data-nav-type='secondary'] & {
      position: relative;
      color: #f0e6d2;
    }

    [data-nav-type='primary'] & {
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
    }
  }

  &[data-disabled='true'] {
    pointer-events: none;

    [data-nav-type='primary'] &,
    [data-nav-type='secondary'] & {
      color: #888;
    }

    [data-nav-type='tabbed'] & {
      color: #1e2328;
    }
  }
`;

export const TextContainer = styled.div`
  padding: 0px 15px;
`;
export const TextSpan = styled.span``;

export const GlowContainer = styled.div`
  [data-nav-type='primary'] & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
`;
export const Glow = styled.div`
  [data-nav-type='primary'] & {
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
  }

  [data-nav-type='secondary'] .active & {
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
