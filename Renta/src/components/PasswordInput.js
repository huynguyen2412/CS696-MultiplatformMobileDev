import React, { Components, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Icon, Input, Layout } from '@ui-kitten/components';

export const PasswordInput = ({onChange, passwordVal, onBlur, caption}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <Pressable onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </Pressable>
  );

  return (
    <Layout>
      <Input
        value={passwordVal}
        label='Password'
        placeholder=''
        caption={caption ?
          'Should start with a letter, contain at least 8 symbols include special characters' : null}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={value => onChange(value)}
        onBlur={onBlur}        
      />
    </Layout> 
  );
};