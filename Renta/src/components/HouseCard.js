import React, {useState} from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';

const HouseImage = ({source}) => (
  <Image 
    style={styles.cardImage}
    source={
      source ? { uri : `data:${source.mime};base64,${source.data}` } 
                : require('../assets/images/no_image.jpg')
    }
  />
);

const Header = (props) => (
  <Layout 
    style={styles.header}
    level='2'
  >
    <Text style={styles.textInfo}>${props.price}/mo</Text>
    <Text style={styles.textInfo}>{props.info}</Text>
  </Layout>
);


export const HouseCard = ({ item }) => {
  const photo = item.photo ? item.photo[0] : null;
  console.log("My photo", photo); 
  return (
    <Pressable
      onPress={()=> console.log("Open new post")}
      style={({ pressed }) => [
          {
            backgroundColor: (pressed
              ? 'rgb(210, 230, 255)'
              : 'white')
          },
          styles.wrapperCustom
        ]}
    > 
      <Layout level='2' style={styles.container}>
        <HouseImage source={photo} />
        <Header price={item.price} info={item.room}/>
        <Text style={styles.textInfo}>
          {item.street.toUpperCase() + ',' + item.city.toUpperCase() + ',' + item.state.toUpperCase() + ', ' + item.zipcode}
        </Text>
      </Layout>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.3,
    borderColor: 'rgba(158, 150, 150, .5)',
    height: 150,
    marginBottom: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5
  },
  cardImage: {
    height: '70%',
    resizeMode: 'stretch'
  },
  textInfo : {
    fontWeight: "bold",
    paddingLeft: 5
  },
  wrapperCustom: {
    borderRadius: 5,
    padding: 5
  },
});