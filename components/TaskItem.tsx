import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import { Task } from '@/store/taskStore';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.card,
        borderColor: colors.border
      }
    ]}>
      <TouchableOpacity 
        style={[
          styles.checkbox, 
          { 
            borderColor: task.completed ? colors.success : colors.border,
            backgroundColor: task.completed ? colors.success : 'transparent'
          }
        ]} 
        onPress={onToggle}
      >
        {task.completed && <Check size={16} color="#FFFFFF" />}
      </TouchableOpacity>
      
      <Text 
        style={[
          styles.title, 
          { 
            color: colors.text,
            textDecorationLine: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.7 : 1
          }
        ]}
      >
        {task.title}
      </Text>
      
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Trash2 size={18} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
});