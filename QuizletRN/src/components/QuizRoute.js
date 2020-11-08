import React from "react";
import { View, Text , StyleSheet} from "react-native";

export const QuizRoute = () => {
  return (
    <View style={StyleSheet.container}>
      <Text>Taking the quiz</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});