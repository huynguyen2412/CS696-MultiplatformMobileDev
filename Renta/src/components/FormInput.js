import React from 'react';
import { StyleSheet } from 'react-native';
import {Controller} from 'react-hook-form';
import {Input, Text, Layout} from '@ui-kitten/components';
import {ErrorMessage} from '@hookform/error-message';

export const FormInput = (props) => {
  return (
    <Controller
      control={props.control}
      name={props.controlName}
      defaultValue=""
      render={({onChange, onBlur, value}) => (
        <Layout style={[props.style, {backgroundColor: '#F5FCFF'}]}>
          <Input
            label={props.label}
            value={value}
            onChangeText={(nextVal) => onChange(nextVal)}
            onBlur={onBlur}
            caption={props.caption}
            {...props}
          />
          <ErrorMessage
            errors={props.errors}
            name={props.controlName}
            render={({message}) => (
              <Text style={style.error}>{message}</Text>
            )}
          />
        </Layout>
      )}
    />
  );
};

const style = StyleSheet.create({
  error: {
    color: '#d44d2c',
    fontSize: 12
  }
});