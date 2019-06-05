import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import tempReducer from "./reducers/getTempR";

const rootReducer = combineReducers({
  getTemp: tempReducer
});

// const rootReducer = tempReducer;

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
