import React from 'react';
import { LoadingWrapper, ResponsiveImage } from './styles';

const LoadingAnimation = () => {
  return (
    <LoadingWrapper>
      <ResponsiveImage src="/images/loading_icon.gif" width={960} height={540} alt="Loading" />
    </LoadingWrapper>
  );
};

export default LoadingAnimation;
