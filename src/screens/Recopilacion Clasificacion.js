// ResultsScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { answers, fase, theme } = route.params;

  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  const styles = styling(currentTheme);

  const handleNavigation = () => {
    if (fase === 'Seed' || fase === 'Early') {
      navigation.navigate('Opciones');
    } else {
      navigation.navigate('Inicio');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme === 'dark' ? '#1B1A55' : 'white' }]}>
      <Text style={[styles.title, { color: currentTheme === 'dark' ? 'white' : 'black' }]}>Resultados</Text>
      <Text style={[styles.phase, { color: currentTheme === 'dark' ? 'white' : 'black' }]}>Fase de la startup: {fase}</Text>
      <FlatList
        data={answers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.answerContainer}>
            <Text style={[styles.question, { color: currentTheme === 'dark' ? 'white' : 'black' }]}>{item.question}</Text>
            <Text style={{ fontSize: wp('4%'), color: currentTheme === 'dark' ? 'white' : 'black' }}>{item.answer}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Siguiente"
          onPress={handleNavigation}
          color={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
        />
      </View>
    </View>
  );
};

const styling = theme => 
  StyleSheet.create({
    container: {
      flex: 1,
      padding: wp('5%'),
    },
    title: {
      fontSize: wp('6%'),
      fontWeight: 'bold',
      marginBottom: hp('2%'),
    },
    phase: {
      fontSize: wp('5%'),
      fontWeight: 'bold',
      marginBottom: hp('2%'),
    },
    answerContainer: {
      marginBottom: hp('2%'),
    },
    question: {
      fontSize: wp('4.5%'),
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: hp('2%'),
    },
  });

export default ResultsScreen;
