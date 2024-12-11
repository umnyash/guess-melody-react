import { GameType } from '../const';

export type ArtistAnswer = {
  artist: string;
  picture: string;
};

export type Song = {
  artist: string;
  src: string;
};

export type QuestionArtist = {
  answers: ArtistAnswer[];
  song: Song;
  type: GameType.Artist;
};

export type GenreAnswer = {
  src: string;
  genre: string;
};

export type QuestionGenre = {
  answers: GenreAnswer[];
  genre: string;
  type: GameType.Genre;
};

export type Question = QuestionArtist | QuestionGenre;

export type Questions = Question[];

export type UserGenreQuestionAnswer = readonly boolean[];

export type UserArtistQuestionAnswer = string;

export type UserAnswer = UserArtistQuestionAnswer | UserGenreQuestionAnswer;
