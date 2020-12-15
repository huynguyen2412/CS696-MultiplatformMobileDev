import React, { useState, useEffect }from 'react';
import {StyleSheet, FlatList, Pressable} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {HeaderNavTab} from '../components/HeaderNavTab';
import {BottomNavTab} from '../components/BottomNavTab';
import {SearchBar} from '../components/SearchBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HouseCard} from '../components/HouseCard';
import firestore from '@react-native-firebase/firestore';


const PostItem = ({ item, onPress, style }) => (
  <Pressable 
    onPress={onPress}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'
      }   
  ]}>
    <Item item={item}/>
  </Pressable>
);

export const HomeScreen = (props) => {
  const user = props.extraData;
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const postsRef = firestore().collection('Users').doc(user.id).collection('Posts');
      const snapshots = await postsRef.get();
      const posts = snapshots.docs.map(item => item.data());
      setMyPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout>
        <HeaderNavTab title="Renta" />
      </Layout>
      <Layout style={{flex: 1}}>
        <Layout style={{flex: 1}}>
          <SearchBar />
            { myPosts &&  
              <FlatList
                data={myPosts}
                renderItem={HouseCard}
                keyExtractor={(item, index) => index}
              />  
            }
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
