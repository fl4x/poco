import {
  GET_TEMPERATURE,
  SET_TEMPERATURE,
  SET_LOADER
} from "../actions/actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
  temp: {},
  time: {},
  loading: false,
  stime: {}
};

const tempReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEMPERATURE: {
      return { ...state, temp: action.data, loading: false, time: new Date() };
    }
    case SET_LOADER: {
      return {
        ...state,
        loading: true
      };
    }
    case SET_TEMPERATURE: {
      AsyncStorage.setItem(
        "lst",
        JSON.stringify({
          ...state,
          ...{ stime: new Date(action.data).toLocaleString() }
        })
      );
      return { ...state, stime: action.data };
    }
    default:
      return state;
  }
};

export default tempReducer;
