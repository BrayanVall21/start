import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/HomeScreens";
import OPCIONES from "./src/screens/Opciones";
import Preguntas from "./src/screens/Preguntas";
import Preguntas2 from "./src/screens/Preguntas2";
import Resultados from "./src/screens/Resultados";
import Resultados2 from "./src/screens/Resultados2";
import PostResultados from "./src/screens/PostResultados";
import ResultadosProvider from "./src/data/almacen";
import { Colors } from './src/theme';
import { get } from './src/utiles/Storage';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ThemeSwitch from "./src/utiles/ThemeSwitch";

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(DefaultTheme); // Estado para almacenar el tema
  const [themeValue, setThemeValue] = useState('light');

  // Función para obtener el tema guardado en el almacenamiento
  const getThemeFromStorage = async () => {
    const savedTheme = await get('Theme');
    // Si hay un tema guardado, actualizar el estado con el tema correspondiente
    if (savedTheme && savedTheme.theme) {
      setTheme(savedTheme.theme === 'dark' ? DarkTheme : DefaultTheme);
    }
  };

  useEffect(() => {
    getThemeFromStorage(); // Llamar a la función al montar el componente
  }, []); // El segundo parámetro del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

  const handleToggleColorScheme = (newTheme) => {
    setThemeValue(newTheme);
    setTheme(newTheme === 'dark' ? DarkTheme : DefaultTheme);
  };
  return (
    <ResultadosProvider>
      <NavigationContainer
      theme={theme}
      onStateChange={() => {
        getThemeFromStorage(); // Llamar a la función cada vez que cambie el estado de la navegación
      }}
    >
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.switchContainer}>
              <ThemeSwitch onValueChange={handleToggleColorScheme} />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors[theme.dark ? 'dark' : 'light'].sky, // Utilizar el color primario del tema
          },
          headerTintColor: Colors[theme.dark ? 'dark' : 'light'].commonWhite, // Utilizar el color de texto del tema
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Stack.Screen name="Inicio">
          {props => <Home {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Opciones">
          {props => <OPCIONES {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Preguntas">
          {props => <Preguntas {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Preguntas2">
          {props => <Preguntas2 {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Resultados">
          {props => <Resultados {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Resultados2">
          {props => <Resultados2 {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="PostResultados">
          {props => <PostResultados {...props} theme={themeValue} />}
        </Stack.Screen>
        
      </Stack.Navigator>
      </NavigationContainer>
    </ResultadosProvider>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginRight: 10, // Espacio de margen a la derecha para separar el interruptor de tema de otros elementos
  },
});
