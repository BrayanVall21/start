// QuizScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TIPOS_PREGUNTAS, ConfiguracionPreguntas } from '../data/formato_preguntas';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const determinarFase = (answers) => {
  let seed = 0;
  let early = 0;
  let growth = 0;
  let expansion = 0;

  answers.forEach(({ question, answer }) => {
    switch (question) {
      case "¿La startup cuenta con un producto o servicio mínimamente viable (MVP)?":
        if (answer === 'Sí') early++;
        else seed += 10;
        break;
      case "¿Su startup ha comenzado a comercializar el producto o servicio en el mercado?":
        if (answer === 'Sí') early++;
        else seed++;
        break;
      case "¿La empresa ha generado ingresos?":
        if (answer === 'Sí') growth++;
        else early++;
        break;
      case "¿Cuál es el nivel de recurrencia de los ingresos?":
        if (answer === 'Recurrente con ingresos altos') expansion++;
        else if (answer === 'Recurrente con ingresos moderados') growth++;
        else if (answer === 'Recurrente con ingresos bajos') early++;
        else seed++;
        break;
      case "¿Cuántos empleados tiene actualmente la startup":
        if (answer === 'Más de 50') expansion++;
        else if (answer === 'Entre 11 y 50') growth++;
        else early++;
        break;
      case "¿La empresa ha validado su producto o servicio en el mercado con pruebas de concepto?":
        if (answer === 'Sí') early++;
        else seed++;
        break;
      case "¿Cuál es el mayor tipo de financiación que ha recibido la empresa hasta ahora?":
        if (answer === 'Salida a bolsa') expansion++;
        else if (answer === 'Inversores Profesionales ') growth++;
        else if (answer === 'Inversores Privados') early++;
        else seed++;
        break;
      case "¿Está la empresa en proceso de escalar su producto o servicio en nuevos mercados o segmentos?":
        if (answer === 'Sí') growth++;
        else early++;
        break;
      case "¿Cuenta la empresa con una base de clientes estable y en crecimiento?":
        if (answer === 'Sí') expansion++;
        else growth++;
        break;
      case "Está en proceso de una salida a bolsa para captar financiación?":
        if (answer === 'Sí') expansion++;
        else growth++;
        break;
      default:
        break;
    }
  });

  const maxPhase = Math.max(seed, early, growth, expansion);
  if (maxPhase === seed) return "Seed";
  if (maxPhase === early) return "Early";
  if (maxPhase === growth) return "Growth";
  return "Expansion";
};

const QuizScreen = ({ route, theme }) => {
  const { questions } = route.params;
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
    if (selectedAnswer !== null) {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers, { question: currentQuestion.question, answer: selectedAnswer }];
        const fase = determinarFase(newAnswers);
        navigation.navigate("Recopilacion: Clasificación", { answers: newAnswers, fase });
        return newAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, { question: currentQuestion.question, answer: selectedAnswer }]);
      if (currentQuestion.subQuestion && selectedAnswer === 'Sí' && !showSubQuestion) {
        setShowSubQuestion(true);
      } else {
        setIndex(index + 1);
      }
    }
  };

  const handleSubQuestionNext = () => {
    if (subQuestionAnswer !== null) {
      setAnswers([...answers,
        { question: currentQuestion.question, answer: selectedAnswer },
        { question: currentQuestion.subQuestion.question, answer: subQuestionAnswer }]);
      setIndex(index + 1);
      setShowSubQuestion(false);
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
        <View style={styles.progressContainer}>
          <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Progreso:</Text>
          <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>
            ({index}/{totalQuestions}) Preguntas contestadas
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <Text
            style={{
              backgroundColor: '#59CE8F',
              borderRadius: 12,
              position: 'absolute',
              left: 0,
              height: hp('1%'),
              right: 0,
              width: `${Math.floor((index / totalQuestions) * 100)}%`,
            }}
          />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestion?.question}
          </Text>
          <View style={styles.optionsContainer}>
            {ConfiguracionPreguntas[currentQuestion.type].render(handleAnswerSelect, selectedAnswer, theme, currentQuestion.opciones)}
          </View>
        </View>
        {showSubQuestion && currentQuestion.subQuestion && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {currentQuestion.subQuestion.question}
            </Text>
            <View style={styles.optionsContainer}>
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
      padding: wp('4%'),
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    progressBarContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.23)",
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      height: hp('1%'),
      borderRadius: wp('2%'),
      justifyContent: 'center',
      marginTop: hp('2%'),
    },
    questionContainer: {
      marginTop: hp('3%'),
      padding: wp('4%'),
      borderRadius: wp('2%'),
    },
    questionText: {
      fontSize: wp('4.5%'),
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : 'black',
    },
    optionsContainer: {
      marginTop: hp('1.5%'),
    },
    buttonContainer: {
      marginTop: hp('4.5%'),
      marginLeft: hp('6.5%'),
      borderRadius: wp('2%'),
      width: hp('30%'),
      height: hp('8%'),
    },
    button: {
      backgroundColor: '#59CE8F',
      padding: hp('2%'),
      borderRadius: wp('2%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: wp('4%'),
    },
  });

export default QuizScreen;
