import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { usePathname, router } from 'expo-router';
import { Home, Clock, ListTodo, BarChart2, Settings } from 'lucide-react-native';
import { themes } from '@/constants/colors';
import { useTimerStore } from '@/store/timerStore';

export default function BottomNavBar() {
  const pathname = usePathname();
  const theme = useTimerStore(state => state.theme);
  const colors = themes[theme];
  
  const routes = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Timer', path: '/timer', icon: Clock },
    { name: 'Tasks', path: '/tasks', icon: ListTodo },
    { name: 'Stats', path: '/stats', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  const handleNavigation = (path: string) => {
    if (path === pathname) return;
    
    // If we're on the timer screen and trying to navigate away
    if (pathname === '/timer' && useTimerStore.getState().isRunning) {
      // Pause the timer
      useTimerStore.getState().pauseTimer();
      
      // Show confirmation dialog
      if (Platform.OS === 'web') {
        const confirmed = window.confirm('Your timer will be paused. Are you sure you want to leave?');
        if (confirmed) {
          router.push(path);
        } else {
          // Resume timer if user cancels
          useTimerStore.getState().startTimer();
        }
      } else {
        import('react-native').then(({ Alert }) => {
          Alert.alert(
            "Leave Timer?",
            "Your timer will be paused. Are you sure you want to leave?",
            [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                  // Resume timer if user cancels
                  useTimerStore.getState().startTimer();
                }
              },
              {
                text: "Leave",
                onPress: () => router.push(path)
              }
            ]
          );
        });
      }
    } else {
      router.push(path);
    }
  };
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.card,
        borderTopColor: colors.border,
      }
    ]}>
      {routes.map((route) => {
        const isActive = pathname === route.path;
        const IconComponent = route.icon;
        
        return (
          <TouchableOpacity
            key={route.path}
            style={styles.tab}
            onPress={() => handleNavigation(route.path)}
            activeOpacity={0.7}
          >
            <IconComponent 
              size={24} 
              color={isActive ? colors.primary : colors.lightText} 
            />
            <Text 
              style={[
                styles.tabText, 
                { 
                  color: isActive ? colors.primary : colors.lightText,
                  fontWeight: isActive ? '600' : 'normal',
                }
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});