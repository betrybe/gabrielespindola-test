// [instrução do teste] Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// criando tipos de actions para o reducer
export const WALLET_ADD_CURRENCY = 'WALLET_ADD_CURRENCY';
export const WALLET_REMOVE_CURRENCY = 'WALLET_REMOVE_CURRENCY';
export const WALLET_ADD_EXPENSE = 'WALLET_ADD_EXPENSE';
export const WALLET_REMOVE_EXPENSE = 'WALLET_REMOVE_EXPENSE';

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
const initialState = { currencies: [], expenses: [] };
export default (state = initialState, action) => {
  switch (action.type) {
  case WALLET_ADD_CURRENCY:
    return state;

  case WALLET_REMOVE_CURRENCY:
    return state;

  case WALLET_ADD_EXPENSE:
    return state;

  case WALLET_REMOVE_EXPENSE:
    return state;

  default:
    return state;
  }
};
