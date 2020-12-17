import React, {Fragment, useState} from 'react';
import {StyleSheet, Pressable, View, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Input,
  Layout,
  Button,
  ApplicationProvider,
  IconRegistry,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {PasswordInput} from '../components/PasswordInput';
import {ErrorMessage} from '@hookform/error-message';
import UserInfo from '../model/UserInfo';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AlertError } from '../components/AlertError';
import { useNavigation } from '@react-navigation/native';

export const LoginForm = ({getUser}) => {
  const navigation = useNavigation();
  const {control, errors, handleSubmit, setError} = useForm();
  const [userInfo, setUserInfo] = useState(new UserInfo());
  const [disableSubmit, setDisableSubmit] = useState(false);

  const onSubmit = (info) => {
    //avoid user submit multiple times
    setDisableSubmit(true);

    setUserInfo(userInfo.getUserInfo(info));
    auth()
      .signInWithEmailAndPassword(info.email, info.password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firestore().collection('Users');
        usersRef
          .doc(uid)
          .get()
          .then((userDocument) => {
            if (!userDocument.exists){
              let userNoExist = 'User does not exist anymore.';
              console.log(userNoExist);
              setDisableSubmit(false);
              return;
            }
            const user = userDocument.data();
            //set user information to user state in App.js
            getUser(user)
          })
          .catch(error => {
            console.log(error.message);
            return;
          })
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setError('email', {
            type: 'manual',
            message: 'The email is incorrect. Please check again.',
          });
        }
        if (error.code === 'auth/user-not-found') {
          setError('email', {
            type: 'manual',
            message: 'There is no user with this email.',
          });
        }
        if (error.code === "auth/wrong-password") {
          setError('password', {
            type: 'manual',
            message: 'Password incorrect.',
          });
        }
        setDisableSubmit(false);
        return <AlertError message={error.message}/>;
      });
  };

  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={style.entireContainer}>
          <Layout style={style.formTitle}>
            <Text category="h4" style={style.title}>
              Renta
            </Text>
          </Layout>
          <Layout style={style.formContainer}>
            {/* User name */}
            <Layout>
              <Controller
                control={control}
                name="email"
                rules={{required: true}}
                defaultValue=""
                render={({onChange, value}) => (
                  <Input
                    value={value}
                    placeholder=""
                    onChangeText={(nextValue) => onChange(nextValue)}
                    status="primary"
                    label="Email"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({message}) => (
                  <Text style={style.invalidInput}>{message}</Text>
                )}
              />
            </Layout>

            {/* Password */}
            <Layout>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <PasswordInput
                    onChange={onChange}
                    onBlur={onBlur}
                    passwordVal={value}
                    errors={errors}
                  />
                )}
                name="password"
                rules={{required: true}}
                defaultValue=""
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({message}) => (
                  <Text style={style.invalidInput}>{message}</Text>
                )}
              />
            </Layout>

            <Layout style={style.signIn}>
              <Button disabled={disableSubmit} onPress={handleSubmit(onSubmit)}>Sign in!</Button>              
              <Button
                style={{marginTop: 10}}                
                onPress={() => navigation.navigate('RegisterForm')}
                appearance="ghost"
                status="basic">
                Haven't sign up yet? Register here.
              </Button>
            </Layout>
          </Layout>
        </Layout>
      </ApplicationProvider>
    </Fragment>
  );
};

const style = StyleSheet.create({
  entireContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3757e6',
  },
  formTitle: {
    backgroundColor: '#3757e6',
    alignItems: 'center',
  },
  title: {
    fontWeight: '100',
    fontSize: 50,
    color: 'white',
  },
  formContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 15,
  },
  invalidInput: {
    color: '#d44d2c',
  },
  signIn: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
