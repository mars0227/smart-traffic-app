import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (constructions = initialState.constructions, action) {
  switch (action.type) {
    case types.GET_CONSTRUCTIONS_SUCCEEDED:
      return action.payload;
    case types.GET_CONSTRUCTIONS:
    case types.GET_CONSTRUCTIONS_FAILED:
    default:
      return constructions;
  }
};