import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, CheckCircle, BarChart2, Settings } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import Button from '@/components/Button';
import { useTimerStore } from '@/store/timerStore';
import SessionStats from '@/components/SessionStats';
import { useEffect, useRef } from 'react';

export default function HomeScreen() {
  const { theme } = useTimerStore();
  const colors = themes[theme];
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleStartStudying = () => {
    router.replace('/timer');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Text style={styles.title}>Study Sprint</Text>
          <Text style={styles.subtitle}>Race against time to stay focused</Text>
        </View>
        
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.description, { color: colors.text }]}>
            Study Sprint helps you stay focused and productive with customizable timers, task management, and productivity tracking.
          </Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors.primary + '20' }]}>
                <Clock size={24} color={colors.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Focus Timer</Text>
                <Text style={[styles.featureDescription, { color: colors.lightText }]}>
                  Customizable timers to help you stay on track
                </Text>
              </View>
            </View>
            
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors.success + '20' }]}>
                <CheckCircle size={24} color={colors.success} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Task Management</Text>
                <Text style={[styles.featureDescription, { color: colors.lightText }]}>
                  Keep track of your tasks during focus sessions
                </Text>
              </View>
            </View>
            
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors.warning + '20' }]}>
                <BarChart2 size={24} color={colors.warning} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Progress Tracking</Text>
                <Text style={[styles.featureDescription, { color: colors.lightText }]}>
                  Monitor your productivity and study habits
                </Text>
              </View>
            </View>
            
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors.secondary + '20' }]}>
                <Settings size={24} color={colors.secondary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>Customization</Text>
                <Text style={[styles.featureDescription, { color: colors.lightText }]}>
                  Personalize your experience with themes and settings
                </Text>
              </View>
            </View>
          </View>
          
          <Button
            title="Start Studying"
            onPress={handleStartStudying}
            variant="primary"
            size="large"
            style={styles.startButton}
            icon={<Clock size={20} color="#FFFFFF" />}
          />
        </View>
        
        <SessionStats />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Add padding for bottom nav bar
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '30%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 60,
    textAlign: 'center',
    zIndex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
    zIndex: 1,
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
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  startButton: {
    width: '100%',
    marginTop: 8,
  },
});