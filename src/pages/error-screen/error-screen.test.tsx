import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorScreen from './error-screen';
import { withStore } from '../../utils/mock-components';
import { fetchQuestionAction } from '../../store/api-actions';
import { extractActionsTypes } from '../../utils/mocks';
import { APIRoute } from '../../const';

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    const expectedText = 'Не удалось загрузить вопросы';
    const { withStoreComponent } = withStore(<ErrorScreen />, {});

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchQuestionAction.pending" and "fetchQuestionAction.fulfilled" when user clicked replay button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorScreen />, {});
    mockAxiosAdapter.onGet(APIRoute.Questions).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchQuestionAction.pending.type,
      fetchQuestionAction.fulfilled.type,
    ]);
  });
});
