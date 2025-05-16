import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import ThemeSelector from '@/components/ThemeSelector';
import SettingsToggle from '@/components/SettingsToggle';
import { Mail, ExternalLink, Heart, AlertCircle, Bell, Moon, Volume2, Vibrate, Clock, Smartphone, Zap } from 'lucide-react-native';
import PrivacyPolicyOverlay from '@/components/PrivacyPolicyOverlay';
import TermsOfServiceOverlay from '@/components/TermsOfServiceOverlay';
import FeedbackFormOverlay from '@/components/FeedbackFormOverlay';

export default function SettingsScreen() {
  const { 
    theme, 
    soundEnabled, 
    vibrationEnabled, 
    toggleSound, 
    toggleVibration 
  } = useTimerStore();
  const colors = themes[theme];
  
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
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
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Appearance
            </Text>
            <ThemeSelector />
            
            <SettingsToggle
              label="Dark Mode"
              description="Automatically switch to dark theme at night"
              value={theme === 'dark'}
              onToggle={() => useTimerStore.getState().setTheme(theme === 'dark' ? 'blue' : 'dark')}
              disabled={false}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Notifications
            </Text>
            
            <SettingsToggle
              label="Sound"
              description="Play sound when timer completes"
              value={soundEnabled}
              onToggle={toggleSound}
              disabled={Platform.OS === 'web'}
            />
            
            <SettingsToggle
              label="Vibration"
              description="Vibrate when timer completes"
              value={vibrationEnabled}
              onToggle={toggleVibration}
              disabled={Platform.OS === 'web'}
            />
            
            <SettingsToggle
              label="Timer Alerts"
              description="Get notifications when timer is about to end"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
            
            {Platform.OS === 'web' && (
              <Text style={[styles.webNote, { color: colors.lightText }]}>
                Sound and vibration settings are only available on mobile devices.
              </Text>
            )}
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Timer Settings
            </Text>
            
            <SettingsToggle
              label="Auto-start Breaks"
              description="Automatically start break timer after a session"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
            
            <SettingsToggle
              label="Keep Screen Awake"
              description="Prevent screen from sleeping during timer"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
            
            <SettingsToggle
              label="Pomodoro Mode"
              description="Alternate between focus and break sessions"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
            
            <SettingsToggle
              label="Daily Goal"
              description="Set a daily focus time goal"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Advanced Settings
            </Text>
            
            <SettingsToggle
              label="Battery Optimization"
              description="Optimize app performance to save battery"
              value={true}
              onToggle={() => {}}
              disabled={true}
            />
            
            <SettingsToggle
              label="Data Backup"
              description="Backup your stats and settings to the cloud"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
            
            <SettingsToggle
              label="Reset Statistics"
              description="Clear all your session statistics"
              value={false}
              onToggle={() => {}}
              disabled={true}
            />
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Feedback & Support
            </Text>
            
            <TouchableOpacity 
              style={[styles.linkButton, { borderBottomColor: colors.border }]} 
              onPress={() => setShowFeedbackForm(true)}
            >
              <Mail size={20} color={colors.primary} />
              <Text style={[styles.linkText, { color: colors.text }]}>
                Send Feedback
              </Text>
              <ExternalLink size={16} color={colors.lightText} />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Legal
            </Text>
            
            <TouchableOpacity 
              style={[styles.linkButton, { borderBottomColor: colors.border }]} 
              onPress={() => setShowPrivacyPolicy(true)}
            >
              <AlertCircle size={20} color={colors.primary} />
              <Text style={[styles.linkText, { color: colors.text }]}>
                Privacy Policy
              </Text>
              <ExternalLink size={16} color={colors.lightText} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.linkButton, { borderBottomColor: colors.border }]} 
              onPress={() => setShowTermsOfService(true)}
            >
              <AlertCircle size={20} color={colors.primary} />
              <Text style={[styles.linkText, { color: colors.text }]}>
                Terms of Service
              </Text>
              <ExternalLink size={16} color={colors.lightText} />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              About
            </Text>
            <Text style={[styles.aboutText, { color: colors.text }]}>
              Study Sprint v0.3.0-alpha
            </Text>
            <Text style={[styles.aboutDescription, { color: colors.lightText }]}>
              A productivity timer to help you stay focused and get more done.
            </Text>
            
            <View style={styles.madeWithLove}>
              <Text style={[styles.madeWithText, { color: colors.lightText }]}>
                Made with 
              </Text>
              <Heart size={16} color={colors.danger} style={styles.heartIcon} />
              <Text style={[styles.madeWithText, { color: colors.lightText }]}>
                by Samuel Snow
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <PrivacyPolicyOverlay 
        visible={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
      />
      
      <TermsOfServiceOverlay 
        visible={showTermsOfService} 
        onClose={() => setShowTermsOfService(false)} 
      />
      
      <FeedbackFormOverlay 
        visible={showFeedbackForm} 
        onClose={() => setShowFeedbackForm(false)} 
      />
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
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
  webNote: {
    marginTop: 12,
    fontSize: 14,
    fontStyle: 'italic',
  },
  comingSoonText: {
    marginTop: 12,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  madeWithLove: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  madeWithText: {
    fontSize: 14,
  },
  heartIcon: {
    marginHorizontal: 4,
  },
});