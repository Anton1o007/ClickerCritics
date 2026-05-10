import Image from 'next/image';
import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: none;
`;

export const ResponsiveImage = styled(Image)`
max-width: 700px;
max-height: 393.75px;
min-width: 500px;
min-height: 281.25px;
width: auto;
height: auto;
`;