import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart2, Clock, Calendar } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';
import SessionStats from '@/components/SessionStats';

export default function StatsScreen() {
  const { theme, sessionsCompleted, customMinutes } = useTimerStore();
  const colors = themes[theme];
  
  // Calculate total minutes studied
  const totalMinutes = sessionsCompleted * customMinutes;
  
  // Format total time in hours and minutes
  const formatTotalTime = () => {
    if (totalMinutes < 60) {
      return `${totalMinutes} minutes`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`;
    }
  };
  
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
          <View style={styles.header}>
            <BarChart2 size={32} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Your Study Statistics
            </Text>
          </View>
          
          <SessionStats />
          
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Detailed Stats
            </Text>
            
            <View style={styles.statRow}>
              <View style={styles.statIcon}>
                <Clock size={24} color={colors.primary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={[styles.statLabel, { color: colors.lightText }]}>
                  Average Session Length
                </Text>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {customMinutes} minutes
                </Text>
              </View>
            </View>
            
            <View style={styles.statRow}>
              <View style={styles.statIcon}>
                <Calendar size={24} color={colors.primary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={[styles.statLabel, { color: colors.lightText }]}>
                  Total Focus Time
                </Text>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {formatTotalTime()}
                </Text>
              </View>
            </View>
          </View>
          
          {sessionsCompleted === 0 && (
            <View style={[
              styles.emptyCard, 
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No Sessions Yet
              </Text>
              <Text style={[styles.emptyText, { color: colors.lightText }]}>
                Complete your first study session to see your statistics here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1,
    marginLeft: 12,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  emptyCard: {
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
