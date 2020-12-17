import React, { useEffect } from 'react';
import { StyleSheet, Vibration} from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { number } from 'yup';

const SettingIcon = (props) => (
  <Icon {...props} name='settings'/>
);

const HomeIcon = (props) => (
  <Icon {...props} name='home'/>
);

const AddIcon = (props) => (
  <Icon {...props} name='plus-circle'/>
);

const ListIcon = (props) => (
  <Icon {...props} name='list-outline'/>
);


const useBottomNavigationState = (userInfo) => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigateNewPost = () => navigation.navigate("NewPost", {user: userInfo});
  const navigateSetting = () => navigation.navigate("SettingScreen", {user: userInfo});
  const navigateListRenta = () => navigation.navigate("MyPostScreen");
  return { 
    selectedIndex, 
    onSelect: (index) => {
      setSelectedIndex(index);
      switch(index){
        case 0: 
          Vibration.vibrate(50);
          break;
        case 1:
          Vibration.vibrate(50);
          navigateNewPost();
          break;
        case 2:
          Vibration.vibrate(50);
          navigateListRenta();
          break;
        case 3:
          Vibration.vibrate(50);
          navigateSetting();
          break;
        default:
      }
    }     
  };
};

export const BottomNavTab = (props) => {
  const userInfo = props.userInfo;
  const bottomNavState = useBottomNavigationState(userInfo);

  return (
    <React.Fragment>
      <Layout level='2'>
        <BottomNavigation style={styles.bottomNavigation} 
          appearance="noIndicator"
          {...bottomNavState}
        >
          <BottomNavigationTab icon={HomeIcon} title="HOME"/>
          <BottomNavigationTab icon={AddIcon} title="LIST A RENTA"/>
          <BottomNavigationTab icon={ListIcon} title="MY LIST"/>
          <BottomNavigationTab icon={SettingIcon} title="SETTING"/>
        </BottomNavigation>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
    backgroundColor: '#9CBAFE',
  },
});