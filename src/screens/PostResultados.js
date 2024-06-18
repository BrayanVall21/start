import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import evaluarExito from '../data/evaluacion';
import questions1 from '../data/opcion1/questions';
import questions2 from '../data/opcion2/questions';
import totalQuestions from '../data/totalQuestions';
import { LinearGradient } from 'expo-linear-gradient';
import interpretResponses from '../data/interpretResponses'; 

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
        try {
          const interpretationResult = await interpretResponses(answers, totalQuestions);
          setInterpretation(interpretationResult);
        } catch (error) {
          console.error("Error al interpretar las respuestas: ", error);
          setInterpretation("Hubo un error al interpretar las respuestas.");
        }
        
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
    <LinearGradient colors={theme === 'dark' ? ["#070F2B", "#1B1A55", "#535C91"] : ["#1B1A55", "#535C91", "#9290C3"]} style={styles.linearGradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.content, { backgroundColor: theme === 'dark' ? '#1B1A55' : 'white' }]}>
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
      </ScrollView>
    </LinearGradient>
  );
};

const styling = theme => 
  StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      padding: 20,
    },
    content: {
      flex: 1,
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
