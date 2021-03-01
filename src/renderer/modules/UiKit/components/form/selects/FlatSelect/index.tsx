import { ScrollContainer, StyledScrollContainer } from '@uikit/components/base';
import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import FlatSelectOption from './Option';
import FlatSelectOptionGroup from './OptionGroup';
import upDownArrowLocked from '../assets/img/up-down-arrow-locked.png';
import upDownArrow from '../assets/img/up-down-arrow.png';
import { useClickOutside } from '@uikit/hooks';
import { animated, useTransition } from 'react-spring';
import { springConfigHarsh } from '@uikit/util';

const OptionsContainer = styled.div<{ openUpward: boolean; active: boolean }>`
  background-color: #010a13;
  position: absolute;
  max-height: 400px;
  overflow: hidden;
  transform-origin: top left;
  border: thin solid transparent;
  border-image: linear-gradient(to top, #695625, #463714) 1;
  border-width: 2px;
  padding-top: 40px;
  width: 100%;

  ${StyledScrollContainer} {
    max-height: 150px;

    .os-content-glue {
      max-height: 150px;
    }
  }

  ${({ openUpward }) =>
    openUpward &&
    css`
      bottom: 100%;
      top: auto;
      margin: 0;
      transform-origin: bottom left;

      margin-bottom: -42px;
      padding: 0 0 40px 0;
    `}

  ${({ openUpward, active }) => openUpward && active && css``}
`;

const AnimatedOptionsContainer = animated(OptionsContainer);

const Current = styled.div`
  font-family: LoL Display;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  color: #cdbe91;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.05em;

  display: flex;
  flex-direction: row;
  background: none;
  position: absolute;
  height: 40px;
  margin: 0;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;

  [data-disabled='true'] & {
    color: #3c3c41;

    ::after {
      -webkit-filter: grayscale(100%);
      opacity: 0.35;
    }
  }

  &:hover {
    color: #f0e6d2;

    &::after {
      -webkit-filter: brightness(2.2);
    }
  }

  &::after {
    content: '';
    background: url(${upDownArrow}) center no-repeat;
    width: 13px;
    height: 19px;
    margin: 0 0 0 7px;
  }
`;

const StyledFlatSelect = styled.div<{ active: boolean }>`
  display: inline-flex;
  flex-direction: column;
  height: 40px;
  outline: 0;
  position: relative;
  max-width: 400px;
  width: 100%;

  &[data-disabled='true'] {
    cursor: default;
    pointer-events: none;
  }

  ${({ active }) =>
    active &&
    css`
      z-index: auto;

      ${Current} {
        display: flex;
        color: #785a28;

        :hover {
          color: #785a28;

          ::after {
            -webkit-filter: none;
          }
        }

        ::after {
          background-image: url(${upDownArrowLocked});
        }
      }
    `}
`;

interface FlatSelectProps {
  openUpward?: boolean;
  disabled?: boolean;
}

const FlatSelect: FC<PropsWithChildren<FlatSelectProps>> = ({
  openUpward = false,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const optionsContainerRef = useRef(null);

  useClickOutside(optionsContainerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const translateY = openUpward ? '-10px' : '10px';
  const transitions = useTransition(isOpen, null, {
    config: springConfigHarsh,
    from: {
      opacity: 0,
      transform: `scale(0.25) translate(10px, ${translateY})`,
    },
    enter: { opacity: 1, transform: 'scale(1) translate(0, 0)' },
    leave: {
      opacity: 0,
      transform: `scale(0.25) translate(10px,${translateY})`,
    },
  });

  return (
    <StyledFlatSelect data-disabled={disabled} active={isOpen}>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedOptionsContainer
              openUpward={openUpward}
              ref={optionsContainerRef}
              style={props}
              key={key}
            >
              <ScrollContainer>
                <FlatSelectOptionGroup>
                  <FlatSelectOption>Foo</FlatSelectOption>
                  <FlatSelectOption selected>Bar</FlatSelectOption>
                  <FlatSelectOption disabled>Baz</FlatSelectOption>
                  <FlatSelectOption>Baz</FlatSelectOption>
                  <FlatSelectOption>Baz</FlatSelectOption>
                  <FlatSelectOption>Baz</FlatSelectOption>
                  <FlatSelectOption>Baz</FlatSelectOption>
                </FlatSelectOptionGroup>

                <FlatSelectOption>Bul</FlatSelectOption>
                <FlatSelectOption>Baz</FlatSelectOption>
                <FlatSelectOption>Baz</FlatSelectOption>
                <FlatSelectOption>Baz</FlatSelectOption>
                <FlatSelectOption>Baz</FlatSelectOption>
                <FlatSelectOption>Bal</FlatSelectOption>
              </ScrollContainer>
            </AnimatedOptionsContainer>
          )
      )}
      <Current onClick={() => setIsOpen(!isOpen)}>Huhu</Current>
    </StyledFlatSelect>
  );
};

export default FlatSelect;
