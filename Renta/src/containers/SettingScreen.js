import React from 'react';
import {StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Button
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignoutIcon = (props) => (
  <Icon {...props} name="log-out-outline"/>
);

const BackIcon = (props) => (
  <Icon {...props} name="arrow-back" fill='white'/>
);

const BackAction = (props) => (
  <TopNavigationAction icon={BackIcon} onPress={props.action} />
);

const SignOut = (props) => {
  return (
    <Layout style={styles.settingItem}>
      <Button 
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              props.setUser(null);
            })
            .catch((error) => console.log("User can't sign out.",error));          
        }}
        accessoryLeft={SignoutIcon}
        appearance="ghost"
        size="large"
      >
        SignOut
      </Button>
    </Layout>
  );
};



export const SettingScreen = (props) => {
  const navigation = useNavigation();
  const navigateHome = () => navigation.navigate("HomeScreen");

  return (
    <SafeAreaView>
      <TopNavigation
        title={() => (
          <Text category="h4" style={styles.headerTitle}>
            Settings
          </Text>
        )}
        alignment="center"
        style={styles.headerNav}
        accessoryLeft={() => <BackAction action={navigateHome}/>}
      />
      <ScrollView>
        <SignOut setUser={props.setUser}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    backgroundColor: '#5A83FC'
  },
  headerTitle: {
    color: '#eaedf2'
  }, 
  settingItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6dfdf',
  },
  textItem: {
    fontSize: 20,

  }
});
