import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Colors } from '../theme';
import questions from '../data/pre/questions';

const Home = ({ theme }) => {
  const navigation = useNavigation();
  const [themeValue, setThemeValue] = useState('light');
  const [bannerUrl, setBannerUrl] = useState('https://i.postimg.cc/QM81nzCN/1.png'); // Inicializa con una URL predeterminada

  useEffect(() => {
    setThemeValue(theme); 
    const url = getBannerUrl(theme);
    console.log('Theme:', theme); // Depuración
    setBannerUrl(url);
  }, [theme]);

  const handleShowOpciones = () => {
    navigation.navigate("Preguntas", { questions: questions });
  };

  const getBannerUrl = (theme) => {
    const bannerUrls = {
      light: 'https://i.postimg.cc/QM81nzCN/1.png',
      dark: 'https://i.postimg.cc/QM81nzCN/1.png', // Cambiar por la URL de la imagen para el tema oscuro
    };
    return bannerUrls[theme] || 'https://i.postimg.cc/QM81nzCN/1.png'; // Valor predeterminado
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
    },
    title: {
      fontSize: 36,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 60,
    },
    banner: {
      height: 350,
      width: 350,
    },
    bannerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    button: {
      width: '80%',
      backgroundColor: Colors[theme]?.sky,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 25,
    },
    buttonText: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors[theme]?.commonWhite,
    },
});

export default Home;
