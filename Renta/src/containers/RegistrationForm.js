import React from 'react';
import {Text, KeyboardAvoidingView, StyleSheet, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, Layout, Button} from '@ui-kitten/components';
import { PasswordInput } from '../components/PasswordInput';
import { ErrorMessage } from '@hookform/error-message';
import { validSchema as FormValidationSchema } from '../features/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const RegistrationForm = () => {
  const {control, handleSubmit, errors} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(FormValidationSchema)
  });
  const onSubmit = (data) => console.log(data);

  return (
    <KeyboardAvoidingView behavior = "height" style={style.keyBoardContainer}>
      <KeyboardAwareScrollView>
        <Layout style={style.container}>
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
            name='firstName' 
            render={({message}) => <Text style={style.invalidInput}>{message}</Text>} />
          {/* Last Name */}
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Layout>
                <Input
                  placeholder=""
                  label="Last Name"
                  value={value}
                  onChangeText={(nextValue) => onChange(nextValue)}
                  onBlur={onBlur}
                  status="primary"
                />
              </Layout>
            )}
            name="lastName"
            rules={{required: true}}
            defaultValue=""
          />
          <ErrorMessage 
            errors={errors} 
            name='lastName' 
            render={({message}) => <Text style={style.invalidInput}>{message}</Text>} />
          {/* Email */}
          <Layout>
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
            name='email' 
            render={({message}) => <Text style={style.invalidInput}>{message}</Text>} />
          </Layout>
          <Layout style={style.userName}>
            {/* UserName */}
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Layout>
                  <Input
                    placeholder=""
                    value={value}
                    onChangeText={(nextValue) => onChange(nextValue)}
                    onBlur={onBlur}
                    status="primary"
                    label="UserName"
                  />
                </Layout>
              )}
              name="userName"
              rules={{required: true}}
              defaultValue=""
            />
          <ErrorMessage 
            errors={errors} 
            name='userName' 
            render={({message}) => <Text style={style.invalidInput}>{message}</Text>} />
          </Layout>
          {/* Password */}
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
            name="passWord"
            rules={{required: true}}
            defaultValue=""
          />
          <ErrorMessage 
            errors={errors} 
            name='passWord' 
            render={({message}) => <Text style={style.invalidInput}>{message}</Text>} />

          <Layout style={style.signUp}>
            <Button onPress={handleSubmit(onSubmit)}>
              Sign Up!
            </Button>
            <Pressable style={{marginTop: 10}} onPress={() => {console.log("Sign in")}}>
              <Text>Already registered? Sign in here.</Text>
            </Pressable>
          </Layout>
        </Layout>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  keyBoardContainer: {
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  userName: {
    borderTopColor:  'rgba(0,0,0,0.5)',
    borderTopWidth: 0.2,
    marginTop: 10,
  },
  signUp: {
    alignSelf: 'center',
    marginTop: 10
  },
  invalidInput: {
    color: '#d44d2c'
  }
});
