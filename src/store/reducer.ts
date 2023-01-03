import { ActionType, GlobalStateInterface } from './types';
import * as types from './constants';

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
  switch (action.type) {
    case types.SET_TEST_VAL:
      return {
        ...state,
        testVal: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
