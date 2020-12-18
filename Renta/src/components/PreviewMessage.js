import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Pressable} from 'react-native';
import {
  Layout,
  Text,
  Avatar
} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PreviewAvatar = ({userData, style}) => {
  const { landlordID } = userData;
  const [name, setName] = useState();

  useEffect(() => {
    const userRef = firestore().collection('Users');
    userRef
      .doc(landlordID)
      .get()
      .then((userDoc) => {
        const userData = userDoc.data();
        setName(userData);
      })
  },[]);

  return (
    <>
      { name &&
          <Text style={style}>{name.firstName + " " + name.lastName}</Text>
      }
    </>
  )
};

const PreviewImage = ({postData, style}) => {
  const { postID } = postData;
  const [postInfo, setPostInfo] = useState();

  useEffect(() => {
    const postRef = firestore().collection('Posts');
    postRef
      .doc(postID)
      .get()
      .then((postDoc) => {
        const postData = postDoc.data();
        setPostInfo(postData);
      })
  },[]);

  return (
    <>
    { postInfo && 
        <Image 
          style={style}
          source={
            postInfo.photo ? { uri : `data:${postInfo.photo[0].mime};base64,${postInfo.photo[0].data}` } 
                      : require('../assets/images/no_image.jpg')
          }
        />      
    }
    </>
  )
}

const PreviewContent = ({chatID, style}) => {
  const [message, setMessage] = useState();

  useEffect(() => {
    firestore()
      .collection('Chats')
      .doc(chatID)
      .collection('Messages')
      .get()
      .then((messageSnapshot) => {
        const content = messageSnapshot.docs[0].data().text;
        setMessage(content);
      })
  });

  return (
    <>
      { message &&
          <Text style={style}>{message}</Text>
      }
    </>
  );
}

export const PreviewMessage = ({ chatID }) => {
  const [chatData, setChatData] = useState();
  const userInfo = auth().currentUser;
  const myuid = userInfo.uid;
  const navigation = useNavigation();

  const navigateChatThread = () => navigation.push("ChatThread", {myuid, chatID});

  useEffect(() => {
    const chatRef = firestore().collection('Chats');
    chatRef
      .doc(chatID)
      .get()
      .then((chatDoc) => {
        const data = chatDoc.data();
        setChatData(data);
      });
  },[])

  return (
    <>
    { chatData &&
      <Pressable
        onPress={navigateChatThread}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : '#F5FCFF'
          },
          styles.wrapperCustom
        ]}
      >
        <Layout style={styles.previewContainer}>
          <PreviewAvatar userData={chatData} style={styles.previewAvatar}/>
          <PreviewContent chatID={chatID} style={styles.previewMessage}/>
          <PreviewImage postData={chatData} style={styles.previewImage}/>
        </Layout>
      </Pressable>
    }
    </>
  );  
};

const styles = StyleSheet.create({
  previewImage: {
    width: '30%',
    flex: 1
  },
  previewContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D6E4FF',
  },
  previewAvatar: {
    flex: 1/2,
    borderRightWidth: 0.3
  },
  previewMessage: {
    flex: 3,
    paddingLeft: 10,
    paddingTop: 5
  },
  wrapperCustom: {
    borderRadius: 5,
    padding: 5,
  },
});