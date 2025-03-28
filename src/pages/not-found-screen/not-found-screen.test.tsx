import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../utils/mock-components';
import { render, screen } from '@testing-library/react';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeadingText = '404. Page not found';
    const expectedLinkText = 'Вернуться на главную';

    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText(expectedHeadingText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
