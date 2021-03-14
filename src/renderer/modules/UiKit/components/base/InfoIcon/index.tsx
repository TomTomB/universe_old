import React, { FC } from 'react';
import styled from 'styled-components';

import infoIcon from './assets/info-icon.svg';

export const StyledInfoIcon = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  background-image: url(${infoIcon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export interface InfoIconProps {
  className?: string;
  width?: number;
}

const InfoIcon: FC<InfoIconProps> = ({ className, width = 18 }) => {
  return <StyledInfoIcon className={className} width={width} />;
};

export default InfoIcon;
