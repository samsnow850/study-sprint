import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '@/constants/colors';

export type ThemeKey = 'blue' | 'purple' | 'dark' | 'sunset';

interface TimerState {
  // Timer state
  isRunning: boolean;
  timeRemaining: number;
  initialTime: number;
  customMinutes: number;
  isBreak: boolean;
  breakTimeRemaining: number;
  
  // Session tracking
  sessionsCompleted: number;
  
  // Settings
  theme: ThemeKey;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  
  // Actions
  setCustomMinutes: (minutes: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  toggleTimer: () => void;
  startBreak: () => void;
  tickBreak: () => void;
  skipBreak: () => void;
  completeSession: () => void;
  setTheme: (theme: ThemeKey) => void;
  toggleSound: () => void;
  toggleVibration: () => void;
}

const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      timeRemaining: 15 * 60, // Default to 15 minutes
      initialTime: 15 * 60,
      customMinutes: 15,
      isBreak: false,
      breakTimeRemaining: BREAK_TIME,
      
      sessionsCompleted: 0,
      
      theme: 'blue',
      soundEnabled: true,
      vibrationEnabled: true,
      
      setCustomMinutes: (minutes: number) => {
        const timeInSeconds = minutes * 60;
        set({ 
          customMinutes: minutes,
          timeRemaining: timeInSeconds,
          initialTime: timeInSeconds,
          isRunning: false
        });
      },
      
      startTimer: () => set({ isRunning: true }),
      
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () => {
        const { customMinutes } = get();
        const timeInSeconds = customMinutes * 60;
        set({ 
          timeRemaining: timeInSeconds,
          isRunning: false,
          isBreak: false
        });
      },
      
      tick: () => {
        const { timeRemaining, isRunning } = get();
        if (isRunning && timeRemaining > 0) {
          set({ timeRemaining: timeRemaining - 1 });
        } else if (isRunning && timeRemaining === 0) {
          set({ isRunning: false });
        }
      },
      
      toggleTimer: () => {
        const { isRunning } = get();
        set({ isRunning: !isRunning });
      },
      
      startBreak: () => {
        set({ 
          isBreak: true, 
          breakTimeRemaining: BREAK_TIME,
          isRunning: true
        });
      },
      
      tickBreak: () => {
        const { breakTimeRemaining, isRunning, isBreak } = get();
        if (isRunning && isBreak && breakTimeRemaining > 0) {
          set({ breakTimeRemaining: breakTimeRemaining - 1 });
        } else if (isRunning && isBreak && breakTimeRemaining === 0) {
          set({ 
            isRunning: false,
            isBreak: false
          });
        }
      },
      
      skipBreak: () => {
        set({ 
          isBreak: false,
          isRunning: false
        });
      },
      
      completeSession: () => {
        const { sessionsCompleted } = get();
        set({ sessionsCompleted: sessionsCompleted + 1 });
      },
      
      setTheme: (theme: ThemeKey) => {
        set({ theme });
      },
      
      toggleSound: () => {
        const { soundEnabled } = get();
        set({ soundEnabled: !soundEnabled });
      },
      
      toggleVibration: () => {
        const { vibrationEnabled } = get();
        set({ vibrationEnabled: !vibrationEnabled });
      },
    }),
    {
      name: 'study-sprint-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
