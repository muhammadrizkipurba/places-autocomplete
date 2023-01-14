
import { RESET_SEARCH_HISTORY, SET_SEARCH_HISTORY } from "../types";

const initialState = [];

const history = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SEARCH_HISTORY:
      return [action.payload, ...state];
    case RESET_SEARCH_HISTORY:
      return action.payload;
    default:
      return state;
  }
};

export default history;