import React, {useState, useEffect} from 'react';
import {StyleSheet, Pressable, SafeAreaView, FlatList} from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {HouseCard} from '../components/HouseCard';

const BackIcon = (props) => (
  <Icon {...props} name="arrow-back-outline" fill="#eaedf2" />
);

const MessageAction = (props) => (
  <TopNavigationAction icon={BackIcon} onPress={props.action} />
);

export const MyPostScreen = (props) => {
  const user = auth().currentUser._user;
  const navigation = useNavigation();
  const [myPosts, setMyPosts] = useState([]);
  const navigateHome = () => navigation.navigate('HomeScreen');

  useEffect(() => {
    async function getPosts() {
      const postsRef = firestore().collection('Posts');
      const snapshots = await postsRef.where('authorID', '==', user.uid).get();
      const posts = snapshots.docs.map((item) => item.data());
      setMyPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <>
      <Layout>
        <SafeAreaView>
          <TopNavigation
            title={() => (
              <Text category="h4" style={styles.headerTitle}>
                My Posts
              </Text>
            )}
            alignment="center"
            style={styles.headerNav}
            accessoryLeft={() => <MessageAction action={navigateHome} />}
          />
        </SafeAreaView>
      </Layout>

      <Layout style={styles.body}>
        {myPosts && (
          <FlatList
            data={myPosts}
            renderItem={HouseCard}
            keyExtractor={(item, index) => String(index)}
          />
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  headerNav: {
    backgroundColor: '#5A83FC',
  },
  headerTitle: {
    color: '#eaedf2',
  },
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
