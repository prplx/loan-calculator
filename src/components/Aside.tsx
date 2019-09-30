import * as React from 'react';
import styled from '@emotion/styled';

const Aside: React.FC = ({ children }) => <Styled>{children}</Styled>;

const Styled = styled.aside`
  padding: 2em;
  text-align: center;
  background: var(--dark-blue);
  color: white;
  position: relative;
`;

export default Aside;
