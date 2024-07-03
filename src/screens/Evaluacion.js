import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TIPOS_PREGUNTAS, ConfiguracionPreguntas } from '../data/formato_preguntas';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const QuizScreen = ({ route, theme }) => {
  const { questions, tipo } = route.params;
  const data = questions;
  const totalQuestions = data.length;
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [subQuestionAnswer, setSubQuestionAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
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

  const currentQuestion = data[index];

  const handleFinishQuiz = () => {
    if (selectedAnswer !== null && selectedAnswer !== "") {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers, { question: currentQuestion.question, answer: selectedAnswer }];
        navigation.navigate("Recopilacion: Evaluación", { answers: newAnswers, tipo, theme: theme });
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

  const styles = styling(themeValue);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1B1A55' : 'white' }]}>
        <View style={styles.containerDos}>
          <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Progreso:</Text>
          <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
            ({index}/{totalQuestions}) Preguntas contestadas
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${Math.floor((index / totalQuestions) * 100)}%` }]} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestion?.question}
          </Text>
          <View style={styles.answerContainer}>
            {ConfiguracionPreguntas[currentQuestion.type].render(handleAnswerSelect, selectedAnswer, theme, currentQuestion.opciones)}
          </View>
        </View>
        {showSubQuestion && currentQuestion.subQuestion && (
          <View style={styles.subQuestionContainer}>
            <Text style={styles.subQuestionText}>
              {currentQuestion.subQuestion.question}
            </Text>
            <View style={styles.answerContainer}>
              {ConfiguracionPreguntas[currentQuestion.subQuestion.type].render(handleSubAnswerSelect, subQuestionAnswer, theme, currentQuestion.subQuestion.opciones)}
            </View>
          </View>
        )}
        <View style={styles.buttonContainer}>
          {index + 1 >= totalQuestions ? (
            <Pressable onPress={handleFinishQuiz} style={styles.button}>
              <Text style={styles.buttonText}>TERMINAR</Text>
            </Pressable>
          ) : (
            <Pressable onPress={showSubQuestion ? handleSubQuestionNext : handleNextQuestion} style={styles.button}>
              <Text style={styles.buttonText}>SIGUIENTE</Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styling = theme =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      padding: wp('5%'),
      backgroundColor: theme === 'dark' ? '#1B1A55' : 'white',
    },
    containerDos: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp('1%'),
      paddingHorizontal: wp('3%'),
    },
    progressBarContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.23)",
      width: '95%',
      height: hp('1.5%'),
      borderRadius: wp('5%'),
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: hp('2%'),
    },
    progressBar: {
      backgroundColor: '#59CE8F',
      height: '100%',
      borderRadius: wp('5%'),
      position: 'absolute',
      left: 0,
    },
    questionContainer: {
      marginTop: hp('3%'),
      padding: wp('3%'),
      borderRadius: wp('2%'),
    },
    questionText: {
      fontSize: wp('4.5%'),
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : 'black',
    },
    answerContainer: {
      marginTop: hp('1.5%'),
    },
    subQuestionContainer: {
      marginTop: hp('3%'),
      padding: wp('3%'),
      borderRadius: wp('2%'),
    },
    subQuestionText: {
      fontSize: wp('4.5%'),
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : 'black',
    },
    buttonContainer: {
      marginTop: hp('5%'),
      padding: wp('3%'),
      borderRadius: wp('2%'),
      height: hp('12%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#59CE8F',
      padding: wp('3%'),
      borderRadius: wp('2%'),
    },
    buttonText: {
      color: 'white',
      fontSize: wp('4%'),
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default QuizScreen;
