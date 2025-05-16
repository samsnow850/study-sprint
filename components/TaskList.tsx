import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Plus } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import { useTaskStore, Task } from '@/store/taskStore';
import Button from './Button';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [newTask, setNewTask] = useState('');
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  const { tasks, addTask, toggleTask, deleteTask, clearCompletedTasks } = useTaskStore();
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };
  
  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={() => toggleTask(item.id)}
      onDelete={() => deleteTask(item.id)}
    />
  );
  
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Tasks</Text>
        {tasks.length > 0 && (
          <Text style={[styles.counter, { color: colors.lightText }]}>
            {completedCount}/{tasks.length} completed
          </Text>
        )}
      </View>
      
      <View style={[
        styles.inputContainer, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border
        }
      ]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add a new task..."
          placeholderTextColor={colors.lightText}
          onSubmitEditing={handleAddTask}
          maxLength={100}
        />
        <Button
          title="Add"
          onPress={handleAddTask}
          variant="primary"
          size="small"
          icon={<Plus size={16} color="#FFFFFF" />}
          disabled={!newTask.trim()}
        />
      </View>
      
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.lightText }]}>
            No tasks yet. Add some tasks to focus on during your session.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
          
          {completedCount > 0 && (
            <Button
              title="Clear Completed"
              onPress={clearCompletedTasks}
              variant="secondary"
              size="small"
              style={styles.clearButton}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  list: {
    maxHeight: 300,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});