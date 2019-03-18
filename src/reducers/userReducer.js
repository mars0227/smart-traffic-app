import initialState from './initialState';
import * as types from '../constants/actionTypes';
import queryString from 'query-string';

const getIdCardSuccess = (user, action) => {
  const {id_card_num: idCard, is_verified} = action.result;
  return {...user, idCard, is_verified};
};

const getIdCardError = (user, action) => ({
  ...user,
  idCard: null,
  is_verified: 0
});

const addIdCardNumberSuccess = (user, action) => ({
  ...user,
  idCardError: false,
  idCard: action.idCardNumber
});

const loginSuccess = (user, action) => {
  const query = action.invite === null
    ? {'info-type': 'NEW_UI'}
    : {'info-type': 'NEW_UI', invite: action.invite};
  const qs = queryString.stringify(query);

  window.history.replaceState({}, '', `?${qs}`);
  return {...user, ...action.user};
};

const getLoginTime = (user) => ({
  ...user,
  updateTokenTime: {
  ...user.updateTokenTime,
  isFetching: true,
  error: false,
  message: ''
  }
});

const getLoginTimeResult = (user, {payload}) => ({
  ...user,
  updateTokenTime: {
    ...user.updateTokenTime,
    ...payload,
    isFetching: false
  }
});
export default function (user = initialState.user, action) {
  switch (action.type) {
    case types.GET_LOGIN_TIME:
      return getLoginTime(user);
    case types.GET_LOGIN_TIME_SUCCESS:
    case types.GET_LOGIN_TIME_ERROR:
      return getLoginTimeResult(user, action);
    case types.LOGIN_SUCCESS:
      return loginSuccess(user, action);
    case types.SET_USER_IDENTITY_SUCCESS:
      return addIdCardNumberSuccess(user, action);
    case types.GET_IDCARD_NUMBER_SUCCESS:
      return getIdCardSuccess(user, action);
    case types.GET_IDCARD_NUMBER_ERROR:
      return getIdCardError(user, action);
    case types.SET_USER_IDENTITY_ERROR:
      return {...user, idCardError: true};
    case types.LOGIN_ERROR: // should go to msg reducer
    case types.REGET_AWS_TOKENS_SUCCESS:
    case types.REGET_AWS_TOKENS_ERROR:
      return {...user, ...action.user};
    case types.SET_RELOGIN_WARNING_MODAL:
      return {...user, login: {...user.login, ...action.payload}};
    case types.SET_DEVICE_INFO:
      return {...user, device: {...action.payload}};
    default:
      return user;
  }
};
