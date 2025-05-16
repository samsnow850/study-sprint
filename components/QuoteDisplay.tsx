import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { quotes } from '@/constants/quotes';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import { affirmations } from '@/constants/affirmations';

export default function QuoteDisplay() {
  const [quote, setQuote] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  // Change quote every 30 seconds
  useEffect(() => {
    const getRandomQuote = () => {
      // 30% chance to show an affirmation instead of a quote
      const showAffirmation = Math.random() < 0.3;
      
      if (showAffirmation) {
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        return affirmations[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
      }
    };
    
    const updateQuote = () => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Update quote
        setQuote(getRandomQuote());
        
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    };
    
    // Set initial quote
    setQuote(getRandomQuote());
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Set interval to change quote
    const interval = setInterval(updateQuote, 30000);
    
    return () => clearInterval(interval);
  }, [fadeAnim]);
  
  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.quoteContainer, 
        { 
          opacity: fadeAnim,
          backgroundColor: colors.card,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0]
              })
            }
          ]
        }
      ]}>
        <Text style={[styles.quoteText, { color: colors.text }]}>"{quote}"</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 600,
  },
  quoteContainer: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});