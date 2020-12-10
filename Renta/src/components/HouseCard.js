import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
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


export const HouseCard = (props) => {
  const src = 'https://photos.zillowstatic.com/fp/98e883fe6f5d6c7c1c4bcb073776547c-p_e.jpg';

  return (
    <Layout level='2' style={styles.container}>
      <HouseImage source={src} />       
      <Header price="3,000" info="3 bds | 2 ba | 1,614 sqft"/>
      <Text style={styles.textInfo}>1234 ABCD, San Diego, CA 92126</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
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
  }
});