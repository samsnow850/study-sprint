import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Edit2, Check } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'study-sprint-task-notes';

export default function TaskNotes() {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState('');
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  const [fadeAnim] = useState(new Animated.Value(1));
  
  // Load saved notes on mount
  useEffect(() => {
    loadNotes();
  }, []);
  
  const loadNotes = async () => {
    try {
      const savedValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedValue !== null) {
        setSavedNotes(savedValue);
        setNotes(savedValue);
      }
    } catch (error) {
      console.error('Failed to load notes', error);
    }
  };
  
  const saveNotes = async (value: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
      setSavedNotes(value);
    } catch (error) {
      console.error('Failed to save notes', error);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  const handleSave = () => {
    setIsEditing(false);
    saveNotes(notes);
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  if (!isEditing && !savedNotes) {
    return (
      <TouchableOpacity 
        style={[
          styles.emptyContainer, 
          { 
            backgroundColor: colors.card,
            borderColor: colors.border
          }
        ]}
        onPress={handleEdit}
      >
        <Text style={[styles.emptyText, { color: colors.lightText }]}>
          What are you focusing on this session? Tap to add notes.
        </Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: fadeAnim
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Focus Notes
        </Text>
        
        {!isEditing ? (
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Edit2 size={18} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Check size={18} color={colors.success} />
          </TouchableOpacity>
        )}
      </View>
      
      {isEditing ? (
        <TextInput
          style={[
            styles.input,
            { 
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.background
            }
          ]}
          value={notes}
          onChangeText={setNotes}
          placeholder="What are you focusing on this session?"
          placeholderTextColor={colors.lightText}
          multiline
          autoFocus
          maxLength={200}
        />
      ) : (
        <Text style={[styles.noteText, { color: colors.text }]}>
          {savedNotes}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
  },
  emptyContainer: {
    width: '100%',
    maxWidth: 600,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 4,
  },
  saveButton: {
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  noteText: {
    fontSize: 16,
    lineHeight: 24,
  },
});