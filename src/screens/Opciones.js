import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import questions1 from '../data/opcion1/questions';
import questions2 from '../data/opcion2/questions';
import { useNavigation } from "@react-navigation/native";
import { useResultados } from '../data/almacen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SettingsScreens = ({ theme }) => {
  const navigation = useNavigation();
  const { iResultados, setIResultados, eResultados, setEResultados } = useResultados();

  const medicionDispositivos = [
    { nombre: 'Factores Externos', icon: 'sun-o', questions: questions1, tipo: 'externos' },
    { nombre: 'Factores Internos', icon: 'heart', questions: questions2, tipo: 'internos' },
  ];

  const [currentQuestions, setCurrentQuestions] = useState(null);

  const handleIconPress = (questions) => {
    navigation.navigate("Evaluación", { questions: questions.questions, tipo: questions.tipo });
  };

  const handleViewResults = () => {
    const answers = [...eResultados, ...iResultados];
    navigation.navigate("Resultados", { answers, theme });
  };

  return (
    <LinearGradient colors={theme === 'dark' ? ["#070F2B", "#1B1A55", "#535C91"] : ["#1B1A55", "#535C91", "#9290C3"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoDetails}>
          <Text style={styles.infoDetailsText}>TIPOS DE FACTORES</Text>
          <View style={styles.cardsContainer}>
            {medicionDispositivos.map((area, index) => (
              <View key={index} style={styles.infoDetailsCard}>
                <FontAwesome name={area.icon} size={wp('6%')} color="white" style={styles.iconTopLeft} />
                <Text style={styles.infoDetailsCardWeekDay}>{area.nombre}</Text>
                <MaterialIcons name="arrow-forward" size={wp('6%')} color="white" style={styles.iconBottomRight} onPress={() => handleIconPress(area)} />
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
    marginTop: hp('2%'),
    padding: wp('5%'),
    alignItems: 'center',
  },
  infoDetailsText: {
    color: "#FFF",
    marginTop: hp('4%'),
    fontSize: wp('5.5%'),
    fontWeight: "600",
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: wp('2%'),
    marginTop: hp('2%'),
  },
  infoDetailsCard: {
    width: wp('42%'), // Ajustado para que se adapten mejor en diferentes pantallas
    height: hp('30%'),
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: wp('2%'),
    alignItems: "center",
    justifyContent: "center",
    margin: wp('2%'),
    position: 'relative',
  },
  infoDetailsCardWeekDay: {
    fontSize: wp('4.5%'),
    color: "#FFF",
    textAlign: 'center',
    fontWeight: "400",
    marginBottom: hp('1%'),
  },
  iconTopLeft: {
    position: 'absolute',
    top: hp('1%'),
    left: wp('1%'),
  },
  iconBottomRight: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('1%'),
  },
  resultadosButtonContainer: {
    marginVertical: hp('3%'),
    alignItems: 'center',
  },
});

export default SettingsScreens;
