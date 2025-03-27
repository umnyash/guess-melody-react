import { isArtistAnswerCorrect, isGenreAnswerCorrect } from './game';
import { makeFakeArtistQuestion, makeFakeGenreQuestion } from './utils/mocks';

describe('Business Logic: check user\'s answer', () => {
  describe('Function: isArtistAnswerCorrect', () => {
    it('should return "true" when answer is correct', () => {
      // Arrange
      const mockArtistQuestion = makeFakeArtistQuestion();
      const { artist: correctAnswer } = mockArtistQuestion.song;

      // Act
      const result = isArtistAnswerCorrect(mockArtistQuestion, correctAnswer);

      // Accert
      expect(result).toBe(true);
    });

    it('should return "false" when answer is incorrect', () => {
      // Arrange
      const mockArtistQuestion = makeFakeArtistQuestion();
      const incorrectAnswer = 'unknown';

      // Act
      const result = isArtistAnswerCorrect(mockArtistQuestion, incorrectAnswer);

      // Accert
      expect(result).toBe(false);
    });
  });

  describe('Function: isGenreAnswerCorrect', () => {
    it('should return "true" when answer is correct', () => {
      // Arrange
      const mockGenreQuestion = makeFakeGenreQuestion();
      const { answers, genre } = mockGenreQuestion;
      const correctAnswer = answers.map((answer) => answer.genre === genre);

      // Act
      const result = isGenreAnswerCorrect(mockGenreQuestion, correctAnswer);

      // Accert
      expect(result).toBe(true);
    });

    it('should return "false" when answer is incorrect', () => {
      // Arrange
      const mockGenreQuestion = makeFakeGenreQuestion();
      const { answers, genre } = mockGenreQuestion;
      const incorrectAnswer = answers.map((answer) => answer.genre !== genre);

      // Act
      const result = isGenreAnswerCorrect(mockGenreQuestion, incorrectAnswer);

      // Accert
      expect(result).toBe(false);
    });
  });
});
