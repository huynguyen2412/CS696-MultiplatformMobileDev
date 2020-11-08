import React from 'react';
import {TextInput, View, StyleSheet, Button, Text, ScrollView} from 'react-native';
import { Formik, ErrorMessage, Field} from 'formik';
import * as Yup from 'yup';

const ValidSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, "First name is not valid")
    .required('Cannot empty'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, "Last name is not valid")
    .required('Cannot empty'),
  nickName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, "Nick name is not valid")
    .required('Cannot empty'),
  email: Yup.string().email('Invalid email').required('Email is not empty'),
});


export const UseFormik = () => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      nickName: '',
      email: '',Í
    }}
    onSubmit={(values) => console.log(values)}
    validationSchema={ValidSchema}>
    {({handleChange, handleBlur, handleSubmit, values}) => (
      <ScrollView>
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
          validKey="Last Name"
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

        <View style={styles.submit}>
          <Button onPress={handleSubmit} title="Take a quiz" />
        </View>
      </ScrollView>
    )}
  </Formik>
);

const FormInput = ({handleChange, handleBlur, placeholder, value, validKey}) => {
  return (
    <View>
      <TextInput
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        style={styles.inputContainer}
        placeholder={placeholder}
      />
      <Text style={styles.invalidInput}>
        <ErrorMessage name={validKey} />
      </Text>
    </View>
  );
}



const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: '#655b69',
    borderBottomWidth: 1,
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

