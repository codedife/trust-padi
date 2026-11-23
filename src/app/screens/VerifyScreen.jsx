import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function VerifyScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [hasError, setHasError] = useState(false);
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setHasError(false); 

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const isComplete = otp.every((digit) => digit !== '');

  const handleVerify = () => {
    if (otp.join('') !== '123456') {
      setHasError(true);
    } else {
      // Goes to the (tabs) folder, which defaults to your new index.jsx
      router.replace('/(tabs)'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#292743" />
          </TouchableOpacity>

          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>2/2</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '100%' }]} />
            </View>
          </View>

          <Text style={styles.title}>Verify</Text>
          <Text style={styles.subtitle}>
            We just sent you an OTP, enter the security code we sent to xyz@gmail.com
          </Text>

          <Text style={styles.label}>Enter the 6 digits code here</Text>
          
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[styles.otpInput, hasError && styles.otpInputError]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          {hasError && (
            <Text style={styles.errorText}>You entered an incorrect code</Text>
          )}

          <TouchableOpacity 
            style={[styles.primaryButton, !isComplete && styles.primaryButtonDisabled]}
            onPress={handleVerify}
            disabled={!isComplete}
          >
            <Text style={styles.primaryButtonText}>
              {isComplete ? 'Proceed' : 'Verify'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signin')}>
            <Text style={styles.footerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 10 },
  backButton: { marginBottom: 20, width: 40, height: 40, justifyContent: 'center' },
  progressHeader: { marginBottom: 30 },
  progressText: { fontSize: 12, color: '#666', marginBottom: 8, fontWeight: '600' },
  progressBarBackground: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, width: '100%' },
  progressBarFill: { height: 6, backgroundColor: '#0A3678', borderRadius: 3 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#292743', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666666', marginBottom: 30, lineHeight: 22 },
  label: { fontSize: 14, fontWeight: '600', color: '#292743', marginBottom: 15 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  otpInput: {
    width: 45, height: 50, borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 8, textAlign: 'center', fontSize: 20, color: '#292743',
  },
  otpInputError: { borderColor: '#FF4D4F' },
  errorText: { color: '#FF4D4F', fontSize: 12, marginBottom: 20 },
  primaryButton: {
    height: 50, backgroundColor: '#0A3678', borderRadius: 8,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20,
  },
  primaryButtonDisabled: { backgroundColor: '#E0E0E0' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 },
  footerText: { color: '#666', fontSize: 14 },
  footerLink: { color: '#0A3678', fontSize: 14, fontWeight: 'bold' },
});