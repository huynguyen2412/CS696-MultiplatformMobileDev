import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Pressable,
  Keyboard,
} from 'react-native';
import {NameTextInput} from '../components/NameTextInput';

export const FormInfo = () => {
  return (
    <ScrollView style={styles.formInfo}>
      <Pressable onPressOut={Keyboard.dismiss}>
        <View>
          <NameTextInput placeholder="First Name" inputName="firstName"/>
          <NameTextInput placeholder="Last Name" inputName="lastName"/>
          {/* <NameTextInput placeholder="Nickname" />
          <NameTextInput placeholder="Age" /> */}
        </View>
        {/* <StartQuiz /> */}
      </Pressable>
    </ScrollView>
  );
};

const StartQuiz = () => {
  return (
    <View style={styles.startQuizBtn}>
      <Button title="Take the quiz" />
    </View>
  );
};

const styles = StyleSheet.create({
  formInfo: {
    borderColor: '#655b69',
    width: '80%',
    alignSelf:'center'
  },
  startQuizBtn: {
    width: '30%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});
