// formato_preguntas.js
import React from 'react';
import { Pressable, Text, TextInput, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export const TIPOS_PREGUNTAS = {
  SI_NO: 'SI_NO',
  ESCALA: 'ESCALA',
  TEXTO: 'TEXTO',
  COMBO_BOX: 'COMBO_BOX'
};

export const ConfiguracionPreguntas = {
  [TIPOS_PREGUNTAS.SI_NO]: {
    render: (handleSelect, selectedAnswer, theme) => (
      ['Sí', 'No'].map((item, idx) => (
        <Pressable
          key={idx}
          onPress={() => handleSelect(item)}
          style={[
            styles.questionContainer,
            selectedAnswer === item ? { backgroundColor: '#59CE8F' } : {}
          ]}>
          <Text style={{ marginLeft: 10, color: theme === 'dark' ? 'white' : 'black' }}>{item}</Text>
        </Pressable>
      ))
    )
  },
  [TIPOS_PREGUNTAS.ESCALA]: {
    render: (handleSelect, selectedAnswer, theme, opciones = []) => (
      opciones.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={() => handleSelect(item)}
          style={[
            styles.questionContainer,
            selectedAnswer === item ? { backgroundColor: '#59CE8F' } : {}
          ]}>
          <Text style={{ marginLeft: 10, color: theme === 'dark' ? 'white' : 'black' }}>{item}</Text>
        </Pressable>
      ))
    )
  },
  [TIPOS_PREGUNTAS.TEXTO]: {
    render: (handleSelect, selectedAnswer, theme) => (
      <TextInput
        style={{ borderColor: theme === 'dark' ? 'white' : 'black', borderWidth: 1, borderRadius: 5, padding: 10, color: theme === 'dark' ? 'white' : 'black' }}
        multiline
        numberOfLines={4}
        onChangeText={(text) => handleSelect(text)}
        value={selectedAnswer}
        placeholder="Escribe tu respuesta aquí"
        placeholderTextColor={theme === 'dark' ? 'gray' : 'darkgray'}
      />
    )
  },

  [TIPOS_PREGUNTAS.COMBO_BOX]: {
    render: (handleSelect, selectedAnswer, theme, opciones = []) => (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAnswer}
          onValueChange={(itemValue) => handleSelect(itemValue)}
          style={{ color: theme === 'dark' ? 'white' : 'black' }}
        >
          {opciones.map((item, idx) => (
            <Picker.Item key={idx} label={item} value={item} />
          ))}
        </Picker>
      </View>
    )
  }

};

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
  }
});
