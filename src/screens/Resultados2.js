// ResultsScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useResultados } from '../data/almacen';

const ResultsScreen = ({theme}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { answers,tipo} = route.params;
  const { iResultados, setIResultados, eResultados, setEResultados } = useResultados();

  const [currentTheme, setCurrentTheme] = useState(theme);


  useEffect(() => {
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  const styles = styling(currentTheme);

  const handleNavigation = () => {

    switch (tipo) {
      case 'externos': setEResultados(answers); break;
      case 'internos': setIResultados(answers); break;
    }
    
    navigation.navigate('Opciones');

  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme === 'dark' ? '#1B1A55' : 'white' }]}>
      <Text style={[styles.title, { color: currentTheme === 'dark' ? 'white' : 'black' }]}>Respuestas</Text>
      <FlatList
        data={answers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.answerContainer}>
            <Text style={[styles.question, { color: currentTheme === 'dark' ? 'white' : 'black' }]}>{item.question}</Text>
            <Text style={{ fontSize: 16, color: currentTheme === 'dark' ? 'white' : 'black' }}>{item.answer}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleNavigation} style={[styles.button, { backgroundColor: currentTheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
          <Text style={[styles.buttonText, { color: currentTheme === 'dark' ? '#000000' : '#FFFFFF' }]}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    phase: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    answerContainer: {
      marginBottom: 15,
    },
    question: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: 20,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default ResultsScreen;
