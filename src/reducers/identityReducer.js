import initialState from './initialState';
import * as types from '../constants/actionTypes';

const getIdentities = (action) => {
  return action.payload.identities;
};

export default function (identities = initialState.identities, action) {
  switch (action.type) {
    case types.GET_IDENTITIES_SUCCEEDED:
      return getIdentities(action);
    case types.GET_IDENTITIES:
    case types.GET_IDENTITIES_FAILED:
    default:
      return identities;
  }
};