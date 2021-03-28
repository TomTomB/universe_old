import React, { FC } from 'react';
import { ComponentTypes } from '@typings';
import styled from 'styled-components';

const Frame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #1e2328;
  box-shadow: 0 0 1px 1px #010a13, inset 0 0 1px 1px #010a13;
  border: thin solid transparent;
  border-image-slice: 1;
  opacity: 0;
  transition: opacity 200ms linear;
`;

const FrameDefault = styled(Frame)`
  opacity: 1;
  border-image-source: linear-gradient(
    to top,
    #785b28 0%,
    #c89c3c 55%,
    #c8a355 71%,
    #c8aa6e 100%
  );
`;
const FrameHover = styled(Frame)`
  background: linear-gradient(
    to bottom,
    #1e232a 0%,
    #1e232a 40%,
    rgba(118, 97, 51, 0.8) 140%
  );
  border-image-source: linear-gradient(
    to top,
    #c89c3c 0%,
    #dcc188 50%,
    #e1c998 71%,
    #f0e6d8 100%
  );
`;
const FrameActive = styled(Frame)`
  transition-duration: 100ms;
  border-image-source: linear-gradient(to top, #6b5024, #463714);
`;
const FrameDisabled = styled(Frame)`
  border-color: #5c5b57;
`;

const FrameContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  font-family: LoL Body;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.025em;
  -webkit-font-smoothing: subpixel-antialiased;

  position: relative;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
  top: 1px;
  padding: 1px 15px;
  font-weight: 700;
  white-space: nowrap;
  color: transparent;
  background-color: #cdbe91;
  -webkit-background-clip: text;
  transition: all 200ms linear;
`;

export const StyledSecondaryFlatButton = styled.button`
  all: unset;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 90px;
  height: 100%;
  min-height: 32px;
  cursor: pointer;
  -webkit-user-select: none;

  &:hover,
  &:focus-visible {
    ${Content} {
      background-color: #f0e6d2;
    }

    ${FrameHover} {
      opacity: 1;
    }
  }

  &:active {
    ${Content} {
      transition-duration: 100ms;
      background-color: #785a28;
    }

    ${FrameActive} {
      opacity: 1;
    }
  }

  &:disabled {
    pointer-events: none;

    ${Content} {
      background-color: #5c5b57;
    }

    ${FrameDisabled} {
      opacity: 1;
    }
  }
`;

export interface SecondaryFlatButtonProps extends ComponentTypes.ButtonProps {}

const SecondaryFlatButton: FC<SecondaryFlatButtonProps> = ({
  children,
  className,
  type,
  disabled,
  onClick,
}) => {
  return (
    <StyledSecondaryFlatButton
      disabled={disabled}
      className={className}
      type={type}
      onClick={onClick}
    >
      <FrameContainer>
        <FrameDefault />
        <FrameHover />
        <FrameActive />
        <FrameDisabled />
      </FrameContainer>

      <Content> {children} </Content>
    </StyledSecondaryFlatButton>
  );
};

export default SecondaryFlatButton;
