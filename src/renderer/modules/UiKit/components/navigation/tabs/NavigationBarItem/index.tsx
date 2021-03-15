import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavigationBarItem = styled.li`
  all: unset;
`;

export const AlertImage = styled.div`
  position: absolute;
  right: -12px;
  top: 0px;
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

  &.active {
    cursor: default;
    color: #f0e6d2;
    cursor: default;

    &::before {
      opacity: 1;
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

export const GlowContainer = styled.div``;
export const Glow = styled.div``;

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
      </ItemLink>
    </StyledNavigationBarItem>
  );
};

export default NavigationBarItem;
