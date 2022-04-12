import React from 'react';
import { render, screen } from '@testing-library/react';
import Calculator from './Calculator';

test('renders learn react link', () => {
  render(<Calculator />);
  const linkElement = screen.getByText(/According to the CDC/i);
  expect(linkElement).toBeInTheDocument();
});
