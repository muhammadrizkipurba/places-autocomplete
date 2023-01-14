
import { SET_SELECTED_PLACE } from "../types";

const initialState = null;

const selectedPlace = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_PLACE:
      return action.payload;
    default:
      return state;
  }
};

export default selectedPlace;