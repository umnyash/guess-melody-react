import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeArtistQuestion, makeFakeGenreQuestion } from '../utils/mocks';
import { State } from '../types/state';
import { checkAuthAction, fetchQuestionAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { questions: [] } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" with server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchQuestionAction', () => {
    it('should dispatch "fetchQuestionAction.pending" and "fetchQuestionAction.fulfilled" when server response 200', async () => {
      const mockQuestions = [makeFakeArtistQuestion(), makeFakeGenreQuestion()];
      mockAxiosAdapter.onGet(APIRoute.Questions).reply(200, mockQuestions);

      await store.dispatch(fetchQuestionAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchQuestionActionFulfilled = emittedActions[1] as ReturnType<typeof fetchQuestionAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchQuestionAction.pending.type,
        fetchQuestionAction.fulfilled.type,
      ]);

      expect(fetchQuestionActionFulfilled.payload).toEqual(mockQuestions);
    });

    it('should dispatch "fetchQuestionAction.pending" and "fetchQuestionAction.rejected" with server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Questions).reply(400, []);

      await store.dispatch(fetchQuestionAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchQuestionAction.pending.type,
        fetchQuestionAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute" and "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.com', password: 'abc123' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.com', password: 'abc123' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
