import React, {Fragment, useState, useEffect} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
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
import {validSchema as FormValidationSchema} from '../features/formValidationSchema';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserInfo from '../model/UserInfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AlertError } from '../components/AlertError';
import { useNavigation } from '@react-navigation/native';

export const RegistrationForm = ({getUser}) => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors, setError} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(FormValidationSchema),
  });
  const [userInfo, setUserInfo] = useState(new UserInfo());
  const [disableSubmit, setDisableSubmit] = useState(false);

  const onSubmit = (info) => {
    //avoid user submit multiple times
    setDisableSubmit(true);

    setUserInfo(userInfo.getUserInfo(info));
    auth()
      .createUserWithEmailAndPassword(info.email, info.password)
      .then((response) => {
        const uid = response.user.uid;
        // set user info to Firestore
        const data = {
          id: uid,
          email: info.email,
          firstName: info.firstName,
          lastName: info.lastName,
        };
        const usersRef = firestore().collection('Users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            //set user information to user state in App.js
            getUser(data);
          })
          .catch((error) => {
            console.log(`Can't set value ${error}`);
            return <AlertError message={error} />;
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', {
            type: 'manual',
            message: 'The email is already in use.',
          });
        }
        //enable to user submit again
        setDisableSubmit(false);
      });
  };

  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={[style.entireContainer]}>
          <Layout style={style.formContainer}>
            <View style={{alignItems: 'center'}}>
              <Text category="h4" style={style.title}>
                Registration
              </Text>
            </View>
            <KeyboardAwareScrollView>
              <Layout>
                {/* First Name */}
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <Layout style={style.firstName}>
                      <Input
                        placeholder=""
                        value={value}
                        onChangeText={(nextValue) => onChange(nextValue)}
                        onBlur={onBlur}
                        status="primary"
                        label="First Name"
                      />
                    </Layout>
                  )}
                  name="firstName"
                  rules={{required: true}}
                  defaultValue=""
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({message}) => (
                    <Text style={style.invalidInput}>{message}</Text>
                  )}
                />
              </Layout>

              {/* Last Name */}
              <Layout>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <Input
                      placeholder=""
                      label="Last Name"
                      value={value}
                      onChangeText={(nextValue) => onChange(nextValue)}
                      onBlur={onBlur}
                      status="primary"
                      style={style.lastName}
                    />
                  )}
                  name="lastName"
                  rules={{required: true}}
                  defaultValue=""
                />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({message}) => (
                    <Text style={style.invalidInput}>{message}</Text>
                  )}
                />
              </Layout>

              <Layout>
                {/* Email */}
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <Layout>
                      <Input
                        label="Email"
                        placeholder=""
                        value={value}
                        onChangeText={(nextValue) => onChange(nextValue)}
                        onBlur={onBlur}
                        status="primary"
                      />
                    </Layout>
                  )}
                  name="email"
                  rules={{required: true}}
                  defaultValue=""
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
                      caption={'enable'}
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

              <Layout style={style.signUp}>
                <Button
                  disabled={disableSubmit}
                  onPress={handleSubmit(onSubmit)}>
                  Sign Up!
                </Button>
                <Button
                  style={{marginTop: 10}}
                  onPress={() => navigation.navigate('LoginForm')}
                  appearance="ghost"
                  status="basic">
                  Already registered? Sign in here.
                </Button>
              </Layout>
            </KeyboardAwareScrollView>
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
  formContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 15,
  },
  signUp: {
    alignSelf: 'center',
    marginTop: 10,
  },
  invalidInput: {
    color: '#d44d2c',
  },
  title: {
    color: '#3757e6',
    fontWeight: '600',
  },
});
