import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/HomeScreens";
import OPCIONES from "./src/screens/Opciones";
import Clasificacion from "./src/screens/Clasificacion";
import Evaluacion from "./src/screens/Evaluacion";
import RecopilacionClasificacion from "./src/screens/Recopilacion Clasificacion";
import RecopilacionEvaluacion from "./src/screens/Recopilacion Evaluacion";
import Resultados from "./src/screens/Resultados";
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
            backgroundColor: Colors[theme.dark ? 'dark' : 'light'].sky, 
          },
          headerTintColor: Colors[theme.dark ? 'dark' : 'light'].commonWhite, 
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
        <Stack.Screen name="Clasificación">
          {props => <Clasificacion {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Evaluación">
          {props => <Evaluacion {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Recopilacion: Clasificación">
          {props => <RecopilacionClasificacion {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Recopilacion: Evaluación">
          {props => <RecopilacionEvaluacion {...props} theme={themeValue} />}
        </Stack.Screen>
        <Stack.Screen name="Resultados">
          {props => <Resultados {...props} theme={themeValue} />}
        </Stack.Screen>
        
      </Stack.Navigator>
      </NavigationContainer>
    </ResultadosProvider>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    marginRight: 10,
  },
});
