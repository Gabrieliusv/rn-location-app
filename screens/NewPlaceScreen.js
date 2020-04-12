import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { addPlace } from "../store/actions/placesAction";

const NewPlaceScreen = ({ navigation }) => {
  const [titleValue, setTitleValue] = useState("");

  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitleValue(event.nativeEvent.text);
  };

  const handleSave = () => {
    dispatch(addPlace(titleValue));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChange={handleTitleChange}
          value={titleValue}
        />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
