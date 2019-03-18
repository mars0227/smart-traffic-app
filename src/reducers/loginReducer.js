import initialState from './initialState';
import * as types from '../constants/actionTypes';

const handleLogin = (login, action) => ({
  ...login, identity: action.payload.identity
});

const handleLoginSuccess = (login, action) => ({
  ...login,
  ok: true,
  errMsg: '',
  userInfo: action.payload
});

const handleLoginFail = (login, action) => ({
  ok: false,
  errMsg: action.payload.errMsg
});

export default function (login = initialState.login, action) {
  switch (action.type) {
    case types.LOGIN_SUCCEEDED:
      return handleLoginSuccess(login, action);
    case types.LOGIN_FAILED:
      return handleLoginFail(login, action);
    case types.LOGIN:
      return handleLogin(login, action);
    default:
      return login;
  }
};