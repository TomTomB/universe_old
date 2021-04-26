import React, { FC, PropsWithChildren, useMemo } from 'react';
import { ScrollContainer, StyledScrollContainer } from '@uikit/components/base';
import { animated, useTransition } from 'react-spring';
import styled, { css } from 'styled-components';
import FlatSelectOption from './Option';
import FlatSelectOptionGroup from './OptionGroup';
import NativeSelect from '../NativeSelect';
import { SelectOption } from '../FramedSelect';
import { UseFormRegister } from 'react-hook-form';
import { springConfigHarsh } from '@uikit/util';
import upDownArrow from '../assets/img/up-down-arrow.png';
import upDownArrowLocked from '../assets/img/up-down-arrow-locked.png';
import useSelectBehavior from '../hooks/useSelectBehavior';

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
  width: 400px;
  max-width: 400px;

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
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  background: none;
  position: absolute;
  height: 40px;
  line-height: 40px;
  margin: 0;
  padding: 0 25px 0 10px;
  cursor: pointer;
  max-width: 400px;

  [data-disabled='true'] & {
    color: #3c3c41;

    ::after {
      -webkit-filter: grayscale(100%);
      opacity: 0.35;
    }
  }

  &::after {
    position: absolute;
    content: '';
    background: url(${upDownArrow}) center no-repeat;
    width: 13px;
    height: 19px;
    margin: 0 0 0 7px;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`;

const StyledFlatSelect = styled.div<{ active: boolean }>`
  display: inline-flex;
  flex-direction: column;
  height: 40px;
  outline: 0;
  position: relative;
  max-width: 400px;

  &[data-disabled='true'] {
    cursor: default;
    pointer-events: none;
  }

  &:hover,
  &:focus-visible {
    ${Current} {
      color: #f0e6d2;

      ::after {
        -webkit-filter: brightness(2.2);
      }
    }
  }

  ${({ active }) =>
    active &&
    css`
      z-index: auto;

      :hover ${Current} {
        color: #785a28;

        ::after {
          -webkit-filter: none;
        }
      }

      ${Current} {
        color: #785a28;

        ::after {
          background-image: url(${upDownArrowLocked});
        }
      }
    `}
`;

export interface SelectOptionsWithGroups {
  items: SelectOption[];
  grouped: SelectOptionGroup[];
}

export interface SelectOptionGroup {
  items: SelectOption[];
  group: string;
}

export interface FlatSelectProps {
  items: SelectOptionsWithGroups;
  id: string;
  label: string;
  name: string;
  value?: string;
  disabled?: boolean;
  openUpward?: boolean;
  register?: UseFormRegister<any>;
}

const FlatSelect: FC<PropsWithChildren<FlatSelectProps>> = ({
  openUpward = false,
  disabled,
  id,
  items,
  label,
  name,
  register,
  value,
}) => {
  const normalizedItems = useMemo(() => {
    const itemsCopy = [...items.items];
    itemsCopy.unshift(...items.grouped.map(g => g.items).flat());
    return itemsCopy;
  }, [items]);

  const {
    nativeSelectId,
    selectedOption,
    optionsContainerRef,
    customSelectRef,
    isOpen,
    setSelectedOption,
    setIsOpen,
    handleKeyDown,
    handleKeyUp,
  } = useSelectBehavior(normalizedItems, name, id, value);

  const translateY = openUpward ? '-10px' : '10px';
  const transition = useTransition(isOpen, {
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
    <>
      <NativeSelect
        id={nativeSelectId}
        register={register}
        hidden
        items={normalizedItems}
        name={name}
        disabled={disabled}
        onChange={e => {
          if (selectedOption !== e.target.value) {
            setSelectedOption(e.target.value);
          }
        }}
      />

      <StyledFlatSelect
        tabIndex={disabled ? -1 : 0}
        active={isOpen}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        role="combobox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
        aria-autocomplete="none"
        aria-label={label}
        data-disabled={disabled}
        id={id}
        ref={customSelectRef}
      >
        {transition(
          (style, show) =>
            show && (
              <AnimatedOptionsContainer
                openUpward={openUpward}
                ref={optionsContainerRef}
                style={style}
              >
                <ScrollContainer>
                  {items.grouped.map(
                    group =>
                      group && (
                        <FlatSelectOptionGroup
                          key={group.group}
                          name={group.group}
                        >
                          {group.items.map(
                            option =>
                              option && (
                                <FlatSelectOption
                                  index={normalizedItems.indexOf(option)}
                                  disabled={option.disabled}
                                  key={option.label + option.value}
                                  selected={selectedOption === option.value}
                                  onClick={() => {
                                    setSelectedOption(option.value);
                                    setIsOpen(false);
                                  }}
                                >
                                  {option.label}
                                </FlatSelectOption>
                              )
                          )}
                        </FlatSelectOptionGroup>
                      )
                  )}

                  {items.items.map(
                    option =>
                      option && (
                        <FlatSelectOption
                          index={normalizedItems.indexOf(option)}
                          disabled={option.disabled}
                          key={option.label + option.value}
                          selected={selectedOption === option.value}
                          onClick={() => {
                            setSelectedOption(option.value);
                            setIsOpen(false);
                          }}
                        >
                          {option.label}
                        </FlatSelectOption>
                      )
                  )}
                </ScrollContainer>
              </AnimatedOptionsContainer>
            )
        )}
        <Current onClick={() => setIsOpen(!isOpen)}>
          {normalizedItems.find(item => item.value === selectedOption)?.label ||
            'Select'}
        </Current>
      </StyledFlatSelect>
    </>
  );
};

export default FlatSelect;
