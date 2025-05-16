import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, BackHandler, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Coffee, SkipForward, Home } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import Button from '@/components/Button';
import { useTimerStore } from '@/store/timerStore';
import { formatTime } from '@/utils/formatTime';

export default function BreakScreen() {
  const { 
    isRunning, 
    breakTimeRemaining, 
    tickBreak, 
    pauseTimer, 
    startTimer, 
    skipBreak,
    theme,
    vibrationEnabled
  } = useTimerStore();
  
  const colors = themes[theme];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tickBreak();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tickBreak]);
  
  // Navigate to break complete screen when timer ends
  useEffect(() => {
    if (breakTimeRemaining === 0 && !isRunning) {
      // Provide haptic feedback when break ends (on supported devices)
      if (Platform.OS !== 'web' && vibrationEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      // Navigate to break complete screen
      router.replace('/break-complete');
    }
  }, [breakTimeRemaining, isRunning, vibrationEnabled]);
  
  // Handle back button on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // Prevent going back with the hardware back button
        return true;
      });
      
      return () => backHandler.remove();
    }
  }, []);
  
  const handleSkipBreak = () => {
    skipBreak();
    router.replace('/');
  };
  
  const handleGoHome = () => {
    skipBreak();
    router.replace('/');
  };
  
  // Calculate progress percentage
  const progress = breakTimeRemaining / (5 * 60); // 5 minutes break
  
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['bottom']}
    >
      <LinearGradient
        colors={[colors.warning, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.iconContainer}>
            <Coffee size={60} color={colors.warning} />
          </View>
          
          <Text style={[styles.title, { color: colors.text }]}>Break Time</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Take a moment to relax and recharge
          </Text>
          
          <View style={styles.timerContainer}>
            <View style={[
              styles.progressRing, 
              { borderColor: colors.border, backgroundColor: colors.background }
            ]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progress * 100}%`,
                    backgroundColor: colors.warning
                  }
                ]} 
              />
              <Text style={[styles.timerText, { color: colors.text }]}>
                {formatTime(breakTimeRemaining)}
              </Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            {isRunning ? (
              <Button
                title="Pause Break"
                onPress={pauseTimer}
                variant="warning"
                size="large"
                style={styles.button}
              />
            ) : (
              <Button
                title="Resume Break"
                onPress={startTimer}
                variant="primary"
                size="large"
                style={styles.button}
              />
            )}
            
            <Button
              title="Skip Break"
              onPress={handleSkipBreak}
              variant="secondary"
              size="medium"
              style={styles.skipButton}
              icon={<SkipForward size={18} color={colors.primary} />}
            />
            
            <Button
              title="Home"
              onPress={handleGoHome}
              variant="secondary"
              size="medium"
              style={styles.homeButton}
              icon={<Home size={18} color={colors.primary} />}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 80, // Add padding for bottom nav bar
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '100%',
  },
  skipButton: {
    marginTop: 12,
  },
  homeButton: {
    marginTop: 12,
  },
});