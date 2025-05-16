import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Animated
} from 'react-native';
import { X } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';

interface PrivacyPolicyOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyOverlay({ visible, onClose }: PrivacyPolicyOverlayProps) {
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  const [fadeAnim] = useState(new Animated.Value(0));
  
  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible, fadeAnim]);
  
  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
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
              Privacy Policy
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            <Text style={[styles.lastUpdated, { color: colors.lightText }]}>
              Last Updated: May 16, 2025
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Introduction
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              Study Sprint ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you use the Study Sprint application (our "App") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Information We Collect
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              We collect several types of information from and about users of our App, including:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • Information that is stored locally on your device, such as timer settings, completed sessions, and task lists.
              </Text>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • Usage data that helps us improve the App, such as how you interact with the App and which features you use most.
              </Text>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • Device information, including your mobile device type and operating system.
              </Text>
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              How We Use Your Information
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              We use information that we collect about you or that you provide to us:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • To provide you with the App and its contents, and any other information, products or services that you request from us.
              </Text>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • To improve our App and to deliver a better and more personalized experience.
              </Text>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • To fulfill any other purpose for which you provide it.
              </Text>
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Data Storage and Security
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              The security of your information is important to us. We use appropriate technical and organizational measures to protect your information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your Choices About Your Information
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              You can set your device to refuse all or some cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of the App may then be inaccessible or not function properly.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Changes to Our Privacy Policy
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will post the new privacy policy on this page.
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              The date the privacy policy was last revised is identified at the top of the page. You are responsible for periodically visiting this privacy policy to check for any changes.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Contact Information
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              To ask questions or comment about this privacy policy and our privacy practices, contact us at: ssnow@sterneschool.org
            </Text>
          </ScrollView>
          
          <TouchableOpacity 
            style={[styles.closeFullButton, { backgroundColor: colors.primary }]}
            onPress={handleClose}
          >
            <Text style={styles.closeFullButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 600,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    marginBottom: 20,
  },
  lastUpdated: {
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 16,
  },
  bulletItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  closeFullButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeFullButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});