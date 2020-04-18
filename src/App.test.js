import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders run tests text', () => {
  const { getByText } = render(<App />);
  const textElemet = getByText(/Run tests/i);
  expect(textElemet).toBeInTheDocument();
});
