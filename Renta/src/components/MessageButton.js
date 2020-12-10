import React from 'react';
import {View} from 'react-native';
import {Layout, Button, Icon, ApplicationProvider} from '@ui-kitten/components';

const MessageIcon = (props) => (
  <Icon {...props} name="message-circle-outline" />
);

export const MessageButton = (props) => 
(
  <Button
    appearance="ghost"
    status="primary"
    accessoryLeft={MessageIcon}
    onPress={() => {
      console.log('Navigate to message screen');
    }}
  />
);
