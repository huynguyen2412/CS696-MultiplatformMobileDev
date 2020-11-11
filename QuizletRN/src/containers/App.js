import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {FormInfo} from '../components/FormInfo';
import {QuizRoute} from '../components/QuizRoute';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Quiz">

        {/* Quiz Route*/}
        <Stack.Screen
          name="Quiz"
          component={QuizRoute}
          options={{title: 'Quizlet'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
        // {
        //   /* Home Route*/
        // }
        // <Stack.Screen
        //   name="Home"
        //   component={FormInfo}
        //   options={{title: 'Home'}}
        // />;