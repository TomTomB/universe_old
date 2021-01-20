import React, { FC, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import dropdownCheck from '@assets/dropdown-check.png';
import dropdownSelectDot from '@assets/dropdown-select-dot.png';
import dropdownArrowLocked from '@assets/up-down-arrow-locked.png';
import dropdownArrow from '@assets/up-down-arrow.png';
import useClickOutside from '@uikit/hooks/useClickOutside';
import { animated, useTransition } from 'react-spring';
import { springConfigHarsh } from '@uikit/util/springConfig';

const CurrentContainer = styled.dt`
  cursor: pointer;
  border: 1px solid transparent;
  border-image: linear-gradient(
      to top,
      #695625 0%,
      #a9852d 23%,
      #b88d35 93%,
      #c8aa6e 100%
    )
    1;
  display: flex;
  box-sizing: border-box;
  padding-bottom: 10px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 7px 5px;
  align-items: center;
  background-color: rgba(30, 35, 40, 0.5);

  &::after {
    background: url(${dropdownArrow}) center no-repeat;
    pointer-events: none;
    width: 13px;
    height: 18px;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translate(0, -50%);
    content: '';
  }
`;

const CurrentValue = styled.div`
  padding-left: 7px;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 16px;
`;

const OptionsContainer = styled.dd<{ openUpward: boolean }>`
  border: 1px solid transparent;
  border-image: linear-gradient(to top, #695625, #463714) 1;
  margin: 0;
  display: flex;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  top: 100%;
  transform-origin: 50% 0;
  max-height: 400px;
  z-index: 2;
  overflow: hidden;
  background-color: rgba(30, 35, 40, 0.5);

  ${({ openUpward }) =>
    openUpward &&
    css`
      bottom: 100%;
      top: auto;
      margin-top: 1px;
    `}
`;

const AnimatedOptionsContainer = animated(OptionsContainer);

const Options = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-width: 100%;
  background: #010a13;
  max-height: 150px;
`;

const Option = styled.li<{ selected: boolean; sortingActive?: boolean }>`
  align-items: center;
  border-top: 1px solid #1f2123;
  color: #cdbe91;
  cursor: pointer;
  display: block;
  min-height: 30px;
  line-height: 30px;
  margin: 0;
  overflow: hidden;
  padding: 2px 9px 2px 7px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #f0e6d2;
    background-color: #1e2328;
  }

  &:active {
    color: #463714;
    background-color: rgba(30, 35, 40, 0.5);
  }

  ${({ selected }) =>
    selected &&
    css`
      padding-right: 31px;
      &::after {
        background: url(${dropdownCheck}) center no-repeat;
        width: 14px;
        height: 11px;
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translate(0, -50%);
        content: '';
      }
    `}

  ${({ sortingActive }) =>
    sortingActive &&
    css`
      border: 1px solid transparent;
      border-image: linear-gradient(
        to bottom,
        #ddcea1 0%,
        #cab568 50%,
        #73561e 100%
      );
      border-image-slice: 1;
      color: #f0e6d2;
      padding-left: 15px;
      background: url(${dropdownSelectDot}) no-repeat 7px 10px;
      background-color: #010a13;
    `}

  &[disabled] {
    color: #888;
    cursor: default;
    pointer-events: none;
    &:hover {
      color: #888;
      background-color: rgba(30, 35, 40, 0);
    }
  }
`;

const Select = styled.div<{ active: boolean }>`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  outline: 0;
  font-kerning: normal;
  font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: subpixel-antialiased;
  color: #a09b8c;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.025em;
  position: relative;
  margin: 0;

  ${({ active }) =>
    !active &&
    css`
      &:hover,
      &:focus-visible {
        ${CurrentContainer} {
          border: 1px solid transparent;
          border-image: linear-gradient(to top, #c89b3c, #f0e6d2) 1;
          background: linear-gradient(
            to top,
            rgba(88, 83, 66, 0.5),
            rgba(30, 35, 40, 0.5)
          );
        }
      }
    `}

  ${({ active }) =>
    active &&
    css`
      ${CurrentContainer} {
        border: 1px solid #463714;
        color: #463714;
        &::after {
          background-image: url(${dropdownArrowLocked});
        }
      }
    `}

  &[disabled] {
    cursor: default;
    pointer-events: none;
    ${CurrentContainer} {
      border: 1px solid #3c3c41;
      color: #3c3c41;
      &::after {
        filter: grayscale(100%);
        opacity: 0.35;
      }
    }
  }
`;

const FramedSelect: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const optionsContainerRef = useRef(null);

  useClickOutside(optionsContainerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log(event);

    if (event.code === 'Enter' || event.code === 'Space') {
      setIsOpen(true);
    }

    if (event.code === 'Enter' || event.code === 'Escape') {
      setIsOpen(false);
    }
  };

  const transitions = useTransition(isOpen, null, {
    config: springConfigHarsh,
    from: { transform: 'scaleY(0)', opacity: 0 },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0)' },
  });

  return (
    <Select
      tabIndex={0}
      active={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      onKeyUp={handleKeyUp}
      role="listbox"
      aria-labelledby="label"
      aria-expanded={isOpen ? 'true' : 'false'}
    >
      <CurrentContainer>
        <CurrentValue>Some Selected Value</CurrentValue>
      </CurrentContainer>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedOptionsContainer
              openUpward={false}
              ref={optionsContainerRef}
              style={props}
              key={key}
            >
              <Options>
                <Option role="option" selected={false}>
                  Some Value
                </Option>
                <Option role="option" selected>
                  Some Other Value
                </Option>
                <Option role="option" selected={false}>
                  Some More Other Value
                </Option>
                <Option role="option" selected={false}>
                  Some More Other Value
                </Option>
                <Option role="option" selected={false}>
                  Some More Other Value
                </Option>
                <Option role="option" selected={false}>
                  Some More Other Value
                </Option>
              </Options>
            </AnimatedOptionsContainer>
          )
      )}
    </Select>
  );
};

export default FramedSelect;
