import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';

export default function SessionStats() {
  const { sessionsCompleted, customMinutes, theme } = useTimerStore();
  const colors = themes[theme];
  
  // Calculate total minutes studied
  const totalMinutes = sessionsCompleted * customMinutes;
  
  // Format total time in hours and minutes
  const formatTotalTime = () => {
    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Your Progress
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={[
          styles.statCard, 
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {sessionsCompleted}
          </Text>
          <Text style={[styles.statLabel, { color: colors.lightText }]}>
            Sessions
          </Text>
        </View>
        
        <View style={[
          styles.statCard, 
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {formatTotalTime()}
          </Text>
          <Text style={[styles.statLabel, { color: colors.lightText }]}>
            Total Focus Time
          </Text>
        </View>
      </View>
      
      {sessionsCompleted === 0 && (
        <Text style={[styles.emptyText, { color: colors.lightText }]}>
          Complete your first session to see your stats!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  emptyText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
  },
});