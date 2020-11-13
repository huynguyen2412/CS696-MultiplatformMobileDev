import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Title = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 5,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'rgba(175, 47, 47, 0.25)',
    fontWeight: '100'
  }
})

export default Title;