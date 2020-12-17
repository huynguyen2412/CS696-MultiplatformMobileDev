import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {HeaderNavTab} from '../components/HeaderNavTab';
import {BottomNavTab} from '../components/BottomNavTab';
import {SearchBar} from '../components/SearchBar';
import {HouseCard} from '../components/HouseCard';
import firestore from '@react-native-firebase/firestore';

export const HomeScreen = (props) => {
  const user = props.extraData;
  const [myPosts, setMyPosts] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    //search for a renta/list renta from search bar
    async function searchResult() {
      const isZipcode = !isNaN(searchKey);
      const postsRef = firestore().collection('Posts');
      const snapshot = isZipcode
                          ? await postsRef.where('zipcode', '==', searchKey.toUpperCase()).get()
                          : await postsRef.where('city', '==', searchKey.toUpperCase()).get();
      const posts = await snapshot.docs.map((item) => item.data());
      setMyPosts(posts)
      console.log(snapshot);
    }
    searchResult();
  }, [searchKey]);

  return (
    <Layout style={styles.container}>
      <Layout>
        <HeaderNavTab title="Renta" />
      </Layout>
      <Layout style={{flex: 1}}>
        <Layout style={{flex: 1, justifyContent: 'space-between'}}>
          <SearchBar setSearchKey={setSearchKey} />
          { myPosts &&  
              <FlatList
                data={myPosts}
                renderItem={HouseCard}
                keyExtractor={(item, index) => String(index)}
              />  
          }
          <Layout style={styles.bottomTab}>
            <BottomNavTab userInfo={user} />
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
