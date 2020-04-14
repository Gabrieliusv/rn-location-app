import * as FileSystem from "expo-file-system";

import { ADD_PLACE } from "./types";

export const addPlace = (title, image) => async (dispatch) => {
  const fileName = image.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    FileSystem.moveAsync({
      from: image,
      to: newPath,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }

  dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
};
