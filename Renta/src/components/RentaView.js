import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {Layout, Button, Icon, Text} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

const ContactIcon = (props) => <Icon {...props} name="person-outline" />;
const CancelIcon = (props) => <Icon {...props} name="backspace" />;


export const RentaView = ({item}) => {  
  const [isMyPost, setIsMyPost] = useState(false);
  const navigation = useNavigation();
  //display 2 images each slide
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 2;
  const styleWidth = item.photo.length <= 1 ? windowWidth : itemWidth;

  const navigateHome = () => navigation.goBack();
  const navigateNewMessage = () => navigation.push("NewMessageScreen", {item})

  //hidden contact button if the post is belong to its user
  useEffect(() => {
    const uid = auth().currentUser.uid;
    setIsMyPost(uid == item.authorID);
  },[])

  return (
    <Layout style={styles.container}>
      <Layout style={styles.imageView}>
        {item.photo && (
          <FlatList
            horizontal={true}
            data={item.photo}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <Image 
                source={{
                  uri: `data:${item.mime};base64,${item.data}`
                }}
                style={[styles.imageItem, {width: styleWidth}]}
              />
            )}
          />
        )}
      </Layout>
      <Layout style={styles.postView}>
        <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.textInfo}>${item.price}/mo</Text>                
          <Text style={styles.textInfo}>{item.room}</Text>
        </Layout>                
        <Text style={styles.textInfo}>
          {item.street.toUpperCase() + ', ' + item.city.toUpperCase() 
            + ', '  + item.state.toUpperCase() + ', ' + item.zipcode}
        </Text>
        <Layout style={{ margin: 5}}>
          <Text style={styles.textInfo}>Description: </Text>
          <Text >{item.description}</Text>
        </Layout>
        <Layout style={styles.contactCancel}>
          <Button
            style={{width: '30%'}}
            accessoryLeft={CancelIcon}
            status="danger"
            appearance="outline"
            onPress={navigateHome}
          />
          { !isMyPost && 
              <Button 
                style={{width: '30%'}} 
                accessoryLeft={ContactIcon}
                onPress={navigateNewMessage}
              />
          }
        </Layout>
      </Layout>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {    
  },  
  imageItem: {
    alignItems: 'center',
    height: 250,
    margin: 2,
  },
  textInfo : {
    fontWeight: "bold",
    paddingLeft: 5,
    marginTop: 5
  },
  contactCancel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
    marginTop: 10,
  },

});