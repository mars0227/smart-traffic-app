import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { arrayRemove } from '../utils/utils';

export default function (createReservation = initialState.createReservation, action) {

  switch (action.type) {
    case types.SELECT_LOCATION:
      return { ...createReservation, location: action.payload };
    case types.SELECT_DATE:
      return { ...createReservation, date: action.payload };
    case types.SELECT_TIME_SLOT:
      return { ...createReservation, timeSlot: action.payload };
    case types.SET_LICENSE_PLATE_NUMBER:
      return { ...createReservation, licensePlateNumber: action.payload };
    case types.SET_MATERIAL:
      return { ...createReservation, material: action.payload };
    case types.CREATE_RESERVATION_SUCCEEDED:
      return { ...createReservation, ok: true, errMsg: '' };
    case types.CREATE_RESERVATION_FAILED:
      return { ...createReservation, ok: false, errMsg: action.payload.errMsg };
    case types.CLEAN_RESERVATION:
      return initialState.createReservation;
    case types.STORE_IMAGE:
      return { ...createReservation, pictureUris: [...createReservation.pictureUris, action.payload] };
    case types.REMOVE_IMAGE:
      return { ...createReservation, pictureUris: arrayRemove(createReservation.pictureUris, action.payload) };
    default:
      return createReservation;
  }
};