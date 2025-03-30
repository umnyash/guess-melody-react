import { music, system, name, internet } from 'faker';
import { AuthorizationStatus, GameType, NameSpace } from '../const';
import { QuestionArtist, QuestionGenre } from '../types/question';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeArtistQuestion = (): QuestionArtist => ({
  type: GameType.Artist,
  song: {
    artist: name.title(),
    src: system.filePath(),
  },
  answers: new Array(3).fill(null).map(() => ({
    picture: internet.avatar(),
    artist: name.title(),
  })),
});

export const makeFakeGenreQuestion = (): QuestionGenre => ({
  type: GameType.Genre,
  genre: music.genre(),
  answers: new Array(4).fill(null).map(() => ({
    genre: music.genre(),
    src: system.filePath(),
  })),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
  [NameSpace.Data]: { questions: [], isQuestionsDataLoading: false, hasError: false },
  [NameSpace.Game]: { step: 10, mistakes: 2 },
  ...initialState ?? {},
});
