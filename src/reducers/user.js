// [instrução do teste] Esse reducer será responsável por tratar as informações da pessoa usuária

// criando tipos de actions para o reducer
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

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

const initialState = { email: '', isAuthenticated: false };
export default (state = initialState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return state;

  case USER_LOGOUT:
    return state;

  default:
    return state;
  }
};
