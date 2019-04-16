import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (system = initialState.system, action) {
  switch (action.type) {
    case types.UPDATE_APP_STATE:
      return { ...system, appState: action.payload };
    default:
      return system;
  }
};