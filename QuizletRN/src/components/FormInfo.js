import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Text,
  Alert
} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';

import Title from '../components/Title';
import UserInfo from '../model/UserInfo';
import {SaveFile, DeleteFile, ReadFile} from '../utils/RNFileSystem';

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
  age: Yup.number()
    .min(5, 'Invalid age')
    .max(200, 'Invalid age')
    .required('Age cannot empty'),
});


export const FormInfo = ({ navigation, route}) => {
  const [userInfo, setUserInfo] = useState({data : ''});
  const [scoreState, setScore]  = useState(-1);

  useEffect(() =>{
    const updateScore = () => {
      setScore(route.params?.score)
    };
    updateScore();
  },[route.params?.score])

  useEffect(()=>{
    const fetchData = async() => {
      const data = await readUserInfo();
      const scoreState = await ReadFile("scoreInfo.txt");
      setUserInfo({data});
      setScore(parseInt(scoreState));
    };
    fetchData();
  },[]);

  /* Only navigate to the Quiz route 
  when all fields are valid */
  const takeTheQuiz = async (info) => {
    const userData = new UserInfo();
    userData.updateUserInfo(info);
    setUserInfo({data : userData}); 
    await storeUserInfo(userData);
    navigateQuizPage(navigation);
  };

  const navigateQuizPage = (navigation) => {
    navigation.push('Quiz');
  };

  return (
    <View>
      {
        userInfo.data == '' ? 
          <Text>Loading ....</Text> :
          <FormContainer existUserInfo={userInfo.data} route={route} submit={takeTheQuiz}/>
      }
      <CloseApp score={scoreState}/>
      {scoreState > 0 && scoreState ? (<DisplayResult score={scoreState} />) : null}
    </View>
  );
};

const FormContainer = ({existUserInfo, route, submit}) => {
  return (
    <Formik
      initialValues={{
        firstName: existUserInfo.firstName != null ? existUserInfo.firstName : '',
        lastName: existUserInfo.lastName != null ? existUserInfo.lastName : '',
        nickName: existUserInfo.nickName != null ? existUserInfo.nickName : '',
        age: existUserInfo.age != null ? existUserInfo.age : ''
      }}
      onSubmit={async (values) => await submit(values)}
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
              keyboardType="default"
            />
            <FormInput
              handleChange={handleChange('lastName')}
              handleBlur={handleBlur('lastName')}
              placeholder="Last Name"
              value={values.lastName}
              validKey="lastName"
              keyboardType="default"
            />
            <FormInput
              handleChange={handleChange('nickName')}
              handleBlur={handleBlur('nickName')}
              placeholder="Nick Name"
              value={values.nickName}
              validKey="nickName"
              keyboardType="default"
            />
            <FormInput
              handleChange={handleChange('age')}
              handleBlur={handleBlur('age')}
              placeholder="Age"
              value={values.age}
              validKey="age"
              keyboardType="number-pad"
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
  keyboardType
}) => {
  return (
    <View>
      <TextInput
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        style={styles.formInput}
        placeholder={placeholder}
        keyboardType={keyboardType}
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

{/* Form info will be saved before exiting */}
const CloseApp = ({score}) => {
  return (
    <View style={styles.submit}>
      <Button title="Close" onPress={async() => {
        if(score >= 0){
          await DeleteFile('scoreInfo.txt');
          await SaveFile('scoreInfo.txt', score.toString());
        }
        RNExitApp.exitApp();  
      }} />
    </View>
  );
};

const DisplayResult = ({score}) => {
  return (
    <View>
      <Text style={styles.result}>Quiz Result: {score} pts</Text>
    </View>
  );
};

{/* Store user infomation in json object*/}
const storeUserInfo = async (userInfo) => {
  try {
    const userInfoJson = JSON.stringify(userInfo);
    const isUserInfoExist = await readUserInfo();
    if(isUserInfoExist != null)
      await AsyncStorage.mergeItem('userInfo', userInfoJson);
    else 
      await AsyncStorage.setItem('userInfo', userInfoJson);
  } catch (e) {
    Alert.alert(
      "Error - User Info",
      `${e}.User info can't be saved. Please try it again`
      [
        {
          text: "Close",
          onPress: () => {},
        }
      ]
    );
  }
}

const readUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo != null ? JSON.parse(userInfo) : null;
  } catch (e) {
    Alert.alert(
      'Error - User Info',
      `${e}.Can't load the user info. Please restart and try again.`
      [
        {
          text: 'Close',
          onPress: () => {},
        }
      ],
    );
  }
}

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
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
  }
});
