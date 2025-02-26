import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

const ErrorView = ({ error }) => (
  <ErrorContainer>
    <p>{error}</p>
    <button onClick={() => window.location.reload()}>Try Again</button>
  </ErrorContainer>
);

export default ErrorView;