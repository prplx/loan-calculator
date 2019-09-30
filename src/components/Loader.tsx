import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const Loader: React.FC = () => {
  return (
    <Wrapper>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
      <Elem></Elem>
    </Wrapper>
  );
};

const animation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;

  & div:nth-of-type(1) {
    animation-delay: 0s;
  }

  & div:nth-of-type(2) {
    animation-delay: -0.4s;
  }

  & div:nth-of-type(3) {
    animation-delay: -0.8s;
  }

  & div:nth-of-type(4) {
    animation-delay: -0.4s;
  }

  & div:nth-of-type(5) {
    animation-delay: -0.8s;
  }

  & div:nth-of-type(6) {
    animation-delay: -1.2s;
  }

  & div:nth-of-type(7) {
    animation-delay: -0.8s;
  }

  & div:nth-of-type(8) {
    animation-delay: -1.2s;
  }

  & div:nth-of-type(9) {
    animation-delay: -1.6s;
  }
`;
const Elem = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  animation: ${animation} 1.2s linear infinite;
`;

export default Loader;
