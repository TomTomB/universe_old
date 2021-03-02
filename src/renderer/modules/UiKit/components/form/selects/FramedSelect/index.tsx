import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import dropdownArrowLocked from '../assets/img/up-down-arrow-locked.png';
import dropdownArrow from '../assets/img/up-down-arrow.png';
import useClickOutside from '@uikit/hooks/useClickOutside';
import { animated, useTransition } from 'react-spring';
import { springConfigHarsh } from '@uikit/util/springConfig';
import { ScrollContainer, StyledScrollContainer } from '@uikit/components/base';
import generateId from '@uikit/util/idGenerator';
import Label from '../../Label';
import FormField from '../../base/FormField';
import FramedSelectOption from './Option';

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

const NativeSelect = styled.select`
  display: none;
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

interface FramedSelectProps {
  items: SelectOption[];
  id: string;
  label: string;
  name: string;
  value?: string;
  disabled?: boolean;
  openUpward?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (...args: any) => any;
}

const getOption = ({
  selectId,
  optionIndex,
}: {
  selectId: string;
  optionIndex: number;
}) => {
  return document.querySelector<HTMLLIElement>(
    `#${selectId} [data-index="${optionIndex}"]`
  );
};

const updateOptionFocus = ({
  selectId,
  optionIndex,
}: {
  selectId: string;
  optionIndex: number;
}) => {
  const optionElement = getOption({ selectId, optionIndex });
  optionElement?.focus();
};

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
  const nativeSelectId = useMemo(() => {
    return generateId();
  }, []);
  const labelId = useMemo(() => {
    return generateId();
  }, []);
  const [selected, setSelected] = useState(
    !value && items.length ? items[0].value : value
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentFocusedOptionIndex, setCurrentFocusedOptionIndex] = useState(
    selected ? items.findIndex(i => i.value === selected) : 0
  );
  const optionsContainerRef = useRef(null);
  const customSelectRef = useRef<HTMLDivElement>(null);

  useClickOutside(optionsContainerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const option = items[currentFocusedOptionIndex];
      if (option) {
        const optionElement = getOption({
          selectId: id,
          optionIndex: currentFocusedOptionIndex,
        });
        optionElement?.focus();

        setTimeout(() => {
          optionElement?.scrollIntoView({ block: 'nearest' });
        }, 10);
      }
    }
  }, [isOpen, currentFocusedOptionIndex, items, id]);

  useEffect(() => {
    const element = document.getElementById(nativeSelectId);
    if (element) {
      (element as HTMLSelectElement).value = selected as string;
    }
    setCurrentFocusedOptionIndex(items.findIndex(i => i.value === selected));
  }, [selected, name, items, nativeSelectId]);

  let searchTerm = '';
  let debounceTimeout: number | null = null;

  const trySelectOption = (atIndex: number, dir?: 'next' | 'prev') => {
    const itemToSelect = items[atIndex];
    if (itemToSelect) {
      if (itemToSelect.disabled) {
        if (dir === 'prev') {
          trySelectOption(atIndex - 1, dir);
        } else if (dir === 'next') {
          trySelectOption(atIndex + 1, dir);
        }

        return;
      }

      setSelected(itemToSelect.value);
      if (isOpen) {
        updateOptionFocus({
          selectId: id,
          optionIndex: atIndex,
        });
      }
    }
  };

  const searchAndSelectOption = () => {
    const searchedOptionIndex = items.findIndex(option => {
      return (
        option.label.toLowerCase().startsWith(searchTerm) && !option.disabled
      );
    });
    trySelectOption(searchedOptionIndex);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case 'Enter':
      case 'Space':
        if (isOpen) {
          setIsOpen(false);
          customSelectRef.current?.focus();
        } else {
          setIsOpen(true);
        }
        break;

      case 'Escape':
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          customSelectRef.current?.focus();
        }

        break;

      case 'ArrowDown':
        if (event.altKey && !isOpen) {
          setIsOpen(true);
        }

        trySelectOption(currentFocusedOptionIndex + 1, 'next');
        break;

      case 'ArrowUp':
        if (event.altKey && !isOpen) {
          setIsOpen(true);
        }

        trySelectOption(currentFocusedOptionIndex - 1, 'prev');
        break;

      default:
        if (debounceTimeout) {
          window.clearTimeout(debounceTimeout);
        }
        searchTerm += event.key;
        debounceTimeout = window.setTimeout(() => {
          searchTerm = '';
        }, 500);

        searchAndSelectOption();
        break;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.code === 'Tab' ||
      event.code === 'ArrowDown' ||
      event.code === 'ArrowUp'
    ) {
      if (isOpen) {
        event.preventDefault();
      }
    }
  };

  const transitions = useTransition(isOpen, null, {
    config: springConfigHarsh,
    from: { transform: 'scaleY(0)', opacity: 0 },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0)' },
  });

  return (
    <FormField>
      <NativeSelect
        aria-hidden="true"
        id={nativeSelectId}
        ref={register()}
        name={name}
        disabled={disabled}
        onChange={e => {
          if (selected !== e.target.value) {
            setSelected(e.target.value);
          }
        }}
      >
        {items.map(
          option =>
            option && (
              <option
                key={option.label + option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            )
        )}
      </NativeSelect>

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
                            selected={selected === option.value}
                            onClick={() => {
                              setSelected(option.value);
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
            {items.find(item => item.value === selected)?.label || 'Select'}
          </CurrentValue>
        </CurrentContainer>
      </Select>
    </FormField>
  );
};

export default FramedSelect;
