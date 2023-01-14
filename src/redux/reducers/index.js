import { combineReducers } from "redux";
import history from "./history";
import selectedPlace from "./selectedPlace";

const rootReducer = combineReducers({
  selectedPlace,
  history
});

export default rootReducer;