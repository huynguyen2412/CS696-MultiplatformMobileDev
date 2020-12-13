import React, { useEffect } from 'react';
import { StyleSheet, Pressable} from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const SettingIcon = (props) => (
  <Icon {...props} name='settings'/>
);

const HomeIcon = (props) => (
  <Icon {...props} name='home'/>
);

const AddIcon = (props) => (
  <Icon {...props} name='plus-circle'/>
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { 
    selectedIndex, 
    onSelect: setSelectedIndex      
  };
};

export const BottomNavTab = (props) => {
  // const bottomState = useBottomNavigationState();
  const userInfo = props.userInfo;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigation = useNavigation();

  const navigateNewPost = () => navigation.navigate("NewPost", {user: userInfo});
  const navigateSetting = () => navigation.navigate("Setting", {user: userInfo});

  const navigateToTab = (index) => {
    setSelectedIndex(index);
    switch(index){
      case 1:
        navigateNewPost();
        break;
      case 2:
        navigateSetting();
        break;
      default:
    }
  };

  return (
    <React.Fragment>
      <Layout level='2'>
        <BottomNavigation style={styles.bottomNavigation} 
          selectedIndex={selectedIndex}
          onSelect={index => navigateToTab(index)}
        >
          <BottomNavigationTab icon={HomeIcon} title="HOME"/>
          <BottomNavigationTab icon={AddIcon} />
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