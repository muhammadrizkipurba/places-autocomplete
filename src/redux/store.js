import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.log(err)
		return null;
	}
}

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null ) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.log(err)
		return undefined;
	};
};

const persistedStore = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedStore,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;