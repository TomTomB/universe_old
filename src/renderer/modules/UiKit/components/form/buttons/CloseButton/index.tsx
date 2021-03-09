import React, { FC } from 'react';
import { ComponentTypes } from '@typings';
import styled, { css } from 'styled-components';

import iconArrowRight from './assets/arrow-right.png';
import iconAdd from './assets/icon_add.png';
import iconBack from './assets/icon_back.png';
import iconClearAll from './assets/icon_clearall.png';
import iconCompare from './assets/icon_compare.png';
import iconCopy from './assets/icon_copy.png';
import iconDelete from './assets/icon_delete.png';
import iconEdit from './assets/icon_edit.png';
import iconExport from './assets/icon_export.png';
import iconImport from './assets/icon_import.png';
import iconNext from './assets/icon_next.png';
import iconPlus from './assets/icon_plus.png';
import iconSettings from './assets/icon_settings.png';
import iconRefresh from './assets/refresh.png';
import iconX from './assets/x-icon.png';

interface StyledCloseButtonProps {
  btnStyle?: CloseButtonStyle;
}

const CloseIcon = styled.div<StyledCloseButtonProps>`
  width: 10px;
  height: 10px;
  -webkit-mask: url(${iconX}) no-repeat center;
  -webkit-mask-size: 10px;
  background-color: #cdbe91;

  ${({ btnStyle }) =>
    (btnStyle === 'arrow' || btnStyle === 'arrowLeft') &&
    css`
      width: 7px;
      height: 10px;
      -webkit-mask: url(${iconArrowRight}) no-repeat center;
      -webkit-mask-size: 7px 10px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'refresh' &&
    css`
      width: 20px;
      height: 20px;
      -webkit-mask: url(${iconRefresh}) no-repeat center;
      -webkit-mask-size: 20px 20px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'cog' &&
    css`
      width: 24px;
      height: 24px;
      -webkit-mask: url(${iconSettings}) no-repeat center;
      -webkit-mask-size: 18px 18px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'edit' &&
    css`
      width: 13px;
      height: 12px;
      -webkit-mask: url(${iconEdit}) no-repeat center;
      -webkit-mask-size: 13px 12px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'plus' &&
    css`
      width: 10px;
      height: 10px;
      -webkit-mask: url(${iconAdd}) no-repeat center;
      -webkit-mask-size: 10px 10px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'delete' &&
    css`
      width: 13px;
      height: 15px;
      -webkit-mask: url(${iconDelete}) no-repeat center;
      -webkit-mask-size: 13px 15px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'next' &&
    css`
      width: 17px;
      height: 16px;
      -webkit-mask: url(${iconNext});
      -webkit-mask-size: 17px 16px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'compare' &&
    css`
      width: 24px;
      height: 24px;
      -webkit-mask: url(${iconCompare}) no-repeat center;
      -webkit-mask-size: 18px 18px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'back' &&
    css`
      width: 16px;
      height: 16px;
      -webkit-mask: url(${iconBack}) no-repeat center;
      -webkit-mask-size: 16px 16px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'add' &&
    css`
      width: 11px;
      height: 11px;
      -webkit-mask: url(${iconPlus}) no-repeat center;
      -webkit-mask-size: 11px 11px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'duplicate' &&
    css`
      width: 20px;
      height: 20px;
      -webkit-mask: url(${iconCopy}) no-repeat center;
      -webkit-mask-size: 18px 18px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'clear' &&
    css`
      width: 17px;
      height: 16px;
      -webkit-mask: url(${iconClearAll}) no-repeat center;
      -webkit-mask-size: 17px 16px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'export' &&
    css`
      width: 17px;
      height: 16px;
      -webkit-mask: url(${iconExport}) no-repeat center;
      -webkit-mask-size: 14px 14px;
    `}

  ${({ btnStyle }) =>
    btnStyle === 'import' &&
    css`
      width: 17px;
      height: 16px;
      -webkit-mask: url(${iconImport}) no-repeat center;
      -webkit-mask-size: 14px 14px;
    `}
`;

const Contents = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #1e282d;
  transition: box-shadow 150ms ease-out, color 150ms ease-out;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCloseButton = styled.button<StyledCloseButtonProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    to top,
    #463714 4%,
    #785a28 23%,
    #c89b3c 90%,
    #c8aa6e 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  padding: 0;
  appearance: none;
  border: 0;

  ${({ btnStyle }) =>
    btnStyle === 'arrowLeft' &&
    css`
      transform: scaleX(-1);
    `}

  &:hover {
    background: linear-gradient(to top, #c89b3c 0%, #f0e6d2 100%);

    ${Contents} {
      background: linear-gradient(to top, #3c3c41 0%, #1e2328 100%);
    }

    ${CloseIcon} {
      background-color: #f0e6d2;
    }
  }

  &:active {
    background: linear-gradient(to top, #785a28 0%, #463714 100%);

    ${Contents} {
      background: none;
      background-color: #1e282d;
    }

    ${CloseIcon} {
      background-color: #785a28;
    }
  }

  &:disabled {
    cursor: default;
    background: none;
    background-color: #5b5a56;
    pointer-events: none;

    ${Contents} {
      background: none;
      background-color: #1e282d;
    }

    ${CloseIcon} {
      background-color: #5b5a56;
    }
  }

  &:disabled ${Contents}, &:active ${Contents} {
    box-shadow: none;
    transition: none;
  }
`;

export type CloseButtonStyle =
  | 'arrow'
  | 'arrowLeft'
  | 'refresh'
  | 'cog'
  | 'edit'
  | 'plus'
  | 'delete'
  | 'next'
  | 'compare'
  | 'back'
  | 'add'
  | 'duplicate'
  | 'clear'
  | 'export'
  | 'import';

export interface CloseButtonProps extends ComponentTypes.ButtonProps {
  btnStyle?: CloseButtonStyle;
  label?: string;
}

const CloseButton: FC<CloseButtonProps> = ({
  btnStyle,
  type,
  className,
  disabled,
  label,
  onClick,
}) => {
  return (
    <StyledCloseButton
      aria-label={label}
      btnStyle={btnStyle}
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <Contents>
        <CloseIcon btnStyle={btnStyle} />
      </Contents>
    </StyledCloseButton>
  );
};

export default CloseButton;
