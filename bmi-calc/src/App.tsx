import React from 'react';
import './App.css';
import styled from 'styled-components';

import Header from './components/Header/Header.tsx';
import Calculator from './components/Calculator/Calculator.tsx';
import logo from './logo.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  overflow-x: hidden;
`;

function App() {
  return (
    <Container>
      <Header />
      <Calculator />
    </Container>
  );
}

export default App;
