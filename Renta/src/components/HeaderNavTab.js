import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  TopNavigation,
  Icon,
  TopNavigationAction,
  Text
} from '@ui-kitten/components';

const MessageIcon = (props) => (
  <Icon {...props} name="message-circle-outline" fill="#eaedf2" />
);

const MessageAction = (props) => (
  <TopNavigationAction icon={MessageIcon} onPress={props.action} />
);

export const HeaderNavTab = ({title}) => {
  const navigateMessage = () => {
    console.log('Navigate to message');
    // navigation.navigate('Message');
  };

  return (
    <SafeAreaView>
      <TopNavigation
        title={() => <Text category='h4' style={styles.headerTitle}>{title}</Text>}
        alignment="center"
        accessoryRight={() => <MessageAction action={navigateMessage} />}
        style={styles.headerNav}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    backgroundColor: '#5A83FC'
  },
  headerTitle: {
    color: '#eaedf2'
  }
});