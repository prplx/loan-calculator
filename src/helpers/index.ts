import thousands from 'thousands';
import roundTo from 'round-to';
import { ILoanState } from '../types';

export const thousandsWithRound = (n: number, round: boolean) => {
  const result = thousands(roundTo(n, round ? 0 : 2));
  const withDecimal = result.split('.');

  return !round && withDecimal.length === 2 && withDecimal[1].length === 1
    ? result + '0'
    : result;
};

export const getMonthlyPayment = (
  loanState: ILoanState,
): string | undefined => {
  const { values, calculation, round } = loanState;

  if (!values || !calculation) return;

  switch (true) {
    case values.procedure === 'A' || values.term === 1:
      return thousandsWithRound(calculation.schedule[0].payment, round);
    case values.procedure === 'D':
      return `${thousandsWithRound(
        calculation.schedule[0].payment,
        round,
      )}...${thousandsWithRound(
        calculation.schedule[calculation.schedule.length - 1].payment,
        round,
      )}`;
  }
};
