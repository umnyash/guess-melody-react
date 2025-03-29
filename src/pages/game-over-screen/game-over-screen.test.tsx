import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { withHistory, withStore } from '../../utils/mock-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameOverScreen from './game-over-screen';
import { Routes, Route } from 'react-router';

describe('Component: GameOverScreen', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Lose);
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<GameOverScreen />);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    const headingText = 'Какая жалость!';
    const descriptionText = 'У вас закончились все попытки. Ничего, повезёт в следующий раз!';
    const buttonText = 'Попробовать ещё раз';

    render(preparedComponent);

    expect(screen.getByText(headingText)).toBeInTheDocument();
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to game route when user click "Replay" button', async () => {
    const expectedText = 'game screen';
    const mockGameRouteComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Lose} element={<GameOverScreen />} />
        <Route path={AppRoute.Game} element={mockGameRouteComponent} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, {});

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
