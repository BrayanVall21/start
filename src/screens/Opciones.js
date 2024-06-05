import React, {useEffect,useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, Alert, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import questions1 from '../data/opcion1/questions';
import questions2 from '../data/opcion2/questions';
import { useNavigation } from "@react-navigation/native";
import { useResultados } from '../data/almacen';

const SettingsScreens = ({ theme}) => {
  const navigation = useNavigation(); 
  const { iResultados, setIResultados, eResultados, setEResultados } = useResultados();

  const medicionDispositivos = [
    { nombre: 'Factores Externos', icon: 'sun-o', questions: questions1, tipo: 'externos' },
    { nombre: 'Factores Internos', icon: 'heart', questions: questions2, tipo: 'internos' },
  ];

  const windowWidth = Dimensions.get('window').width;
  const [currentQuestions, setCurrentQuestions] = useState(null);
  //const showResultadosButton = iResultados !== null && eResultados !== null; 

  /*
  useEffect(() => {
    if (resultados !== null) {
      switch (origen) {
        case 'externos': setIResultados(resultados); break;
        case 'internos': setEResultados(resultados); break;
      }
    }
  }, [resultados, origen]);
  */

  const handleIconPress = (questions) => {
    //setCurrentQuestions(questions.questions);
    navigation.navigate("Preguntas2", { questions: questions.questions, tipo: questions.tipo });
  };

  const handleViewResults = () => {
    const answers = [...iResultados, ...eResultados];
    navigation.navigate("PostResultados", { answers, theme });
  };
  return (
    <LinearGradient colors={theme === 'dark' ? ["#070F2B", "#1B1A55", "#535C91"] : ["#1B1A55", "#535C91", "#9290C3"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoDetails}>
          <Text style={styles.infoDetailsText}>TIPOS DE FACTORES</Text>
          <View style={styles.cardsContainer}>
            {medicionDispositivos.map((area, index) => (
              <View key={index} style={styles.infoDetailsCard}>
                <FontAwesome name={area.icon} size={24} color="white" style={styles.iconTopLeft} />
                <Text style={styles.infoDetailsCardWeekDay}>{area.nombre}</Text>
                <MaterialIcons name="arrow-forward" size={24} color="white" style={styles.iconBottomRight} onPress={() => handleIconPress(area)} />
              </View>
            ))}
          </View>
        </View>
        
        {(iResultados !== null && eResultados !== null) && (
          <View style={styles.resultadosButtonContainer}>
            <Button
              title="Ver Resultados"
              onPress={handleViewResults}
              disabled={!iResultados || !eResultados}
            />
          </View>
        )}

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  infoDetails: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  infoDetailsText: {
    color: "#FFF",
    marginTop: 35,
    fontSize: 22,
    fontWeight: "600",
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Cambiado para centrar los elementos
    paddingHorizontal: 10,
    marginTop: 20,
  },
  infoDetailsCard: {
    width: '45%', // Ajusta el tamaño para que se centren mejor
    height: 250,
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10, // Añade margen horizontal para separar los elementos
    position: 'relative',
  },
  infoDetailsCardWeekDay: {
    fontSize: 18,
    color: "#FFF",
    textAlign: 'center',
    fontWeight: "400",
    marginBottom: 8,
  },
  iconTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  iconBottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default SettingsScreens;
