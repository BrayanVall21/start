// QuizScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TIPOS_PREGUNTAS, ConfiguracionPreguntas } from '../data/formato_preguntas';

const QuizScreen = ({ route, theme }) => {
  const { questions,tipo} = route.params;
  const data = questions;
  const totalQuestions = data.length;
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [subQuestionAnswer, setSubQuestionAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSubQuestion, setShowSubQuestion] = useState(false);
  const navigation = useNavigation();
  const [themeValue, setThemeValue] = useState('light');

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    setSelectedAnswer(null);
    setSubQuestionAnswer(null);
    setShowSubQuestion(false);
  }, [index]);


  useEffect(() => {
    if (index >= totalQuestions || showResults) {
      setShowResults(true);
    }
  }, [index, showResults]);
/*
  useEffect(() => {
    if (showResults) {
      //navigation.navigate("Opciones");
      //showAnswersAlert();
      navigation.navigate("Resultados2", { answers,tipo });
    }
  }, [showResults]);
*/
  const currentQuestion = data[index];

  
  const handleFinishQuiz = () => {
    if (selectedAnswer !== null && selectedAnswer !== "") {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers, { question: currentQuestion.question, answer: selectedAnswer }];
        navigation.navigate("Resultados2", { answers: newAnswers,tipo,theme:theme });
        return newAnswers;
      });
    } else {
      Alert.alert("Por favor, selecciona una respuesta antes de continuar.");
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && selectedAnswer !== "") {
      setAnswers([...answers, { question: currentQuestion.question, answer: selectedAnswer }]);
      if (currentQuestion.subQuestion && selectedAnswer === 'Sí' && !showSubQuestion) {
        setShowSubQuestion(true);
      } else {
        setIndex(index + 1);
      }
    } else {
      Alert.alert("Por favor, selecciona una respuesta antes de continuar.");
    }
  };

  const handleSubQuestionNext = () => {
    if (subQuestionAnswer !== null && subQuestionAnswer !== "") {
      setAnswers([...answers,
        { question: currentQuestion.question, answer: selectedAnswer },
        { question: currentQuestion.subQuestion.question, answer: subQuestionAnswer }]);
      setIndex(index + 1);
      setShowSubQuestion(false);
    } else {
      Alert.alert("Por favor, selecciona una respuesta antes de continuar.");
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (currentQuestion.subQuestion && answer === 'Sí') {
      setShowSubQuestion(true);
    } else {
      setShowSubQuestion(false);
    }
  };

  const handleSubAnswerSelect = (answer) => {
    setSubQuestionAnswer(answer);
  };

  const showAnswersAlert = () => {
    // Aquí puedes mostrar un resumen de las respuestas si lo deseas
  };

  const styles = styling(themeValue);

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1B1A55' : 'white' }]}>
      <View style={[styles.containerDos]}>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Progreso:</Text>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          ({index}/{totalQuestions}) Preguntas contestadas
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.23)",
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 10,
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 20,
          marginLeft: 10,
        }}>
        <Text
          style={{
            backgroundColor: '#59CE8F',
            borderRadius: 12,
            position: 'absolute',
            left: 0,
            height: 10,
            right: 0,
            width: `${Math.floor((index / totalQuestions) * 100)}%`,
            marginTop: 20,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 30,
          padding: 10,
          borderRadius: 6,
        }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme === 'dark' ? 'white' : 'black' }}>
          {currentQuestion?.question}
        </Text>
        <View style={{ marginTop: 12 }}>
          {ConfiguracionPreguntas[currentQuestion.type].render(handleAnswerSelect, selectedAnswer, theme, currentQuestion.opciones)}
        </View>
      </View>
      {showSubQuestion && currentQuestion.subQuestion && (
        <View
          style={{
            marginTop: 30,
            padding: 10,
            borderRadius: 6,
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme === 'dark' ? 'white' : 'black' }}>
            {currentQuestion.subQuestion.question}
          </Text>
          <View style={{ marginTop: 12 }}>
            {ConfiguracionPreguntas[currentQuestion.subQuestion.type].render(handleSubAnswerSelect, subQuestionAnswer, theme, currentQuestion.subQuestion.opciones)}
          </View>
        </View>
      )}
      <View
        style={{
          marginTop: 45,
          padding: 10,
          borderRadius: 7,
          height: 120,
        }}>
        {index + 1 >= totalQuestions ? (
          <Pressable onPress={handleFinishQuiz} style={[styles.button]}>
            <Text style={[styles.buttonText]}>TERMINAR</Text>
          </Pressable>
        ) : (
          <Pressable onPress={showSubQuestion ? handleSubQuestionNext : handleNextQuestion} style={[styles.button]}>
            <Text style={[styles.buttonText]}>SIGUIENTE</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerDos: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    questionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.5,
      marginVertical: 10,
      borderRadius: 20,
      borderColor: theme === 'dark' ? 'white' : 'black'
    },
    questionItem: {
      textAlign: 'center',
      borderWidth: 0.5,
      width: 40,
      height: 40,
      borderRadius: 20,
      padding: 10,
      borderColor: theme === 'dark' ? 'white' : 'black'
    },
    button: {
      backgroundColor: '#59CE8F',
      padding: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      borderRadius: 6,
    },
    buttonText: {
      color: 'white',
    },
  });

export default QuizScreen;
