import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import { validateMinutes } from '@/utils/formatTime';
import Button from './Button';

interface CustomTimerInputProps {
  onSubmit?: () => void;
}

export default function CustomTimerInput({ onSubmit }: CustomTimerInputProps) {
  const { customMinutes, setCustomMinutes } = useTimerStore();
  const [inputValue, setInputValue] = useState(customMinutes.toString());
  const [error, setError] = useState('');
  
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  const handleChange = (text: string) => {
    setInputValue(text);
    setError('');
  };
  
  const handleSubmit = () => {
    if (validateMinutes(inputValue)) {
      setCustomMinutes(parseInt(inputValue, 10));
      setError('');
      if (onSubmit) onSubmit();
    } else {
      setError('Please enter a valid number between 1-120');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>
        Set Timer Duration (minutes)
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { 
              borderColor: error ? colors.danger : colors.border,
              backgroundColor: colors.card,
              color: colors.text
            }
          ]}
          value={inputValue}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={3}
          placeholder="1-120"
          placeholderTextColor={colors.lightText}
          onSubmitEditing={handleSubmit}
        />
        
        <Button
          title="Set"
          onPress={handleSubmit}
          variant="primary"
          size="medium"
          style={styles.setButton}
        />
      </View>
      
      {error ? (
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {error}
        </Text>
      ) : (
        <Text style={[styles.helperText, { color: colors.lightText }]}>
          Choose between 1-120 minutes
        </Text>
      )}
      
      <View style={styles.presetContainer}>
        <Text style={[styles.presetLabel, { color: colors.text }]}>Quick Presets:</Text>
        <View style={styles.presetButtons}>
          <Button
            title="5"
            onPress={() => {
              setCustomMinutes(5);
              setInputValue('5');
            }}
            variant="secondary"
            size="small"
            style={styles.presetButton}
          />
          <Button
            title="15"
            onPress={() => {
              setCustomMinutes(15);
              setInputValue('15');
            }}
            variant="secondary"
            size="small"
            style={styles.presetButton}
          />
          <Button
            title="25"
            onPress={() => {
              setCustomMinutes(25);
              setInputValue('25');
            }}
            variant="secondary"
            size="small"
            style={styles.presetButton}
          />
          <Button
            title="45"
            onPress={() => {
              setCustomMinutes(45);
              setInputValue('45');
            }}
            variant="secondary"
            size="small"
            style={styles.presetButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  setButton: {
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  presetContainer: {
    marginTop: 16,
  },
  presetLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  presetButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    minWidth: 60,
  },
});