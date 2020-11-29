import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { RegistrationForm } from './src/containers/RegistrationForm';


const HomeScreen = () => (
  <View>
    <RegistrationForm />
  </View>
);

const App: () => React$Node = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  );
};

const style = StyleSheet.create({
  Form: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  }
})


export default App;
