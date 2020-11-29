import React, {Component, useState} from 'react';
import {TextInput, Text, View, StyleSheet, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


// const validSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .matches(/^[a-zA-Z\t\s]*$/, 'First name is not valid')
//     .required('First name cannot empty'),
//   lastName: Yup.string()
//     .matches(/^[a-zA-Z\t\s]*$/, 'Last name is not valid')
//     .required('Last name cannot empty'),
//   email: Yup.string()
//     .email('Email is not valid')
//     .required('Email cannot empty'),
//   userName: Yup.string()
//     .matches(/^[a-zA-Z0-9]{1,20}$/, 'Username only alphanumeric and length 1-20'),
//   passWord: Yup.string()
//     .matches(/^[a-zA-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, '')
// });

export const Form = () => {
  const { control, handleSubmit, errors, register } = useForm({});
  const onSubmit = data => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder="First name"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            errors={errors}
          />
        )}
        name="firstName"
        rules={{ required: true , pattern: /^[a-zA-Z\t\s]*$/i}}
        defaultValue=""
      />
      {errors?.message && <Text>Foo</Text>}
      <ErrorMessage 
        errors={errors} 
        name="firstName"
        render={({message}) => <Text>{message}</Text>}
      />          
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        defaultValue=""
      />
      <ErrorMessage 
        errors={errors} 
        name="lastName"
        render={({message}) => <Text>{message}</Text>}
      /> 

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder="email"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      <ErrorMessage 
        errors={errors} 
        name="email"
        render={({message}) => <Text>{message}</Text>}
      /> 

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5
  }
})