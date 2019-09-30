import thousands from 'thousands';
import roundTo from 'round-to';

export const thousandsWithRound = (number: number, round: boolean) =>
  thousands(roundTo(number, round ? 0 : 2));
