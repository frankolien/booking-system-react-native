import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

// Reusable Button Component
export const Button = ({ title, onPress, variant = 'primary', style, disabled = false }) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'primary' && styles.primaryButtonText,
    variant === 'secondary' && styles.secondaryButtonText,
    variant === 'outline' && styles.outlineButtonText,
    disabled && styles.disabledButtonText
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

// Reusable Card Component
export const Card = ({ children, style, padding = 20 }) => {
  return (
    <View style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
};

// Reusable Input Component
export const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  multiline = false,
  numberOfLines = 1
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.inputField, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
};

// Reusable Header Component
export const Header = ({ title, subtitle, style }) => {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
};

// Reusable Badge Component
export const Badge = ({ text, variant = 'default', style }) => {
  const badgeStyle = [
    styles.badge,
    variant === 'success' && styles.successBadge,
    variant === 'warning' && styles.warningBadge,
    variant === 'error' && styles.errorBadge,
    style
  ];

  const textStyle = [
    styles.badgeText,
    variant === 'success' && styles.successBadgeText,
    variant === 'warning' && styles.warningBadgeText,
    variant === 'error' && styles.errorBadgeText
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

// Reusable Loading Component
export const LoadingSpinner = ({ size = 'medium', style }) => {
  const spinnerSize = {
    small: 20,
    medium: 30,
    large: 40
  };

  return (
    <View style={[styles.loadingContainer, style]}>
      <View style={[styles.spinner, { width: spinnerSize[size], height: spinnerSize[size] }]} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

// Reusable Empty State Component
export const EmptyState = ({ title, subtitle, icon, action }) => {
  return (
    <View style={styles.emptyState}>
      {icon && <Text style={styles.emptyIcon}>{icon}</Text>}
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
      {action && action}
    </View>
  );
};

// Reusable Divider Component
export const Divider = ({ style, color = '#e5e7eb', thickness = 1 }) => {
  return (
    <View style={[styles.divider, { backgroundColor: color, height: thickness }, style]} />
  );
};

// Reusable Icon Component (using text icons for simplicity)
export const Icon = ({ name, size = 20, color = '#6b7280', style }) => {
  const iconMap = {
    'search': '🔍',
    'filter': '⚙️',
    'sort': '↕️',
    'star': '⭐',
    'heart': '❤️',
    'share': '📤',
    'bookmark': '🔖',
    'calendar': '📅',
    'clock': '🕐',
    'location': '📍',
    'plane': '✈️',
    'user': '👤',
    'settings': '⚙️',
    'home': '🏠',
    'back': '←',
    'forward': '→',
    'close': '✕',
    'check': '✓',
    'plus': '+',
    'minus': '-',
    'edit': '✏️',
    'delete': '🗑️',
    'info': 'ℹ️',
    'warning': '⚠️',
    'error': '❌',
    'success': '✅'
  };

  return (
    <Text style={[styles.icon, { fontSize: size, color }, style]}>
      {iconMap[name] || '?'}
    </Text>
  );
};

// Styles for all components
const styles = StyleSheet.create({
  // Button Styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  disabledButton: {
    backgroundColor: '#e5e7eb',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: 'white',
  },
  outlineButtonText: {
    color: '#374151',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },

  // Card Styles
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Input Styles
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  inputField: {
    padding: 12,
    fontSize: 16,
    color: '#374151',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  // Header Styles
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },

  // Badge Styles
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  successBadge: {
    backgroundColor: '#d1fae5',
  },
  warningBadge: {
    backgroundColor: '#fef3c7',
  },
  errorBadge: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  successBadgeText: {
    color: '#065f46',
  },
  warningBadgeText: {
    color: '#92400e',
  },
  errorBadgeText: {
    color: '#991b1b',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinner: {
    borderWidth: 3,
    borderColor: '#e5e7eb',
    borderTopColor: '#2563eb',
    borderRadius: 50,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },

  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Divider Styles
  divider: {
    width: '100%',
  },

  // Icon Styles
  icon: {
    textAlign: 'center',
  },
});
