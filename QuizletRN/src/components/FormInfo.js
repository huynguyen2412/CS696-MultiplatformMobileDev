import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Title from '../components/Title';
import UserInfo from '../model/UserInfo';

const ValidSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, 'First name is not valid')
    .required('First name cannot empty'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, 'Last name is not valid')
    .required('Last name cannot empty'),
  nickName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, 'Nick name is not valid')
    .required('Nick name cannot empty'),
  email: Yup.string().email('Invalid email').required('Email cannot empty'),
});

export const FormInfo = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(new UserInfo());

  /* Only navigate to the Quiz route 
  when all fields are valid */
  const takeTheQuiz = (info) => {
    userInfo.updateUserInfo(info);
    setUserInfo(userInfo);
    navigateQuizPage(navigation);
  };

  const navigateQuizPage = (navigation) => {
    navigation.push('Quiz');
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        nickName: '',
        email: '',
      }}
      onSubmit={(values) => takeTheQuiz(values)}
      validationSchema={ValidSchema}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <KeyboardAwareScrollView>
          <View style={styles.inner}>
            <Title title="Quizlet" />
            <FormInput
              handleChange={handleChange('firstName')}
              handleBlur={handleBlur('firstName')}
              placeholder="First Name"
              value={values.firstName}
              validKey="firstName"
            />
            <FormInput
              handleChange={handleChange('lastName')}
              handleBlur={handleBlur('lastName')}
              placeholder="Last Name"
              value={values.lastName}
              validKey="lastName"
            />
            <FormInput
              handleChange={handleChange('nickName')}
              handleBlur={handleBlur('nickName')}
              placeholder="Nick Name"
              value={values.nickName}
              validKey="nickName"
            />

            <FormInput
              handleChange={handleChange('email')}
              handleBlur={handleBlur('email')}
              placeholder="Email address"
              value={values.email}
              validKey="email"
            />
            <OpenQuiz handleSubmit={handleSubmit} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

const FormInput = ({
  handleChange,
  handleBlur,
  placeholder,
  value,
  validKey,
}) => {
  return (
    <View>
      <TextInput
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        style={styles.formInput}
        placeholder={placeholder}
      />
      <Text style={styles.invalidInput}>
        <ErrorMessage name={validKey} />
      </Text>
    </View>
  );
};

const OpenQuiz = ({handleSubmit}) => {
  return (
    <View style={styles.submit}>
      <Button title="Take A Quiz" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  formInput: {
    borderBottomColor: '#655b69',
    borderBottomWidth: 1,
    height: 40,
  },
  submit: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  invalidInput: {
    color: '#EE1818',
  },
});
