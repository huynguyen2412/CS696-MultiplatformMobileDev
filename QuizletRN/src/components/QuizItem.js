import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import { ResultContext } from './QuizRoute';

export const QuizItem = ({ quizData, questionIndex }) => {
  const [answers, setAnswers] = useState("");

  const submitAnswer = (results, answer, index) => {
    results[index] = answer;
  };

  const answerList = quizData.answers.map((ans, index) =>{
    return (
      <ResultContext.Consumer key={index}>        
        {(resultsContext) => (
          <View>
            <View style={style.radioButton}>
              <RadioButton
                value={ans}
                status={resultsContext.results[questionIndex] === ans ? 'checked' : 'unchecked'}
                onPress={() => {
                  setAnswers(ans);
                  submitAnswer(resultsContext.results, ans, questionIndex);
                }}
              />
              <Text>{ans}</Text>
            </View>
          </View>          
        )}
      </ResultContext.Consumer>
    );
  })

  return (
    <View style={style.container}>
      <Text style={style.question}>{questionIndex+1 + ". " + quizData.question}</Text>
      {answerList}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
  },
  radioButton: {
    // flex: 1,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  question: {
    alignSelf: 'center',
    marginBottom: 5,
    fontSize: 15,
  }
});