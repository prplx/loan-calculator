import { thousandsWithRound, getMonthlyPayment } from './';
import { ILoanState } from '../types';

test('thousandsWithRound should work as expected', () => {
  expect(thousandsWithRound(1000, true)).toBe('1,000');
  expect(thousandsWithRound(1000, false)).toBe('1,000');
  expect(thousandsWithRound(464374343.888987, true)).toBe('464,374,344');
  expect(thousandsWithRound(464374343.888987, false)).toBe('464,374,343.89');
  expect(thousandsWithRound(464374343.499, false)).toBe('464,374,343.50');
  expect(thousandsWithRound(464374343.5, false)).toBe('464,374,343.50');
  expect(thousandsWithRound(464374343.5, true)).toBe('464,374,344');
  expect(thousandsWithRound(464374343.4, true)).toBe('464,374,343');
});

test('getMonthlyPayment should work as expected', () => {
  let state: Required<ILoanState> = {
    currencies: ['one', 'two', 'three'],
    round: true,
    calculating: false,
    scheduleModalIsOpen: false,
    calculationModalIsOpen: false,
    values: {
      amount: 10000,
      procedure: 'A',
      rate: 10,
      start: new Date(),
      term: 1,
    },
    calculation: {
      schedule: [
        {
          interest: 83.33333333333333,
          principal: 10000.000000000035,
          balance: 0,
          payment: 10083.333333333369,
        },
      ],
      totalInterest: 83.33333333333333,
      totalPayments: 10083.333333333334,
    },
  };
  expect(getMonthlyPayment({ ...state, calculation: undefined })).toBe(
    undefined,
  );

  expect(getMonthlyPayment(state)).toBe('10,083');

  state = {
    ...state,
    values: { ...state.values, procedure: 'D' },
    round: false,
  };
  expect(getMonthlyPayment(state)).toBe('10,083.33');

  const calculation = {
    schedule: [
      {
        interest: 83.33333333333333,
        principal: 4979.25311203321,
        balance: 5020.74688796679,
        payment: 5062.586445366543,
      },
      {
        interest: 41.839557399723255,
        principal: 5020.7468879668195,
        balance: 0,
        payment: 5062.586445366543,
      },
    ],
    totalInterest: 125.17289073305659,
    totalPayments: 10125.172890733056,
  };
  expect(
    getMonthlyPayment({
      ...state,
      values: { ...state.values, term: 2 },
      calculation,
    }),
  ).toBe('5,062.59...5,062.59');

  state = {
    ...state,
    values: { ...state.values, procedure: 'D', term: 2 },
    round: false,
    calculation,
  };
  expect(getMonthlyPayment(state)).toBe('5,062.59...5,062.59');
});
