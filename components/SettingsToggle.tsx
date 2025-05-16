import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';

interface SettingsToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export default function SettingsToggle({
  label,
  description,
  value,
  onToggle,
  disabled = false,
}: SettingsToggleProps) {
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  return (
    <View style={[
      styles.container,
      { borderBottomColor: colors.border }
    ]}>
      <View style={styles.textContainer}>
        <Text style={[
          styles.label,
          { color: colors.text, opacity: disabled ? 0.5 : 1 }
        ]}>
          {label}
        </Text>
        
        {description && (
          <Text style={[
            styles.description,
            { color: colors.lightText, opacity: disabled ? 0.5 : 1 }
          ]}>
            {description}
          </Text>
        )}
      </View>
      
      <Switch
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{ 
          false: '#D1D1D6', 
          true: colors.primary 
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});