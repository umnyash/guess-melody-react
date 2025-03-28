import Logo from './logo';
import { withHistory } from '../../utils/mock-components';
import { render, screen } from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = 'Сыграть ещё раз';
    const expectedAltText = 'Угадай мелодию';

    render(withHistory(<Logo />));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
