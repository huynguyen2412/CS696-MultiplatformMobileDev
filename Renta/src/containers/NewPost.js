import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, FlatList, Dimensions} from 'react-native';
import {Layout, Text, Input, Button, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PostIcon = (props) => (
  <Icon {...props} name='paper-plane'/>
);

const CancelIcon = (props) => (
  <Icon {...props} name='paper-plane'/>
);

const ImageIcon = (props) => (
  <Icon {...props} name='image-2'/>
);

const AddImage = ({setData}) => {
  return (
    <Button
      accessoryLeft={ImageIcon}
      onPress={() =>
        ImagePicker.openPicker({
          multiple: true,
          includeBase64: true,
          compressImageQuality: 0.7,
        })
          .then((images) => setData(images))
          .catch((error) => console.log(error))
      }
    />
  );
};

const PostDetail = ({setPostData}) => {
  return (
    <Layout style={{backgroundColor: "#F5FCFF"}}>
      <Layout style={{flexDirection: 'row', backgroundColor: '#F5FCFF'}}>
        <Input
          label="Price"
          style={{flex: 1, marginLeft: 10, marginRight: 5}}
        />
        <Input
          style={{flex: 3, marginLeft: 5, marginRight: 5}}
          label="Number of rooms/Area"
          caption="Eg: 3bds | 2 ba | 1,234 sqft"
        />
      </Layout>
      <Input label="Address" style={{marginHorizontal: 5}} />
      <Input
        multiline={true}
        style={{marginHorizontal: 5, marginTop: 5}}
        textStyle={{minHeight: 60}}
        placeholder="Description"
      />
      <Layout style={styles.submitCancel}>
        <Button style={{width: '30%'}}>Cancel</Button>
        <Button
          style={{width: '30%'}}
          accessoryLeft={PostIcon}
        />        
      </Layout>
    </Layout>
  );
};

export const NewPost = ({user}) => {
  const [imageResponse, setImageResponse] = useState();
  console.log(imageResponse);

  //display 3 images for each row
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 3;

  return (
    <Layout style={styles.container}>
      <Layout style={styles.imageContainer}>
        <FlatList
          data={imageResponse}
          keyExtractor={(item) => item.index}
          numColumns={3}
          renderItem={({item, index}) => (
            <Image
              source={{
                uri: `data:${item.mime};base64,${item.data}`,
              }}
              style={[styles.imageItem, {width: itemWidth}]}
              key={index}
            />
          )}
        />
      </Layout>

      <AddImage setData={setImageResponse} />

      <KeyboardAwareScrollView>
        <PostDetail />
      </KeyboardAwareScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 24,
  },
  imageItem: {
    alignItems: 'center',
    height: 150,
    margin: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },
  submitCancel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
    marginTop: 10,
  },
});
