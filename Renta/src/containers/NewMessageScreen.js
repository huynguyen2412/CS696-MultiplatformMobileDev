import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  Icon,
  Input,
  Button
} from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MessagePOJO from '../model/MessagePOJO';

const LandlordInfo = ({info}) => {
  const [landlordInfo, setLandlordInfo] = useState("");

  useEffect(() => {
    const myInfo = info;
    async function getLandlordInfo(){
      const userRef = await firestore().collection('Users').doc(myInfo.authorID).get();
      const doc = userRef.data();
      const name = doc.firstName + ' ' + doc.lastName;
      setLandlordInfo(name);
    };
    getLandlordInfo();
  },[]);

  return (
    <Layout style={styles.landlordInfo}>
      <Text>To: </Text>
      <Text>{landlordInfo}</Text>
    </Layout>
  )
}


export const NewMessageScreen = () => {
  const [message, setMessage] = useState("");
  const [disableSend, setDisableSend] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const postInfo = route.params.item;
  const myInfo = auth().currentUser;

  const navigateBackCurrentPost = () => navigation.goBack();
  const navigateHomeScreen = () => {
    navigation.goBack();
    navigation.goBack();
  };

  useEffect(() => {
    const isDisableSend = message !== "" ? false : true;
    setDisableSend(isDisableSend);
  }, [message]);


  const submitMessage = async () => {
    //avoid multiple time submit
    setDisableSend(true);

    //check if renter already message landlord
    const chatsRef = await firestore().collection('Chats');
    const snapshot = await chatsRef
                              .where('postID', '==', postInfo.postID)
                              .where('renterID', '==', myInfo.uid)
                              .get();
    const createAt = firestore.FieldValue.serverTimestamp();
    const myMessage = new MessagePOJO(createAt, myInfo.uid, message);

    if (snapshot.empty){
      const data = {
        landlordID : postInfo.authorID,
        renterID: myInfo.uid,
        postID: postInfo.postID,
      };
      try{
        const initThread = await chatsRef.add(data);
        const chatID = await initThread.update({ chatID: initThread.id });
        const messageRef = await initThread.collection('Messages');
        const submitMessage = await messageRef.add(myMessage);
        navigateHomeScreen();
      }catch(error){
        console.log("Can't submit the message. ", error);
        setDisableSend(false);
      }
    }else {
      //renter already initiate a conversation with landlord
      //just add another message to convo
      try{
        const chatID = snapshot.docs[0].id;
        const chatRef = await firestore().collection('Chats').doc(chatID);
        const messagesRef = await chatRef.collection('Messages');
        const updateMessage = await messagesRef.add(myMessage);
        navigateHomeScreen();
      }catch(error){
        console.log("Can't send another message to landlord. ", error);
        setDisableSend(false);
      }
    }      
  };

  return (
    <>
      <SafeAreaView>
        <TopNavigation
          title={() => <Text category='h4' style={styles.headerTitle}>Message</Text>}
          alignment="center"
          style={styles.headerNav}
        />
      </SafeAreaView>
      <LandlordInfo info={postInfo}/>
      <Layout style={styles.container}>
          <Input
            multiline={true}
            textStyle={styles.messageContainer}
            label="New Message"
            onChangeText={(value) => setMessage(value)}
          />
          <Layout style={styles.controlButton}>
            <Button
              onPress={navigateBackCurrentPost}
            >
              Cancel
            </Button>
            <Button 
              disabled={disableSend}
              onPress={async () => {
                await submitMessage();
              }}
            >
              Send
            </Button>
          </Layout>
      </Layout>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  messageContainer: {
    minHeight: 80
  },
  controlButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
    marginTop: 15
  },
  headerNav: {
    backgroundColor: '#5A83FC'
  },
  headerTitle: {
    color: '#eaedf2'
  },
  landlordInfo: {
    flexDirection: 'row', 
    backgroundColor: '#F5FCFF',
    justifyContent: 'center'
  }
});
