// [instrução do teste] Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// criando tipos de actions para o reducer
export const WALLET_CHANGE_CURRENCY = 'WALLET_CHANGE_CURRENCY';
export const WALLET_IS_FETCHING_CURRENCIES = 'WALLET_IS_FETCHING_CURRENCIES';
export const WALLET_SAVE_EXPENSE = 'WALLET_SAVE_EXPENSE';
export const WALLET_REMOVE_EXPENSE = 'WALLET_REMOVE_EXPENSE';
export const WALLET_SELECT_CURRENT_EXPENSE = 'WALLET_SELECT_CURRENT_EXPENSE';
export const WALLET_CHANGE_CURRENCIES = 'WALLET_CHANGE_CURRENCIES';
export const WALLET_ERROR = 'WALLET_ERROR';

/**
[instrução do teste]
Em função da forma como os testes automatizados foram construídos, nessa aplicação você deverá obrigatoriamente utilizar o seguinte formato do estado global:
{
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
}
 */
const defaultExpense = {
  name: '',
  value: 0.0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Administracao',
  exchangeRates: {},
  convertedValue: 0.0,
};

const initialState = {
  currency: 'BRL',
  currencies: [],
  expenses: [],
  totalExpenses: 0.0,
  isFetchingCurrencies: false,
  expense: { ...defaultExpense },
  error: false,
  errorMessage: '',
};

function getTotalExpenses(newExpenses) {
  if (newExpenses.length === 0) return 0.00;
  if (newExpenses.length === 1) return newExpenses[0].convertedValue;

  let aggr = 0.0;
  newExpenses.forEach((expense) => {
    aggr += parseFloat(expense.convertedValue);
  });
  return parseFloat(aggr).toFixed(2);
}

function saveExpense(state, action) {
  const expense = { ...action.payload, new: false };
  let newExpenses = [...state.expenses];
  let totalExpenses = 0;

  if (!('id' in action.payload) || !expense.id) {
    expense.id = state.expenses.length + 1;
    newExpenses = [...state.expenses];
    newExpenses.push(expense);
    totalExpenses = getTotalExpenses(newExpenses);
    return {
      ...state,
      expenses: newExpenses,
      expense: { ...defaultExpense, id: null, new: true },
      totalExpenses,
    };
  }
  totalExpenses = getTotalExpenses(newExpenses);
  newExpenses = state.expenses.map((item) => {
    if (item.id !== expense.id) return item;
    return expense;
  });
  return {
    ...state,
    expenses: newExpenses,
    expense: { ...defaultExpense, id: null, new: true },
    totalExpenses,
  };
}

function removeExpense(state, action) {
  let newExpenses = [...state.expenses];
  newExpenses = newExpenses.filter((item) => item.id !== action.payload);
  const totalExpenses = getTotalExpenses(newExpenses);
  return {
    ...state,
    expenses: newExpenses,
    totalExpenses,
  };
}

export default (state = initialState, action) => {
  let expense = {};

  switch (action.type) {
  case WALLET_CHANGE_CURRENCIES:
    return { ...state, currencies: action.payload, isFetchingCurrencies: false };

  case WALLET_IS_FETCHING_CURRENCIES:
    return { ...state, isFetchingCurrencies: action.payload };

  case WALLET_SELECT_CURRENT_EXPENSE:
    expense = state.expenses.find((item) => item.id === action.payload || null);
    return { ...state, expense: expense || { ...defaultExpense } };

  case WALLET_SAVE_EXPENSE:
    return saveExpense(state, action);

  case WALLET_REMOVE_EXPENSE:
    return removeExpense(state, action);

  case WALLET_ERROR:
    return { ...state, error: true, errorMessage: action.payload };

  default:
    return state;
  }
};
