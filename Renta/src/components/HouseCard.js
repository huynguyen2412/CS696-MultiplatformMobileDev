import React, {useState} from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';

const HouseImage = (props) => (
  <Image 
    style={styles.cardImage}
    source={{uri: props.source}}
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


export const HouseCard = ({navigation}) => {
  const src = 'https://photos.zillowstatic.com/fp/98e883fe6f5d6c7c1c4bcb073776547c-p_e.jpg';

  
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
        <HouseImage source={src} />       
        <Header price="3,000" info="3 bds | 2 ba | 1,614 sqft"/>
        <Text style={styles.textInfo}>1234 ABCD, San Diego, CA 92126</Text>
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