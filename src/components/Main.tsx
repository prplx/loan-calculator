import * as React from 'react';
import styled from '@emotion/styled';

const Main: React.FC = ({ children }) => <Styled>{children}</Styled>;

const Styled = styled.main`
  padding: 2em;
`;

export default Main;
