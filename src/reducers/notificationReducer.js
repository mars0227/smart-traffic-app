import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (notification = initialState.notification, action) {
  switch (action.type) {
    case types.GET_NOTIFICATION:
      return { ...notification, ...action.payload, enableOverlay: true };
    case types.SHOW_NOTIFICATION_SUCCEEDED:
      return { ...notification, enableOverlay: false };
    case types.ADD_NOTIFICATION_REFERENCE:
      return { ...notification, ref: action.payload };
    default:
      return notification;
  }
};