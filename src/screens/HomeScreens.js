import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { Colors } from '../theme';
import questions from '../data/pre/questions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = ({ theme }) => {
  const navigation = useNavigation();
  const [themeValue, setThemeValue] = useState('light');
  const [bannerUrl, setBannerUrl] = useState('https://i.postimg.cc/QM81nzCN/1.png');

  useEffect(() => {
    setThemeValue(theme); 
    const url = getBannerUrl(theme);
    console.log('Theme:', theme); 
    setBannerUrl(url);
  }, [theme]);

  const handleShowOpciones = () => {
    navigation.navigate("Clasificación", { questions: questions });
  };

  const getBannerUrl = (theme) => {
    const bannerUrls = {
      light: 'https://i.postimg.cc/QM81nzCN/1.png',
      dark: 'https://i.postimg.cc/QM81nzCN/1.png',
    };
    return bannerUrls[theme] || 'https://i.postimg.cc/QM81nzCN/1.png';
  };

  const styles = styling(themeValue);

  return (
    <View style={[styles.container, { backgroundColor: Colors[themeValue]?.themeColor }]}>
      <Text style={[styles.title, { color: Colors[themeValue]?.white }]}>
        {'ASISTENTE VIRTUAL START'}
      </Text>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: bannerUrl }}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={handleShowOpciones} style={styles.button}>
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: wp('5%'), // Uso de porcentaje para el padding
    },
    title: {
      fontSize: wp('8%'), // Uso de porcentaje para la fuente
      fontWeight: '600',
      textAlign: 'center',
      marginTop: hp('5%'), // Uso de porcentaje para el margen superior
    },
    banner: {
      height: hp('40%'), // Uso de porcentaje para la altura
      width: wp('80%'), // Uso de porcentaje para el ancho
    },
    bannerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    button: {
      width: wp('80%'), // Uso de porcentaje para el ancho
      backgroundColor: Colors[theme]?.sky,
      padding: wp('4%'), // Uso de porcentaje para el padding
      borderRadius: wp('4%'), // Uso de porcentaje para el borde redondeado
      alignItems: 'center',
      marginBottom: hp('3%'), // Uso de porcentaje para el margen inferior
    },
    buttonText: {
      fontSize: wp('6%'), // Uso de porcentaje para la fuente
      fontWeight: '600',
      color: Colors[theme]?.commonWhite,
    },
});

export default Home;
