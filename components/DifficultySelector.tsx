import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  FlatList,
  Platform
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Difficulty } from '@/store/timerStore';

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficultyOptions: { label: string; value: Difficulty; description: string }[] = [
  { label: 'Easy', value: 'easy', description: '25 minutes' },
  { label: 'Medium', value: 'medium', description: '15 minutes' },
  { label: 'Hard', value: 'hard', description: '5 minutes' },
];

export default function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedOption = difficultyOptions.find(option => option.value === value);
  
  const handleSelect = (difficulty: Difficulty) => {
    onChange(difficulty);
    setModalVisible(false);
  };

  // Web-specific dropdown implementation
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Difficulty:</Text>
        <View style={styles.webSelectContainer}>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as Difficulty)}
            style={{
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Colors.border,
              backgroundColor: Colors.card,
              fontSize: 16,
              width: '100%',
              appearance: 'none',
              outline: 'none',
            }}
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.description})
              </option>
            ))}
          </select>
          <ChevronDown 
            size={20} 
            color={Colors.text} 
            style={styles.webSelectIcon} 
          />
        </View>
      </View>
    );
  }

  // Mobile implementation with modal
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Difficulty:</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {selectedOption?.label} ({selectedOption?.description})
        </Text>
        <ChevronDown size={20} color={Colors.text} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Difficulty</Text>
            
            <FlatList
              data={difficultyOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === value && styles.selectedOptionText,
                  ]}>
                    {item.label}
                  </Text>
                  <Text style={[
                    styles.optionDescription,
                    item.value === value && styles.selectedOptionText,
                  ]}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
    maxWidth: 300,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: Colors.text,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  selectorText: {
    fontSize: 16,
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.text,
  },
  optionsList: {
    width: '100%',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.primary + '20', // 20% opacity
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 4,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  webSelectContainer: {
    position: 'relative',
  },
  webSelectIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    pointerEvents: 'none',
  },
});