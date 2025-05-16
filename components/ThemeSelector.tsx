import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore, ThemeKey } from '@/store/timerStore';

export default function ThemeSelector() {
  const { theme, setTheme } = useTimerStore();
  const colors = themes[theme];
  
  const themeOptions: { key: ThemeKey; name: string }[] = [
    { key: 'blue', name: 'Blue (Default)' },
    { key: 'purple', name: 'Purple' },
    { key: 'dark', name: 'Dark Mode' },
    { key: 'sunset', name: 'Sunset' },
  ];
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>App Theme</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.themesContainer}
      >
        {themeOptions.map((option) => {
          const themeColors = themes[option.key];
          const isSelected = theme === option.key;
          
          return (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.themeOption,
                {
                  borderColor: isSelected ? themeColors.primary : 'transparent',
                  backgroundColor: themeColors.card,
                }
              ]}
              onPress={() => setTheme(option.key)}
            >
              <View style={[
                styles.colorPreview, 
                { backgroundColor: themeColors.primary }
              ]} />
              
              <Text style={[
                styles.themeName,
                { color: themeColors.text }
              ]}>
                {option.name}
              </Text>
              
              {isSelected && (
                <View style={[
                  styles.checkmark,
                  { backgroundColor: themeColors.primary }
                ]}>
                  <Check size={14} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  themesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  themeOption: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  colorPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  themeName: {
    fontSize: 14,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});