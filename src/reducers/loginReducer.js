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

const handleUpdateExpoPushToken = (login, payload) => {
  const { userInfo } = login;
  const { expoPushToken } = payload;
  const newUserInfo = { ...userInfo, expoPushToken };

  return { ...login, userInfo: newUserInfo };
};

export default function (login = initialState.login, action) {
  switch (action.type) {
    case types.LOGIN_SUCCEEDED:
      return handleLoginSuccess(login, action);
    case types.LOGIN_FAILED:
      return handleLoginFail(login, action);
    case types.LOGIN:
      return handleLogin(login, action);
    case types.SET_EXPO_PUSH_TOKEN_SUCCEEDED:
      return handleUpdateExpoPushToken(login, action.payload);
    case types.LOGOUT:
      return initialState.login;
    case types.LANGUAGE_CHANGE:
      return { ...login, userInfo: { ...login.userInfo, locale: action.payload } };
    default:
      return login;
  }
};