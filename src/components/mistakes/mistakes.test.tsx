import { render, screen } from '@testing-library/react';
import Mistakes from './mistakes';

describe('Component: Mistakes', () => {
  it('should render correctly', () => {
    const expectedCount = 3;
    const mistakesContainerTestId = 'mistakes-container';
    const mistakesItemTestId = 'mistakes-item';

    render(<Mistakes count={expectedCount} />);
    const mistakesContainer = screen.getByTestId(mistakesContainerTestId);
    const mistakesItems = screen.getAllByTestId(mistakesItemTestId);

    expect(mistakesContainer).toBeInTheDocument();
    expect(mistakesItems.length).toBe(expectedCount);
  });
});
