import axios from "axios";
import { RESET_SEARCH_HISTORY, SET_SEARCH_HISTORY, SET_SELECTED_PLACE } from "../types";

export const getPlaceDetails = (placeId) => async (dispatch) => {
  const response = await axios.get(
    `/maps/api/place/details/json?place_id=${placeId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );
  return response.data;
};

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
