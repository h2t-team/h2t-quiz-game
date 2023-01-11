import * as types from './constants';
import { ActionType } from './types';

export const setTestVal = (payload: any): ActionType => {
  return {
    type: types.SET_TEST_VAL,
    payload,
  };
};
