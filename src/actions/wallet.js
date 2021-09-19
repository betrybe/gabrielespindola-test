import {
  WALLET_ADD_CURRENCY,
  WALLET_REMOVE_CURRENCY,
  WALLET_ADD_EXPENSE,
  WALLET_REMOVE_EXPENSE,
} from '../reducers/wallet';

export const addCurrency = (currency) => {
  const action = { type: WALLET_ADD_CURRENCY, payload: currency };
  return action;
};
export const removeCurrency = (currency) => {
  const action = { type: WALLET_REMOVE_CURRENCY, payload: currency };
  return action;
};
export const addExpense = (expense) => {
  const action = { type: WALLET_ADD_EXPENSE, payload: expense };
  return action;
};
export const removeExpense = (expense) => {
  const action = { type: WALLET_REMOVE_EXPENSE, payload: expense };
  return action;
};
