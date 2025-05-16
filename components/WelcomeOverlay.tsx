import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { X } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import { LinearGradient } from 'expo-linear-gradient';

const STORAGE_KEY = 'welcome-overlay-shown';
const { width, height } = Dimensions.get('window');

export default function WelcomeOverlay() {
  const [visible, setVisible] = useState(false);
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  
  useEffect(() => {
    checkIfShown();
  }, []);
  
  const checkIfShown = async () => {
    try {
      const hasShown = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (!hasShown) {
        setVisible(true);
        animateIn();
      }
    } catch (error) {
      console.error('Failed to check if welcome was shown', error);
    }
  };
  
  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  };
  
  const handleDismiss = async () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start(() => {
      setVisible(false);
    });
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      console.error('Failed to save welcome shown state', error);
    }
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleDismiss}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
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
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleDismiss}
          >
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Welcome to Study Sprint!</Text>
          <Text style={styles.subtitle}>Your productivity companion</Text>
          
          <ScrollView style={styles.scrollContent}>
            <Text style={styles.welcomeText}>
              Thank you for downloading Study Sprint! This app is designed to help you stay focused and make the most of your study sessions.
            </Text>
            
            <View style={styles.featureContainer}>
              <Text style={styles.featureTitle}>Key Features:</Text>
              
              <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>
                  Customizable focus timer to help you stay on track
                </Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>
                  Task management to organize your study goals
                </Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>
                  Break timers to ensure proper rest between sessions
                </Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>
                  Session statistics to track your progress
                </Text>
              </View>
              
              <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>
                  Multiple themes to personalize your experience
                </Text>
              </View>
            </View>
            
            <Text style={styles.versionText}>
              Current Version: v0.3.0-alpha
            </Text>
            
            <Text style={styles.updateText}>
              Latest Update (May 16, 2025): Added bottom navigation, improved settings, and enhanced timer functionality.
            </Text>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleDismiss}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  content: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  scrollContent: {
    width: '100%',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureContainer: {
    width: '100%',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 10,
  },
  featureBullet: {
    fontSize: 16,
    color: '#4A90E2',
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  updateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});