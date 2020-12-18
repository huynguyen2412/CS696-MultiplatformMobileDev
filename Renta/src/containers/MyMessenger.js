import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { PreviewMessage } from '../components/PreviewMessage';

const BackIcon = (props) => (
  <Icon {...props} name="arrow-back-outline" fill="#eaedf2" />
);

const BackAction = (props) => (
  <TopNavigationAction icon={BackIcon} onPress={props.action} />
);

export const MyMessenger = ({navigation}) => {
  const [chatIDList, setChatIDList] = useState([]);
  const myuid = auth().currentUser.uid;
  const navigateHome = () => navigation.navigate('HomeScreen');

  useEffect(() => {
    async function getMyMessageList(){
      const userRef = await firestore().collection('Users').doc(myuid).get();
      const chatIDs = userRef.data().chatIDs;
      setChatIDList(chatIDs);
    };
    getMyMessageList();
  },[])

  return (
    <Layout>
      <SafeAreaView>
        <TopNavigation
          title={() => (
            <Text category="h4" style={styles.headerTitle}>
              Inbox
            </Text>
          )}
          alignment="center"
          style={styles.headerNav}
          accessoryLeft={() => <BackAction action={navigateHome} />}
        />
      </SafeAreaView>
      
      {chatIDList && 
        <FlatList 
          data={chatIDList}
          keyExtractor={(item) => String(item)}
          renderItem={({item}) => (
            <PreviewMessage 
              chatID={item}
            />
          )}
        />
      }

    </Layout>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    backgroundColor: '#5A83FC',
  },
  headerTitle: {
    color: '#eaedf2',
  },
});
