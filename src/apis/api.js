import {
  fetchGet,
  fetchPost,
  fetchPostWithFile,
  fetchPatch
} from './libs/fetch';

export const route = __DEV__
  ? 'http://172.20.10.3:3002'
  : 'https://www.itrackcon.com/stserver'; //vircon server

export const login = payload => fetchPost(`${route}/login`, payload);
export const getConstructions = () => fetchGet(`${route}/constructions`);
export const getIdentities = () => fetchGet(`${route}/identities`);
export const getReservations = payload => fetchGet(`${route}/reservations`, payload);
export const getReservation = ({ id }) => fetchGet(`${route}/reservations/${id}`);
export const setReservation = payload => fetchPostWithFile(`${route}/reservations`, payload);
export const updateReservation = ({ reservationId, ...payload }) => fetchPatch(`${route}/reservations/${reservationId}`, payload);
export const setExpoPushToken = ({ userId, ...payload }) => fetchPost(`${route}/users/${userId}/expo_push_token`, payload);
export const getMonitorView = payload => fetchGet(`${route}/camera`, payload);
export const updateAlertState = payload => fetchPatch(`${route}/camera/alert`, payload);
export const setUserActiveState = ({ userId, ...payload }) => fetchPost(`${route}/users/${userId}/active`, payload);
