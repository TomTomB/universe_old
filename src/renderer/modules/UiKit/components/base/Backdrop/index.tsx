import React, { FC } from 'react';
import backdropMagic from './assets/backdrop-magic.png';
import styled from 'styled-components';

export const StyledBackdrop = styled.div`
  position: relative;
  background-color: #000;
  background-image: url(${backdropMagic});
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

export interface BackdropProps {
  className?: string;
}

const Backdrop: FC<BackdropProps> = ({ className }) => {
  return <StyledBackdrop className={className} />;
};

export default Backdrop;
