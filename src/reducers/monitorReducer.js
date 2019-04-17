import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (monitor = initialState.monitor, action) {
  switch (action.type) {
    case types.GET_MONITOR_VIEW_SUCCEEDED:
      return action.payload;
    case types.UPDATE_ALERT_STATE_SUCCEEDED:
      return { ...monitor, ...action.payload };
    case types.UPDATE_ALERT_STATE_BY_NOTIFICATION:
      return { ...monitor, ...action.payload };
    case types.UPDATE_MONITOR_VIEW_BY_WEBSOCKET:
      return { ...monitor, ...action.payload };
    case types.GET_MONITOR_VIEW_FAILED:
    case types.GET_MONITOR_VIEW:
    default:
      return monitor;
  }
};