import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon, Layout } from '@ui-kitten/components';

const SettingIcon = (props) => (
  <Icon {...props} name='settings-outline'/>
);

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline'/>
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const BottomNavTab = () => {

  const bottomState = useBottomNavigationState();

  return (
    <React.Fragment>
      <Layout level='2'>
        <BottomNavigation style={styles.bottomNavigation} {...bottomState}>
          <BottomNavigationTab icon={HomeIcon} title="HOME"/>
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