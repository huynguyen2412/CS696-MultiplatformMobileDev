import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text} from 'react-native';
const { validateName } = require("../utils/Validation");

export const NameTextInput = ({placeholder}) => {
  const [inputName, setInputName] = useState("");

  return (
    <View>
      <TextInput
        style={styles.inputContainer}
        onChangeText={(value) => setInputName(value)}
        placeholder={placeholder}>
      </TextInput>
      <Text>
        {validateName(inputName) ? '' : `Invalid ${placeholder} input`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: '#655b69',
    borderBottomWidth: 1,
  },
});

