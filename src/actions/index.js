export const LOGIN = 'LOGIN';
import * as types from '../constants/actionTypes';

export const loginAction = payload => ({
  type: LOGIN,
  payload
});

export const getIdentitiesAction = () => ({
  type: types.GET_IDENTITIES
});

export const getConstructionsAction = () => ({
  type: types.GET_CONSTRUCTIONS
});

export const selectLocationAction = payload => ({
  type: types.SELECT_LOCATION,
  payload
});

export const selectDateAction = payload => ({
  type: types.SELECT_DATE,
  payload
});

export const selectTimeSlotAction = payload => ({
  type: types.SELECT_TIME_SLOT,
  payload
});

export const setLicensePlateNumberAction = payload => ({
  type: types.SET_LICENSE_PLATE_NUMBER,
  payload
});

export const setMaterialAction = payload => ({
  type: types.SET_MATERIAL,
  payload
});
// my reservation
export const getMyReservationsAction = payload => ({
  type: types.GET_MY_RESERVATIONS,
  payload
});

export const setReservationAction = payload => ({
  type: types.SET_RESERVATION,
  payload
});

export const setMyReservationFilterAction = payload => ({
  type: types.SET_MY_RESERVATIONS_FILTER,
  payload
});

export const setMyReservationsShowingReservationIdAction = payload => ({
  type: types.SET_MY_RESERVATIONS_SHOWING_RESERVATION_ID,
  payload
});
// all reservation
export const getAllReservationsAction = payload => ({
  type: types.GET_ALL_RESERVATIONS,
  payload
});

export const setAllReservationsFilterAction = payload => ({
  type: types.SET_ALL_RESERVATIONS_FILTER,
  payload
});

export const setAllReservationsShowingReservationIdAction = payload => ({
  type: types.SET_ALL_RESERVATIONS_SHOWING_RESERVATION_ID,
  payload
});

export const updateReservationAction = payload => ({
  type: types.UPDATE_RESERVATION,
  payload
});

export const cleanCreateReservationAction = () => ({
  type: types.CLEAN_RESERVATION
});

export const updatePictureUriAction = payload => ({
  type: types.TAKE_PICTURE_SUCCEEDED,
  payload
});

export const setExpoPushTokenAction = payload => ({
  type: types.SET_EXPO_PUSH_TOKEN,
  payload
});

export const getNotificationAction = payload => ({
  type: types.GET_NOTIFICATION,
  payload
});

export const showNotificationSucceededAction = () => ({
  type: types.SHOW_NOTIFICATION_SUCCEEDED
});

export const logoutAction = () => ({
  type: types.LOGOUT
});

export const updateReservationByNotificaitonAction = payload => ({
  type: types.UPDATE_RESERVATION_BY_NOTIFICATION,
  payload
});

export const setReservationByNotificationAction = payload => ({
  type: types.SET_RESERVATION_BY_NOTIFICATION,
  payload
});