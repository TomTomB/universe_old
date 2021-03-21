import { ComponentTypes, LCU } from '@typings';
import React, { FC } from 'react';
import beIcon from './assets/be-icon.png';
import rpIcon from './assets/icon-rp-gradient-32.png';
import styled from 'styled-components';

const OuterContainer = styled.div`
  min-width: inherit;
  width: inherit;
  height: 100%;
  box-shadow: 0 0 1px 1px #010a13;
`;

const InnerContainer = styled.div`
  height: 100%;
`;

const OuterBorder = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
  border: thin solid transparent;
  border-image: linear-gradient(
    to bottom,
    #413722 4%,
    #5b4a25 23%,
    #907d53 88%,
    #5f5031 100%
  );
  border-image-slice: 1;
`;

const BorderIdle = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  opacity: 1;
  border: 2px solid transparent;
  border-image: linear-gradient(
    to top,
    #785b28 0%,
    #c89c3c 55%,
    #c8a355 71%,
    #c8aa6e 100%
  );
  border-image-slice: 1;
  transition: opacity 300ms linear;
`;

const BorderTransition = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  opacity: 0;
  border: 2px solid transparent;
`;

const ContentIcon = styled.span`
  width: 15px;
  height: 15px;
  margin-right: 0.4rem;
`;

const ContentIconRp = styled(ContentIcon)`
  background: url(${rpIcon}) center center no-repeat;
  background-size: contain;
`;

const ContentIconBe = styled(ContentIcon)`
  background: url(${beIcon}) center center no-repeat;
  background-size: contain;
`;

const ContentValue = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  color: #cdbe91;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  white-space: nowrap;
  padding: 0.35rem 2.25rem;
  height: 100%;
  min-height: 32px;
  box-shadow: 0 0 0 2px #010a13, inset 0 0 0 1px rgba(1, 10, 19, 0.35);
  background: linear-gradient(to bottom, #25221b 0%, #433b2b 100%);
  border: 2px solid transparent;
`;

export const StyledPurchaseButton = styled.button`
  all: unset;

  font-family: LoL Display;
  text-transform: uppercase;
  cursor: pointer;

  * {
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    ${ButtonContainer} {
      background: linear-gradient(to bottom, #29251d 0%, #655431 100%);
    }
    ${ContentValue} {
      color: #f0e6d2;
    }
  }

  &:active {
    ${ContentValue} {
      color: #a09b8c;
    }
    ${OuterBorder} {
      border-image: none;
      border-color: #413722;
    }
    ${BorderIdle} {
      border-image: none;
      border-color: #6a502b;
    }
  }

  &:disabled {
    pointer-events: none;

    ${ContentValue} {
      color: #5c5b57;
    }
    ${ButtonContainer} {
      background: #1e2328;
      border: 2px solid #5b5a56;
      border-image: initial;
      transition: all 300ms linear;
    }
    ${OuterBorder} {
      border-image: none;
      border-color: #5c5b57;
    }
    ${BorderTransition} {
      transition: opacity 300ms linear;
      opacity: 0;
    }
    ${BorderIdle} {
      opacity: 0;
    }
  }
`;

export interface PurchaseButtonProps extends ComponentTypes.ButtonProps {
  currencyType: LCU.Currency;
}

const PurchaseButton: FC<PurchaseButtonProps> = ({
  children,
  type,
  className,
  disabled,
  onClick,
  currencyType,
}) => {
  return (
    <StyledPurchaseButton
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <OuterContainer>
        <InnerContainer>
          <ButtonContainer>
            <OuterBorder />
            <BorderIdle />
            <BorderTransition />
            {currencyType === 'rp' && <ContentIconRp />}
            {currencyType === 'be' && <ContentIconBe />}
            <ContentValue>{children}</ContentValue>
          </ButtonContainer>
        </InnerContainer>
      </OuterContainer>
    </StyledPurchaseButton>
  );
};

export default PurchaseButton;
