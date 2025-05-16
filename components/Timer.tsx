import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration, Animated } from 'react-native';
import { useNavigation, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useTimerStore } from '@/store/timerStore';
import { formatTime } from '@/utils/formatTime';
import { themes } from '@/constants/colors';
import Button from './Button';

interface TimerProps {
  confirmExit: () => void;
}

export default function Timer({ confirmExit }: TimerProps) {
  const navigation = useNavigation();
  const { 
    isRunning, 
    timeRemaining, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    theme,
    vibrationEnabled,
    isBreak,
    breakTimeRemaining,
    tickBreak
  } = useTimerStore();
  
  const colors = themes[theme];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [showPulse, setShowPulse] = useState(false);

  // Pulsing animation for active timer
  useEffect(() => {
    if (isRunning) {
      setShowPulse(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop animation when timer is paused
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      setShowPulse(false);
    }
  }, [isRunning, pulseAnim]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (isBreak) {
          tickBreak();
        } else {
          tick();
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tick, tickBreak, isBreak]);

  // Navigate to complete screen when timer ends
  useEffect(() => {
    if (timeRemaining === 0 && !isRunning && !isBreak) {
      // Provide haptic feedback when timer ends (on supported devices)
      if (Platform.OS !== 'web' && vibrationEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Vibration.vibrate([500, 500, 500]);
      }
      
      // Navigate to complete screen
      navigation.navigate('complete' as never);
    }
  }, [timeRemaining, isRunning, navigation, vibrationEnabled, isBreak]);

  // Navigate to break complete screen when break timer ends
  useEffect(() => {
    if (breakTimeRemaining === 0 && !isRunning && isBreak) {
      // Provide haptic feedback when break ends (on supported devices)
      if (Platform.OS !== 'web' && vibrationEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Vibration.vibrate([300, 300, 300]);
      }
      
      // Navigate to break complete screen
      navigation.navigate('break-complete' as never);
    }
  }, [breakTimeRemaining, isRunning, navigation, vibrationEnabled, isBreak]);

  // Calculate progress percentage
  const progress = isBreak 
    ? breakTimeRemaining / (5 * 60) // 5 minutes break
    : timeRemaining / useTimerStore(state => state.initialTime);

  const displayTime = isBreak ? breakTimeRemaining : timeRemaining;

  return (
    <View style={styles.container}>
      {isBreak && (
        <View style={[styles.breakBanner, { backgroundColor: colors.warning }]}>
          <Text style={styles.breakText}>BREAK TIME</Text>
        </View>
      )}
      
      <View style={styles.timerContainer}>
        <Animated.View 
          style={[
            styles.pulseRing, 
            { 
              borderColor: isBreak ? colors.warning : colors.primary,
              opacity: showPulse ? 0.3 : 0,
              transform: [{ scale: pulseAnim }]
            }
          ]} 
        />
        <View style={[styles.progressRing, { borderColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progress * 100}%`,
                backgroundColor: isBreak 
                  ? colors.warning
                  : progress > 0.5 
                    ? colors.success 
                    : progress > 0.25 
                      ? colors.warning 
                      : colors.danger
              }
            ]} 
          />
          <Text style={[styles.timerText, { color: colors.text }]}>
            {formatTime(displayTime)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {isRunning ? (
          <Button
            title="Pause"
            onPress={pauseTimer}
            variant="warning"
            size="large"
            style={styles.button}
          />
        ) : (
          <Button
            title="Start"
            onPress={startTimer}
            variant="success"
            size="large"
            style={styles.button}
            disabled={displayTime === 0}
          />
        )}
        
        <Button
          title="Reset"
          onPress={resetTimer}
          variant="danger"
          size="large"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  breakBanner: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  breakText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 270,
    height: 270,
    borderRadius: 135,
    borderWidth: 4,
  },
  progressRing: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    opacity: 0.3,
  },
  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
});