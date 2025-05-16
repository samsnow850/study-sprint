import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Clock, Home } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import Button from '@/components/Button';
import { useTimerStore } from '@/store/timerStore';

export default function BreakCompleteScreen() {
  const { resetTimer, theme, vibrationEnabled } = useTimerStore();
  const colors = themes[theme];
  
  // Provide haptic feedback when screen loads
  useEffect(() => {
    if (Platform.OS !== 'web' && vibrationEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [vibrationEnabled]);
  
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
  
  const handleStartNewSession = () => {
    resetTimer();
    router.replace('/timer');
  };
  
  const handleGoHome = () => {
    resetTimer();
    router.replace('/');
  };
  
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['bottom']}
    >
      <LinearGradient
        colors={[colors.primary, colors.success]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Break Complete!</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Ready to get back to work?
          </Text>
          
          <View style={styles.messageContainer}>
            <Text style={[styles.message, { color: colors.text }]}>
              Great job taking a break! Your mind is refreshed and ready for another productive session.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Start New Session"
              onPress={handleStartNewSession}
              variant="success"
              size="large"
              style={styles.button}
              icon={<Clock size={20} color="#FFFFFF" />}
            />
            
            <Button
              title="Go to Home"
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
  homeButton: {
    marginTop: 8,
  },
});