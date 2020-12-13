import React, {createContext} from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {HeaderNavTab} from '../components/HeaderNavTab';
import {BottomNavTab} from '../components/BottomNavTab';
import {SearchBar} from '../components/SearchBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HouseCard} from '../components/HouseCard';

export const HomeScreen = (props) => {
  const user = props.extraData;

  return (
    <Layout style={styles.container}>
      <Layout>
        <HeaderNavTab title="My Renta" />
      </Layout>
      <Layout style={{flex: 1}}>
        <Layout style={{flex: 1}}>
          <SearchBar />
          <KeyboardAwareScrollView style={styles.body}>
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
          </KeyboardAwareScrollView>
          <Layout style={styles.bottomTab}>
            <BottomNavTab userInfo={user}/>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '100',
    fontSize: 50,
    color: 'pink',
  },
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: '#f0f2f7',
  },
  bottomTab: {
    backgroundColor: '#f0f2f7',
    justifyContent: 'flex-end',
    margin: -8,
  },
});
