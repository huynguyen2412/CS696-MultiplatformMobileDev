import React from 'react';
import {View, StyleSheet} from 'react-native';
import { RegistrationForm } from './src/containers/RegistrationForm';



const App: () => React$Node = () => {
  return (
    <RegistrationForm/>
  );
};

const style = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  }
})


export default App;
