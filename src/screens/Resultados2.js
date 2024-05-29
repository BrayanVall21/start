// ResultsScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { answers, theme } = route.params;

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
    <View style={[styles.container, { backgroundColor: currentTheme === 'dark' ? '#1B1A55' : 'white' }]}>
      <Text style={[styles.title, { color: currentTheme === 'dark' ? 'white' : 'black' }]}>Resultados</Text>
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
      <Button
        title="Siguiente"
        onPress={handleNavigation}
        color={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
      />
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
  });

export default ResultsScreen;
