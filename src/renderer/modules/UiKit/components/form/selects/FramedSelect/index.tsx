import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import dropdownArrowLocked from '../assets/img/up-down-arrow-locked.png';
import dropdownArrow from '../assets/img/up-down-arrow.png';
import { animated, useTransition } from 'react-spring';
import { springConfigHarsh } from '@uikit/util/springConfig';
import { ScrollContainer, StyledScrollContainer } from '@uikit/components/base';
import Label from '../../Label';
import FormField from '../../base/FormField';
import FramedSelectOption from './Option';
import NativeSelect from '../NativeSelect';
import useSelectBehavior from '../hooks/useSelectBehavior';

const SelectLabel = styled(Label)`
  margin-bottom: 2px;
`;

const CurrentContainer = styled.dt`
  cursor: pointer;
  border: 1px solid transparent;
  border-image: linear-gradient(
      to top,
      #695625 0%,
      #a9852d 23%,
      #b88d35 93%,
      ${props => props.theme.colors.gold[3]} 100%
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
  background-color: ${props => props.theme.colors.grey.frame50};

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
  border-image: linear-gradient(
      to top,
      #695625,
      ${props => props.theme.colors.gold[6]}
    )
    1;
  margin: 0;
  padding: 0;
  width: 100%;
  position: absolute;
  top: 100%;
  transform-origin: 50% 0;
  max-height: 400px;
  z-index: 2;
  overflow: hidden;
  background: ${props => props.theme.colors.black};

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
      margin-top: 1px;
    `}
`;

const AnimatedOptionsContainer = animated(OptionsContainer);

const Options = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    display: none;
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
  color: ${props => props.theme.colors.grey[1]};
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
        border: 1px solid ${props => props.theme.colors.gold[6]};
        color: ${props => props.theme.colors.gold[6]};
        &::after {
          background-image: url(${dropdownArrowLocked});
        }
      }
    `}

  &[data-disabled] {
    cursor: default;
    pointer-events: none;
    ${CurrentContainer} {
      border: 1px solid ${props => props.theme.colors.grey[3]};
      color: ${props => props.theme.colors.grey[3]};
      &::after {
        filter: grayscale(100%);
        opacity: 0.35;
      }
    }
  }
`;

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FramedSelectProps {
  items: SelectOption[];
  id: string;
  label: string;
  name: string;
  value?: string;
  disabled?: boolean;
  openUpward?: boolean;
  register: (...args: any) => any;
}

const FramedSelect: FC<FramedSelectProps> = ({
  items,
  register,
  id,
  label,
  name,
  value,
  disabled,
  openUpward = false,
}) => {
  const {
    nativeSelectId,
    labelId,
    selectedOption,
    optionsContainerRef,
    customSelectRef,
    isOpen,
    setSelectedOption,
    setIsOpen,
    handleKeyDown,
    handleKeyUp,
  } = useSelectBehavior(items, name, id, value);

  const transitions = useTransition(isOpen, null, {
    config: springConfigHarsh,
    from: { transform: 'scaleY(0)', opacity: 0 },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0)' },
  });

  return (
    <FormField>
      <NativeSelect
        id={nativeSelectId}
        register={register}
        hidden
        items={items}
        name={name}
        disabled={disabled}
        onChange={e => {
          if (selectedOption !== e.target.value) {
            setSelectedOption(e.target.value);
          }
        }}
      />

      <SelectLabel
        id={labelId}
        htmlFor={id}
        isInvalid={false}
        onClick={() => {
          document.getElementById(id)?.focus();
        }}
      >
        {label}
      </SelectLabel>
      <Select
        tabIndex={disabled ? -1 : 0}
        active={isOpen}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        role="combobox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
        aria-autocomplete="none"
        aria-labelledby={labelId}
        data-disabled={disabled}
        id={id}
        ref={customSelectRef}
      >
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
                  <Options role="listbox">
                    {items.map(
                      (option, index) =>
                        option && (
                          <FramedSelectOption
                            index={index}
                            disabled={option.disabled}
                            key={option.label + option.value}
                            selected={selectedOption === option.value}
                            onClick={() => {
                              setSelectedOption(option.value);
                              setIsOpen(false);
                            }}
                          >
                            {option.label}
                          </FramedSelectOption>
                        )
                    )}
                  </Options>
                </ScrollContainer>
              </AnimatedOptionsContainer>
            )
        )}

        <CurrentContainer onClick={() => setIsOpen(!isOpen)}>
          <CurrentValue>
            {items.find(item => item.value === selectedOption)?.label ||
              'Select'}
          </CurrentValue>
        </CurrentContainer>
      </Select>
    </FormField>
  );
};

export default FramedSelect;
