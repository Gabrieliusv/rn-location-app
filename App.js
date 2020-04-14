import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import PlacesNavigator from "./navigation/PlacesNavigator";
import { init } from "./db/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
