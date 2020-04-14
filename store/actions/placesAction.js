import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../db/db";
import { ADD_PLACE, SET_PLACES } from "./types";

export const addPlace = (title, image) => async (dispatch) => {
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
      "Dummy address",
      15.6,
      12.3
    );
    console.log(dbResult);
    dispatch({
      type: ADD_PLACE,
      placeData: { id: dbResult.insertId, title: title, image: newPath },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();
    console.log(dbResult);

    dispatch({ type: SET_PLACES, places: dbResult.rows._array });
  } catch (err) {
    throw err;
  }
};
