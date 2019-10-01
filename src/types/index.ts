// tslint:disable: max-classes-per-file

import { FieldProps } from 'formik';
import { Dispatch } from 'react';

export interface IFormData {
  procedure: string;
  start: Date;
  term: number;
  amount: number;
  rate: number;
}

export interface IFormikFieldProps extends FieldProps {
  label?: string;
  InputProps?: object;
  fullWidth?: boolean;
  disabled: boolean;
}

export interface ILoanState
  extends Readonly<{
    currencies: string[];
    calculation?: ICalculation;
    values?: IFormData;
    round: boolean;
    calculating: boolean;
    scheduleModalIsOpen: boolean;
    calculationModalIsOpen: boolean;
  }> {}

export enum LoanActionTypes {
  SET_ACTIVE_CURRENCY,
  SET_CALCULATION,
  SET_VALUES,
  SET_ROUND,
  SET_SCHEDULE_MODAL_IS_OPEN,
  SET_CALCULATION_MODAL_IS_OPEN,
}

export interface ScheduleDatum {
  interest: number;
  principal: number;
  balance: number;
  payment: number;
}

export interface ICalculation {
  totalInterest: number;
  totalPayments: number;
  schedule: ScheduleDatum[];
}

interface IAction {
  readonly type: number;
}

class LoanSetActiveCurrency implements IAction {
  readonly type = LoanActionTypes.SET_ACTIVE_CURRENCY;
}

class LoanSetCalculation implements IAction {
  readonly type = LoanActionTypes.SET_CALCULATION;
  constructor(public payload: ICalculation) {}
}

class LoanSetValues implements IAction {
  readonly type = LoanActionTypes.SET_VALUES;
  constructor(public payload: IFormData) {}
}

class LoanSetRound implements IAction {
  readonly type = LoanActionTypes.SET_ROUND;
  constructor(public payload: boolean) {}
}

class LoanSetScheduleModalIsOpen implements IAction {
  readonly type = LoanActionTypes.SET_SCHEDULE_MODAL_IS_OPEN;
}

class LoanSetCalculationModalIsOpen implements IAction {
  readonly type = LoanActionTypes.SET_CALCULATION_MODAL_IS_OPEN;
}

export type LoanActions =
  | LoanSetActiveCurrency
  | LoanSetCalculation
  | LoanSetValues
  | LoanSetRound
  | LoanSetScheduleModalIsOpen
  | LoanSetCalculationModalIsOpen;

export enum LoanCurrencies {
  ROUBLE = '₽',
  DOLLAR = '$',
  EURO = '€',
}

export interface LoanContextProps {
  state: ILoanState;
  dispatch: Dispatch<LoanActions>;
}

export interface ScheduleProps {
  schedule: ICalculation['schedule'];
  round: boolean;
  currency: string;
  start: Date;
}

export interface IModalProps {
  render: () => React.ReactNode;
  onClose: () => void;
  open: boolean;
}
