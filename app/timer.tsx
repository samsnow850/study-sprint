import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Platform, Alert } from 'react-native';
import { useNavigation, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Timer from '@/components/Timer';
import QuoteDisplay from '@/components/QuoteDisplay';
import TaskList from '@/components/TaskList';
import TaskNotes from '@/components/TaskNotes';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import { Animated } from 'react-native';
import CustomTimerInput from '@/components/CustomTimerInput';

export default function TimerScreen() {
  const navigation = useNavigation();
  const { theme, pauseTimer, isRunning } = useTimerStore();
  const colors = themes[theme];
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Handle back button on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // Show confirmation dialog
        confirmExit();
        return true;
      });
      
      return () => backHandler.remove();
    }
  }, [isRunning]);
  
  // Set header options
  useEffect(() => {
    navigation.setOptions({
      // Disable the back gesture and button
      gestureEnabled: false,
      headerBackVisible: false,
    });
  }, [navigation]);
  
  const confirmExit = () => {
    if (isRunning) {
      pauseTimer();
    }
    
    Alert.alert(
      "Leave Timer?",
      "Your timer will be paused. Are you sure you want to go back to the home screen?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            if (isRunning) {
              // Resume timer if it was running
              useTimerStore.getState().startTimer();
            }
          }
        },
        {
          text: "Leave",
          onPress: () => router.replace('/')
        }
      ]
    );
  };
  
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['bottom']}
    >
      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim }}
      >
        <View style={styles.content}>
          <CustomTimerInput />
          <Timer confirmExit={confirmExit} />
          <TaskNotes />
          <QuoteDisplay />
          <TaskList />
        </View>
      </Animated.ScrollView>
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
    justifyContent: 'center',
    padding: 20,
  },
});