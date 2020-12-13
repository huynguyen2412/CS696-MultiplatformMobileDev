import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {RegistrationForm} from './src/containers/RegistrationForm';
import {LoginForm} from './src/containers/LoginForm';
import {HomeScreen} from './src/containers/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import {NewPost} from './src/containers/NewPost';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  // If user is already sign in, redirect to the Homepage
  useEffect(() => {
    const usersRef = firestore().collection('Users');
    auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            //if there is no user exist navigate to login
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
            console.log(`Not found user ${error}`);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View style={style.loading}>
        <ActivityIndicator size="large" color="#3757e6" />
      </View>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator headerMode="false">
          {user ? (
            <>
              <Stack.Screen name="HomeScreen">
                {(props) => <HomeScreen {...props} extraData={user} />}
              </Stack.Screen>
              <Stack.Screen name="NewPost" component={NewPost} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LoginForm"
                component={LoginForm}
                getUser={setUser}
              />
              <Stack.Screen
                name="RegisterForm"
                component={RegistrationForm}
                options={{title: 'Registration'}}
                getUser={setUser}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const style = StyleSheet.create({
  loading: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
