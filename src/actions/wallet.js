import {
  WALLET_CHANGE_CURRENCIES,
  WALLET_CHANGE_CURRENCY,
  WALLET_IS_FETCHING_CURRENCIES,
  WALLET_REMOVE_EXPENSE,
  WALLET_SELECT_CURRENT_EXPENSE,
  WALLET_SAVE_EXPENSE,
  WALLET_ERROR,
} from '../reducers/wallet';

export const changeCurrency = (currency) => {
  const action = { type: WALLET_CHANGE_CURRENCY, payload: currency };
  return action;
};
export const isFetchingCurrencies = (isFecthing) => {
  const action = { type: WALLET_IS_FETCHING_CURRENCIES, payload: isFecthing };
  return action;
};
export const saveExpense = (expense) => {
  const action = { type: WALLET_SAVE_EXPENSE, payload: expense };
  return action;
};
export const removeExpense = (expense) => {
  const action = { type: WALLET_REMOVE_EXPENSE, payload: expense };
  return action;
};
export const selectCurrentExpense = (id) => {
  const action = { type: WALLET_SELECT_CURRENT_EXPENSE, payload: id };
  return action;
};

function transformData(apiData) {
  const aux = apiData.name.split('/');
  const name = aux[0] || apiData.name;
  return { ...apiData, originalName: apiData.name, name, moedaTo: aux[1] || 'Real' };
}

// action creator async
// neste caso estou utilizando um action creator que lida com side effexts(ajax)
// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
export const getAllCurrencies = async (dispatch) => {
  const fetchCurrencies = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    if (!response.ok) throw new Error('Erro ao buscar dados das moedas!');
    const data = await response.json();

    const finalData = {};
    Object.keys(data).forEach((key) => {
      if (key !== 'USDT') finalData[key] = transformData(data[key]);
    });

    return finalData;
  };
  try {
    const data = await fetchCurrencies();
    dispatch({ type: WALLET_CHANGE_CURRENCIES, payload: data });
  } catch (error) {
    dispatch({ type: WALLET_ERROR, payload: error.message });
  }
};
