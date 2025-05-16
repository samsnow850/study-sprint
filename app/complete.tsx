import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Clock, Coffee, Home } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import Button from '@/components/Button';
import { useTimerStore } from '@/store/timerStore';

export default function CompleteScreen() {
  const { 
    resetTimer, 
    customMinutes, 
    theme, 
    completeSession,
    vibrationEnabled,
    startBreak
  } = useTimerStore();
  const colors = themes[theme];
  
  // Record completed session
  useEffect(() => {
    completeSession();
  }, [completeSession]);
  
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
  
  const handleTryAgain = () => {
    resetTimer();
    router.replace('/timer');
  };
  
  const handleStartBreak = () => {
    startBreak();
    router.replace('/break');
  };
  
  const handleHome = () => {
    resetTimer();
    router.replace('/');
  };
  
  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      edges={['bottom']}
    >
      <LinearGradient
        colors={[colors.success, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.title, { color: colors.text }]}>Time's Up!</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Great job staying focused!</Text>
            
            <View style={styles.statsContainer}>
              <View style={[
                styles.statItem, 
                { backgroundColor: colors.background, borderColor: colors.border }
              ]}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  {customMinutes}
                </Text>
                <Text style={[styles.statLabel, { color: colors.lightText }]}>Minutes</Text>
              </View>
            </View>
            
            <Text style={[styles.message, { color: colors.text }]}>
              Taking regular breaks improves productivity. Ready for a 5-minute break?
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Take a Break"
                onPress={handleStartBreak}
                variant="primary"
                size="large"
                style={styles.button}
                icon={<Coffee size={20} color="#FFFFFF" />}
              />
              
              <Button
                title="Start Another Session"
                onPress={handleTryAgain}
                variant="success"
                size="large"
                style={styles.button}
                icon={<Clock size={20} color="#FFFFFF" />}
              />
              
              <Button
                title="Back to Home"
                onPress={handleHome}
                variant="secondary"
                size="medium"
                style={[styles.button, styles.homeButton]}
                icon={<Home size={18} color={colors.primary} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 120,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
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