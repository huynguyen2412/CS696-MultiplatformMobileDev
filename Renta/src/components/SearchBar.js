import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const SearchIcon = (props) => (
  <Icon {...props} name="search-outline"/>
);

export const SearchBar = ({setSearchKey}) => {
  const [value, setValue] = useState("");

  return(    
    <KeyboardAvoidingView behavior="padding">
      <ScrollView keyboardShouldPersistTaps="handled">
        <Input
            style={styles.container}
            placeholder="Zipcode or City"
            value={value}
            accessoryLeft={SearchIcon}
            onChangeText={nextValue => setValue(nextValue)}
            onEndEditing={() => {
              setSearchKey(value);
              setValue("");
            }}
          />
      </ScrollView>
    </KeyboardAvoidingView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    padding: 5,    
  }
})