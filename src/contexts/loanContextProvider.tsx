import * as React from 'react';
import { createContext, useReducer } from 'react';
import {
  ILoanState,
  LoanActions,
  LoanActionTypes,
  LoanCurrencies,
  LoanContextProps,
} from '../types';
import I18n from '../components/i18n';

const arrayMethod = I18n.language === 'en' ? 'push' : 'unshift';
const reducer = (state: ILoanState, action: LoanActions): ILoanState => {
  switch (action.type) {
    case LoanActionTypes.SET_ACTIVE_CURRENCY:
      const currencies = [...state.currencies.slice(1), state.currencies[0]];
      return { ...state, currencies };
    case LoanActionTypes.SET_CALCULATION:
      return { ...state, calculation: action.payload, calculating: false };
    case LoanActionTypes.SET_VALUES:
      return { ...state, values: action.payload, calculating: true };
    case LoanActionTypes.SET_ROUND:
      return { ...state, round: action.payload };
    case LoanActionTypes.SET_MODAL_IS_OPEN:
      return { ...state, modalIsOpen: !state.modalIsOpen };
    default:
      return state;
  }
};

const initialState: ILoanState = {
  currencies: [LoanCurrencies.DOLLAR, LoanCurrencies.EURO],
  round: true,
  calculating: false,
  modalIsOpen: false,
};
// @ts-ignore
[][arrayMethod].call(initialState.currencies, LoanCurrencies.ROUBLE);

export const LoanContext = createContext<Partial<LoanContextProps>>({});

const EnhancedProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <LoanContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </LoanContext.Provider>
  );
};

export default EnhancedProvider;
