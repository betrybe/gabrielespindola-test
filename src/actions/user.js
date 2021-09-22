import { USER_LOGIN, USER_LOGOUT } from '../reducers/user';

export const login = (user) => ({ type: USER_LOGIN, payload: user });
export const logout = () => ({ type: USER_LOGOUT });
