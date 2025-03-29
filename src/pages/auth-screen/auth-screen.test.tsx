import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-components';
import AuthScreen from './auth-screen';

describe('Component: AuthScreen', () => {
  it('should render correctly', () => {
    const playAgainText = 'Сыграть ещё раз';
    const loginText = 'Логин';
    const passwordText = 'Пароль';
    const { withStoreComponent } = withStore(<AuthScreen />, {});

    render(withHistory(withStoreComponent));

    expect(screen.getByText(playAgainText)).toBeInTheDocument();
    expect(screen.getByText(loginText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'test@test.com';
    const expectedPasswordValue = 'abc123';
    const { withStoreComponent } = withStore(<AuthScreen />, {});

    render(withHistory(withStoreComponent));
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
