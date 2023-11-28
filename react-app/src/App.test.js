import { render, screen } from '@testing-library/react';
import App from './App';
import excercise from './exercise';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
