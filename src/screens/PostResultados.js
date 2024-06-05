// ResultsScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import evaluarExito from '../data/evaluacion';
import { LinearGradient } from 'expo-linear-gradient';

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { answers, theme } = route.params;
  const exito = answers ? evaluarExito(answers) : "No hay respuestas";
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
    }
    
  }, [theme]);

  const styles = styling(currentTheme);
  
  const handleNavigation = () => {
    navigation.navigate('Opciones');
  };

  return (
    <LinearGradient colors={theme === 'dark' ? ["#070F2B", "#1B1A55", "#535C91"] : ["#1B1A55", "#535C91", "#9290C3"]} style={styles.container}>
      <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1B1A55' : 'white' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? 'white' : 'black' }]}>Resultados</Text>
      <Text style={[styles.exito, { color: theme === 'dark' ? 'white' : 'black' }]}>Éxito de la startup: {exito}</Text>
      
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
    buttonContainer: {
      marginTop: 20,
    },
  });

export default ResultsScreen;
