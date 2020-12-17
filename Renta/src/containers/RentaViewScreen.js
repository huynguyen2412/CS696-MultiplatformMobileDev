import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {Icon, Layout, Button, Text} from '@ui-kitten/components';
import { RentaView } from '../components/RentaView';
import { useRoute, useNavigation } from '@react-navigation/native'

export const RentaViewScreen = () => {
  const route = useRoute();
  const item = route.params.item;

  return (
    <Layout>
      <RentaView item={item}/>
    </Layout>
  );
}


