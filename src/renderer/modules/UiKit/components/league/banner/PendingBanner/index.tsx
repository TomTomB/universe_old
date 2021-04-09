import React, { FC } from 'react';
import invitedBanner from './assets/invited-banner.webm';
import styled from 'styled-components';

export const StyledPendingBanner = styled.video``;

export interface PendingBannerProps {
  className?: string;
}

const PendingBanner: FC<PendingBannerProps> = ({ className }) => {
  return (
    <StyledPendingBanner
      className={className}
      src={invitedBanner}
      muted
      loop
      autoPlay
    />
  );
};

export default PendingBanner;
