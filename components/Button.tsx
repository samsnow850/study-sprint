import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  Platform,
  Pressable,
  Animated
} from 'react-native';
import { useTimerStore } from '@/store/timerStore';
import { themes } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  icon,
}: ButtonProps) {
  const ButtonComponent = Platform.OS === 'web' ? Pressable : TouchableOpacity;
  const theme = themes[useTimerStore(state => state.theme)];
  
  // Animation for button press
  const animatedScale = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  };
  
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: theme.primary };
      case 'secondary':
        return { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primary };
      case 'danger':
        return { backgroundColor: theme.danger };
      case 'success':
        return { backgroundColor: theme.success };
      case 'warning':
        return { backgroundColor: theme.warning };
      default:
        return { backgroundColor: theme.primary };
    }
  };
  
  const getVariantTextStyle = (): TextStyle => {
    switch (variant) {
      case 'secondary':
        return { color: theme.primary };
      default:
        return { color: '#FFFFFF' };
    }
  };
  
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      case 'large':
        return { paddingVertical: 14, paddingHorizontal: 28 };
      default:
        return { paddingVertical: 10, paddingHorizontal: 20 };
    }
  };
  
  const getSizeTextStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'large':
        return { fontSize: 18 };
      default:
        return { fontSize: 16 };
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <ButtonComponent
        onPress={onPress}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          getVariantStyle(),
          getSizeStyle(),
          disabled && styles.disabled,
          style,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.text,
            getVariantTextStyle(),
            getSizeTextStyle(),
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </ButtonComponent>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
  disabledText: {
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: 8,
  },
});

// Add a View component for TypeScript
const View = ({ style, children }: { style?: ViewStyle, children: React.ReactNode }) => (
  <React.Fragment>{children}</React.Fragment>
);