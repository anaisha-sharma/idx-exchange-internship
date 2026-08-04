import { render, screen } from '@testing-library/react';
import App from './App';

test('renders property listings page', () => {
  render(<App />);
  const headingElement = screen.getByText(/Property Listings/i);
  expect(headingElement).toBeInTheDocument();
});