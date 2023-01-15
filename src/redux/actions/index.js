import { RESET_SEARCH_HISTORY, SET_SEARCH_HISTORY, SET_SELECTED_PLACE } from "../types";

export const setSelectedPlace = (payload) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_PLACE,
    payload,
  });
};

export const addPlaceHistory = (payload) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_HISTORY,
    payload,
  });
};

export const resetSearchHistory = () => (dispatch) => {
  dispatch({
    type: RESET_SEARCH_HISTORY,
    payload: [],
  });
};
