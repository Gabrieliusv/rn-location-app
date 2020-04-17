import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../db/db";
import { ADD_PLACE, SET_PLACES } from "./types";
import ENV from "../../env";

export const addPlace = (title, image, location) => async (dispatch) => {
  const responce = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
  );

  if (!responce.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = await response.json();
  console.log(resData);

  if (!resData.results) {
    throw new Error("Something went wrong!");
  }

  const address = resData.results[0].formatted_address;

  const fileName = image.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    FileSystem.moveAsync({
      from: image,
      to: newPath,
    });
    const dbResult = await insertPlace(
      title,
      newPath,
      address,
      location.lat,
      location.lng
    );
    console.log(dbResult);
    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title: title,
        image: newPath,
        address: address,
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();

    dispatch({ type: SET_PLACES, places: dbResult.rows._array });
  } catch (err) {
    throw err;
  }
};
