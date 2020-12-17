import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {Layout, Button, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import { FormInput } from '../components/FormInput';
import validSchema from '../features/postValidationSchema';
import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import { AlertError } from '../components/AlertError';

const PostIcon = (props) => <Icon {...props} name="paper-plane" />;
const CancelIcon = (props) => <Icon {...props} name="backspace" />;
const ImageIcon = (props) => <Icon {...props} name="image-2" />;
const TakePhotoIcon = (props) => <Icon {...props} name="camera-outline" />;

const AddImage = ({setData}) => {
  return (
    <Button
      style={styles.addImage}
      accessoryLeft={ImageIcon}
      onPress={() =>
        ImagePicker.openPicker({
          multiple: true,
          includeBase64: true,
          compressImageMaxWidth: 600,
          compressImageMaxHeight: 800,
          compressImageQuality: 0.7,
        })
          .then((images) => {
            setData(images);
          })
          .catch((error) => console.log(error))
      }>
      Add Photo(s)
    </Button>
  );
};

const TakePhoto = ({setData, data}) => {
  return (
    <Button
      style={styles.addImage}
      accessoryLeft={TakePhotoIcon}
      onPress={() =>
        ImagePicker.openCamera({
          mediaType: 'photo',
          width: 300,
          height: 400,
          compressImageMaxWidth: 600,
          compressImageMaxHeight: 800,
          includeBase64: true,
          compressImageQuality: 0.7,
        }).then((image) => {
          let newArr = [...data, image];
          setData(newArr);
        })}
    >
      Take a Photo
    </Button>
  );
};

const PostDetail = ({getPhoto}) => {
  const navigation = useNavigation();
  const userInfo = useRoute().params.user;
  const {control, handleSubmit, errors} = useForm({
    resolver: yupResolver(validSchema)
  });
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigateHome = () => navigation.goBack();

  //add a post document to user's Posts collection
  const onSubmit = async (postInfo) => {
    //avoid multiple submit
    setDisableSubmit(true);

    //intergration with search keywords
    for(const key in postInfo){
      postInfo[key] = postInfo[key].toUpperCase();
    }
    const createdAt = firestore.FieldValue.serverTimestamp();
    const authorID = userInfo.id;
    const post = {...postInfo, ...{photo: getPhoto}, createdAt, authorID};
    const postsRef = await firestore().collection('Posts');
    try {
      const postResponse = await postsRef.add(post);
      const postRef = await postResponse
                        .update({postID: postResponse.id})
                        .then(() => navigateHome());
    } catch (error) {
      const errMessage = "Can't submit the post " + error;
      console.log(`Can't submit the post ${error}`);
      setDisableSubmit(false);
      return <AlertError message={errMessage}/>
    }
  };

  return (
    <Layout style={{backgroundColor: '#F5FCFF'}}>
      <Layout style={{flexDirection: 'row', backgroundColor: '#F5FCFF'}}>
        <FormInput
          control={control}
          controlName='price'
          label="Price"
          style={{flex: 1, marginLeft: 5, marginRight: 5}}
          errors={errors}/>
        
        <FormInput
          control={control}
          controlName="room"
          style={{flex: 3, marginLeft: 5, marginRight: 5}}
          label="Number of rooms/Area"
          caption="Eg: 3bds | 2 ba | 1234 sqft"
          errors={errors}/>                  
      </Layout>

      <FormInput
        control={control}
        controlName="street"
        style={{marginHorizontal: 5}}
        label="Street"     
        errors={errors}   
      />

      <Layout
        style={{flexDirection: 'row', flex: 1, backgroundColor: '#F5FCFF'}}>
        <FormInput
          control={control}
          controlName="city"
          label="City" 
          style={{flex: 2, marginHorizontal: 5}}
          errors={errors}
        />

        <FormInput 
          control={control}
          label="State" 
          controlName="state"
          style={{flex: 1, marginHorizontal: 5}}
          errors={errors} 
        />
        <FormInput 
          control={control}
          controlName="zipcode"
          label="Zipcode" 
          style={{flex: 1, marginHorizontal: 5}} 
          errors={errors} 
        />
      </Layout>

      <FormInput
        control={control}
        controlName="description"
        label="Description"
        multiline={true}
        style={{marginHorizontal: 5, marginTop: 5}}
        textStyle={{minHeight: 70}}
        placeholder="Description"
        errors={errors} 
      />
      <Layout style={styles.submitCancel}>
        <Button
          style={{width: '30%'}}
          accessoryLeft={CancelIcon}
          status="danger"
          appearance="outline"
          onPress={navigateHome}
        />
        <Button 
          disableSubmit={disableSubmit}
          style={{width: '30%'}} 
          accessoryLeft={PostIcon} 
          onPress={handleSubmit(onSubmit)}/>
      </Layout>
    </Layout>
  );
};

export const NewPost = () => {
  const [imageResponse, setImageResponse] = useState([]);

  //display 2 images each slide
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth / 2;

  return (
    <Layout style={styles.container}>
      <Layout>
        {imageResponse && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{backgroundColor: '#F5FCFF'}}
            horizontal={true}
            data={imageResponse}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <Image
                  source={{uri: `data:${item.mime};base64,${item.data}`}}
                  style={[styles.imageItem, {width: itemWidth}]}
                />
              );
            }}
          />
        )}
      </Layout>

      <Layout style={styles.photoButtons}>
        <AddImage setData={setImageResponse} />
        <TakePhoto setData={setImageResponse} data={imageResponse} />
      </Layout>

      <KeyboardAwareScrollView>
        <PostDetail getPhoto={imageResponse}/>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginVertical: 24,
    marginHorizontal: 24,
  },
  imageItem: {
    alignItems: 'center',
    height: 150,
    margin: 2,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  submitCancel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
    marginTop: 10,
  },
  addImage: {
    margin: 10,
  },
});
