import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import TaskList from '@/components/TaskList';

export default function TasksScreen() {
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['bottom']}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <TaskList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding for bottom nav bar
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});