import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import evaluarExito from '../data/evaluacion';
import questions1 from '../data/opcion1/questions';
import questions2 from '../data/opcion2/questions';
import { LinearGradient } from 'expo-linear-gradient';

const interpretResponses = (responses, questions) => {
  let positives = [];
  let negatives = [];

  responses.forEach(response => {
    let questionObj = questions.find(q => q.question === response.question);
    if (response.answer.toLowerCase() === 'sí' || response.answer.toLowerCase() === 'aceptable' || response.answer.toLowerCase().includes('profesionales') || response.answer.toLowerCase().includes('motivación moderada') || response.answer.toLowerCase().includes('moderada cultura')) {
      positives.push(response);
    } else if (response.answer.toLowerCase() === 'no') {
      negatives.push(response);
    }
  });

  let positiveText = "Veo que tu startup tiene varios aspectos positivos, como:";
  positives.forEach(response => {
    positiveText += ` ${response.question.toLowerCase().replace('¿', '').replace('?', '')},`;
  });
  positiveText = positiveText.slice(0, -1) + ".";

  let negativeText = "Sin embargo, hay algunos aspectos que podrían necesitar atención:";
  negatives.forEach(response => {
    negativeText += ` ${response.question.toLowerCase().replace('¿', '').replace('?', '')},`;
  });
  negativeText = negativeText.slice(0, -1) + ".";

  let recommendationText = "Para mejorar en estos aspectos, considera: invertir en formación y desarrollo en áreas de gestión empresarial e I+D, implementar métricas de satisfacción del cliente, buscar apoyo gubernamental, y fortalecer la cultura empresarial mediante talleres y actividades.";

  return `${positiveText}\n\n${negativeText}\n\n${recommendationText}`;
};

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const questions = [...questions1, ...questions2];
  const { answers, theme } = route.params;
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [exito, setExito] = useState("Calculando...");
  const [interpretation, setInterpretation] = useState("Calculando...");

  useEffect(() => {
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
    }

    if (answers) {
      (async () => {
        const result = await evaluarExito(answers);
        setExito(result);
        setInterpretation(interpretResponses(answers, questions));
        console.log('Respuestas: ', answers);
      })();
    } else {
      setExito("No hay respuestas");
      setInterpretation("No hay respuestas");
    }
  }, [theme, answers]);

  const styles = styling(currentTheme);
  

  const handleNavigation = () => {
    navigation.navigate('Opciones');
  };

  return (
    <LinearGradient colors={theme === 'dark' ? ["#070F2B", "#1B1A55", "#535C91"] : ["#1B1A55", "#535C91", "#9290C3"]} style={styles.container}>
      <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1B1A55' : 'white' }]}>
        <Text style={[styles.title, { color: theme === 'dark' ? 'white' : 'black' }]}>Resultados</Text>
        <Text style={[styles.exito, { color: theme === 'dark' ? 'white' : 'black' }]}>Éxito de la startup: {exito}</Text>
        <Text style={[styles.exito, { color: theme === 'dark' ? 'white' : 'black' }]}>Interpretación de los resultados:</Text>
        <Text style={[styles.interpretation, { color: theme === 'dark' ? 'white' : 'black' }]}>{interpretation}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Finalizar"
            onPress={handleNavigation}
            color={theme === 'dark' ? '#FFFFFF' : '#000000'}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styling = theme => 
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    exito: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    interpretation: {
      fontSize: 16,
      marginBottom: 20,
    },
    buttonContainer: {
      marginTop: 20,
    },
  });

export default ResultsScreen;
