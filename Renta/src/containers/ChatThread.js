import React, { useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Input,
  Button
} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';
import MessagePOJO from '../model/MessagePOJO';
import {useForm, Controller} from 'react-hook-form';

const MyMessage = ({textData, style}) => {
  return (
    <Layout style={styles.myTextContainer}>
      <Text style={style}>{textData}</Text>
      <Text> Me </Text>
    </Layout>
  )
};

const YourMessage = ({textData, style}) => {
  return (
    <Layout>
      <Text style={style}>{textData}</Text>
    </Layout>
  )
};

const PostIcon = (props) => <Icon {...props} name="paper-plane" />;

const BackAction = (props) => (
  <TopNavigationAction icon={BackIcon} onPress={props.action} />
);

const BackIcon = (props) => (
  <Icon {...props} name="arrow-back-outline" fill="#eaedf2" />
);

export const ChatThread = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { myuid, chatID } = route.params;
  const [messageList, setMessageList] = useState([]);
  const {control, handleSubmit, reset} = useForm();

  const navigateHome = () => navigation.goBack();

  const onSubmit = async (data, e) => {
    if(data.messageInput !== ""){
      const timestamp = firestore.FieldValue.serverTimestamp();
      const myMessage = new MessagePOJO(timestamp, myuid, data.messageInput);   
      try {
        const chatRef = await firestore().collection('Chats').doc(chatID);
        const messagesRef = await chatRef.collection('Messages');
        const updateMessage = await messagesRef.add(myMessage);
        reset();
      } catch (error) {
        console.log("Encounted error ", error)
      }      
    }
  };
 
  useEffect(() => {
    const observer =  firestore()
                        .collection('Chats')
                        .doc(chatID)
                        .collection('Messages')      
                        .orderBy('createdAt', 'desc')
                        .onSnapshot(
                          querySnapshot => {
                            const content = [];
                            querySnapshot.forEach(doc => {
                              const entity = doc.data();
                              content.push(entity);
                            });
                            setMessageList(content);
                          },
                          error => {
                            console.log("There is an error", error);
                          }
                        );
    return () => observer;

  }, []);

  return (
    <>
    <SafeAreaView>
        <TopNavigation
          title={() => (
            <Text category="h4" style={styles.headerTitle}>
              Messenger
            </Text>
          )}
          alignment="center"
          style={styles.headerNav}
          accessoryLeft={() => <BackAction action={navigateHome} />}
        />
      </SafeAreaView>
      <Layout style={styles.chatBody}>
        { messageList &&
            <FlatList 
              data={messageList}
              keyExtractor={(item) => String(item.createdAt)}
              renderItem={({item}) => {
                return (
                  <>
                  {
                    item.uid == myuid 
                      ? <MyMessage style={styles.myMessage} textData={item.text}/>
                      : <YourMessage style={styles.yourMessage} textData={item.text}/>
                  }
                  </>
                )
              }}
            />
        }
        <Layout style={styles.controller}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                onChangeText={(nextValue) => onChange(nextValue)}
                onBlur={onBlur}
                value={value}
                style={styles.inputController}
              />
            )}
            name="messageInput"
            rules={{required: true}}
            defaultValue=""
          />
          <Button 
            styles={styles.buttonController}
            accessoryLeft={PostIcon}
            onPress={handleSubmit(onSubmit)}
          />
        </Layout>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  inputController: {
    flex: 2,
  },
  buttonController: {
    flex: 1,
  },
  chatBody: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: '80%'
  },  
  controller: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  myMessage: {
    color: 'white',
  },
  yourMessage: {
    backgroundColor: '#FFA187',
    color: 'white',
    borderRadius: 5,
    margin: 3
  },
  myTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#84A9FF',
    borderRadius: 5,
    margin: 3,
  },
  headerNav: {
    backgroundColor: '#5A83FC',
  },
  headerTitle: {
    color: '#eaedf2',
  },
});