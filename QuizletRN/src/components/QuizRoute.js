import React, { useState } from "react";
import { View, Text , StyleSheet, Button} from "react-native";
import { QuizItem } from './QuizItem';
import QuizData from "../assets/jsonFiles/quizzes.json";

export const ResultContext = React.createContext();

export const QuizRoute = () => {
  const [results, setResults] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const goNextQuestion = () => {
    setQuestionIndex(questionIndex+1);
  };

  const goPrevQuestion = () => {
    setQuestionIndex(questionIndex-1);
  };

  return (
    <View style={style.container}>
      <ResultContext.Provider value={{results}}>
        <QuizItem
          quizData={QuizData[questionIndex]}
          questionIndex={questionIndex}
        />
      </ResultContext.Provider>
      <View style={style.quizControl}>
        <Button
          onPress={goPrevQuestion}
          title="Prev"
          disabled={questionIndex == 0}
        />
        <Button
          onPress={goNextQuestion}
          title={questionIndex < QuizData.length - 1 ? 'Next' : 'End'}
        />
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20
  },
  quizControl:{
    flexDirection: 'row',
  }
});