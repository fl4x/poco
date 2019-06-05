import { GET_TEMPERATURE, SET_LOADER, SET_TEMPERATURE } from "./actionTypes";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";

const owKey = "8e8ea4a2a24245d3db5a9a4645edcb18";

export const getTemp = respon => {
  return {
    type: GET_TEMPERATURE,
    data: respon
  };
};

export const setTemp = () => {
  return {
    type: SET_LOADER
  };
};

export const setRemp = tt => {
  return {
    type: SET_TEMPERATURE,
    data: tt
  };
};

export const fetchData = () => {
  return async dispatch => {
    try {
      await navigator.geolocation.getCurrentPosition(
        async position => {
          //console.log("position input---------", position);
          //console.log("timestamp:------------", position.timestamp);
          //console.log("Lat------", position.coords.latitude);
          //console.log("Lng------", position.coords.longitude);
          dispatch(setTemp());
          await axios
            .get(
              "https://api.openweathermap.org/data/2.5/weather?lat=" +
                position.coords.latitude +
                "&lon=" +
                position.coords.longitude +
                "&units=metric" +
                "&appid=" +
                owKey
            )
            .then(res => {
              let dat = new Date();
              //////////////////////////////////////////////
              console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSs", res.data);
              dispatch(getTemp(res.data.main));
              dispatch(setRemp(dat));
            })
            .catch(err => {
              alert(err);
            });
        },
        error => alert(error.message),
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 1000
        }
      );
    } catch (error) {
      alert("Weather Obtaining Error - /* _ */: ", error);
      // dispatch(fetchDataRejected(error));
    }
  };
};
