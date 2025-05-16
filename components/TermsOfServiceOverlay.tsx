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

interface TermsOfServiceOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export default function TermsOfServiceOverlay({ visible, onClose }: TermsOfServiceOverlayProps) {
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
              Terms of Service
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
              1. Acceptance of Terms
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              By downloading, installing, or using the Study Sprint application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you should not use the App.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              2. Description of Service
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              Study Sprint is a productivity application designed to help users manage their study time, track tasks, and improve focus. The App provides timer functionality, task management, and productivity statistics.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              3. User Accounts
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              The App may store information locally on your device to enhance your experience. You are responsible for maintaining the confidentiality of your device and any information stored within the App.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              4. User Content
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              You retain all rights to any content you create, upload, or store within the App. By using the App, you grant us a license to use, store, and display your content solely for the purpose of providing and improving the App.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              5. Prohibited Uses
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              You agree not to use the App:
            </Text>
            <View style={styles.bulletList}>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • In any way that violates any applicable federal, state, local, or international law or regulation.
              </Text>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • To transmit any material that is defamatory, obscene, or offensive.
              </Text>
              <Text style={[styles.bulletItem, { color: colors.text }]}>
                • To attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the App.
              </Text>
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              6. Intellectual Property Rights
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              The App and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, and the design, selection, and arrangement thereof) are owned by Study Sprint, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              7. Termination
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              8. Disclaimer of Warranties
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              THE APP IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER STUDY SPRINT NOR ANY PERSON ASSOCIATED WITH STUDY SPRINT MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE APP.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              9. Limitation of Liability
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              IN NO EVENT WILL STUDY SPRINT, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE APP.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              10. Changes to Terms of Service
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the App following the posting of revised Terms means that you accept and agree to the changes.
            </Text>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              11. Contact Information
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              Questions or comments about the App or these Terms may be directed to us at: ssnow@sterneschool.org
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