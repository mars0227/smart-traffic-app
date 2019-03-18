export const LOGIN = 'LOGIN';
import * as types from '../constants/actionTypes';

export const loginAction = payload => ({
  type: LOGIN,
  payload
});

export const getIdentitiesAction = () => ({
  type: types.GET_IDENTITIES
});

export const getMyReservationsAction = () => ({
  type: types.GET_MY_RESERVATIONS
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

export const setReservationAction = payload => ({
  type: types.SET_RESERVATION,
  payload
});

export const setMyReservationFilterAction = payload => ({
  type: types.SET_MY_RESERVATION_FILTER,
  payload
});

export const setShowingReservationIdAction = payload => ({
  type: types.SET_SHOWING_RESERVATION_ID,
  payload
})