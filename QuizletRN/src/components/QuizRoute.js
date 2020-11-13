import React, { useState } from "react";
import { View, Text , StyleSheet, Button} from "react-native";
import { QuizItem } from './QuizItem';
import QuizData from "../assets/jsonFiles/quizzes.json";

export const ResultContext = React.createContext();

export const QuizRoute = ({ navigation }) => {
  const [results, setResults] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  //Navigate next question or submit the quiz
  const goNextQuestion = () => {
    if(questionIndex == QuizData.length-1){
      let score = calculateScore(results, QuizData);
      navigation.navigate('Home', {score : score});
    }else
      setQuestionIndex(questionIndex+1)    
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
        <View style={style.quizButton}>
          <Button
            onPress={goPrevQuestion}
            title="Prev"
            disabled={questionIndex == 0}
          />
        </View>
        <View style={style.quizButton}>
          <Button
            onPress={goNextQuestion}
            title={questionIndex < QuizData.length - 1 ? 'Next' : 'End'}
          />
        </View>
      </View>
    </View>
  );
}

const calculateScore = (answers, quizzes) => {
  const score = quizzes.filter((quiz, index) => quiz.correct === answers[index]).length;
  return score;
};

const style = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: 50,
    marginHorizontal: 20
  },
  quizControl:{
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  quizButton: {
    width: 100
  }
});