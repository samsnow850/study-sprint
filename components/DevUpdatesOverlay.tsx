import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Modal,
  Platform,
  Animated
} from 'react-native';
import { X, Bell } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';

const STORAGE_KEY = 'dev-updates-last-dismissed';
const CURRENT_VERSION = 'v0.3.0-alpha';

// List of updates with dates
const updates = [
  {
    date: 'May 16, 2025',
    version: 'v0.3.0-alpha',
    changes: [
      'Added bottom navigation bar for easier access to all screens',
      'Added welcome screen for first-time users',
      'Added privacy policy and terms of service overlays',
      'Enhanced settings page with more options',
      'Added feedback form with email integration',
      'Updated footer attribution to credit Samuel Snow',
      'Improved timer screen navigation',
      'Added dev updates overlay to track changes',
      'Fixed various bugs and improved performance'
    ]
  },
  {
    date: 'May 10, 2025',
    version: 'v0.2.5-alpha',
    changes: [
      'Added break timer functionality',
      'Implemented task notes for focus sessions',
      'Added session statistics tracking',
      'Improved theme selection with 4 color schemes',
      'Enhanced timer animations and visual feedback'
    ]
  },
  {
    date: 'May 3, 2025',
    version: 'v0.2.0-alpha',
    changes: [
      'Initial alpha release',
      'Basic timer functionality',
      'Simple task management',
      'Session completion tracking',
      'Basic settings and theme options'
    ]
  }
];

export default function DevUpdatesOverlay() {
  const [visible, setVisible] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  useEffect(() => {
    checkLastDismissed();
  }, []);
  
  const checkLastDismissed = async () => {
    try {
      const lastDismissed = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (!lastDismissed || lastDismissed !== CURRENT_VERSION) {
        setShowBadge(true);
      }
    } catch (error) {
      console.error('Failed to check last dismissed updates', error);
    }
  };
  
  const handleOpen = () => {
    setVisible(true);
    setShowBadge(false);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const handleDismiss = async () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    } catch (error) {
      console.error('Failed to save dismissed state', error);
    }
  };
  
  return (
    <>
      <TouchableOpacity 
        style={[
          styles.button,
          { backgroundColor: colors.primary }
        ]} 
        onPress={handleOpen}
      >
        <Bell size={20} color="#FFFFFF" />
        {showBadge && (
          <View style={styles.badge} />
        )}
      </TouchableOpacity>
      
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={handleDismiss}
      >
        <View style={styles.modalContainer}>
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                backgroundColor: colors.card,
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>
                Dev Updates
              </Text>
              <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.subtitle, { color: colors.lightText }]}>
              Study Sprint is currently in alpha testing
            </Text>
            
            <ScrollView style={styles.updatesList}>
              {updates.map((update, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.updateItem,
                    index < updates.length - 1 && { 
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border
                    }
                  ]}
                >
                  <View style={styles.updateHeader}>
                    <Text style={[styles.updateDate, { color: colors.primary }]}>
                      {update.date}
                    </Text>
                    <Text style={[styles.updateVersion, { color: colors.lightText }]}>
                      {update.version}
                    </Text>
                  </View>
                  
                  {update.changes.map((change, changeIndex) => (
                    <View key={changeIndex} style={styles.changeItem}>
                      <Text style={[styles.bulletPoint, { color: colors.primary }]}>•</Text>
                      <Text style={[styles.changeText, { color: colors.text }]}>
                        {change}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.dismissButton, { backgroundColor: colors.primary }]}
              onPress={handleDismiss}
            >
              <Text style={styles.dismissText}>Got it</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  updatesList: {
    marginBottom: 16,
  },
  updateItem: {
    paddingVertical: 16,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  updateDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateVersion: {
    fontSize: 14,
  },
  changeItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
  },
  changeText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  dismissButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dismissText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});