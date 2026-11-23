import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    // Goes to the Tabs folder (assuming it's named (tabs) with parentheses)
    router.replace('/(tabs)'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          {/* UPDATED: Back Button goes to /auth (the Onboarding index) */}
          <TouchableOpacity onPress={() => router.replace('/auth')} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#292743" />
          </TouchableOpacity>

          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="xyz@gmail.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#A0A0A0" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleSignIn}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            {/* UPDATED: Sign up button goes to /auth/signup */}
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 10 },
  backButton: { marginBottom: 30, width: 40, height: 40, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#292743', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666666', marginBottom: 30 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#292743', marginBottom: 8 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8,
    paddingHorizontal: 15, fontSize: 14, color: '#292743', marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#E0E0E0', borderRadius: 8, marginBottom: 10,
  },
  passwordInput: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 14, color: '#292743' },
  eyeIcon: { padding: 15 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 30 },
  forgotPasswordText: { color: '#0A3678', fontSize: 13, fontWeight: '600' },
  primaryButton: {
    height: 50, backgroundColor: '#0A3678', borderRadius: 8,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingBottom: 20 },
  footerText: { color: '#666', fontSize: 14 },
  footerLink: { color: '#0A3678', fontSize: 14, fontWeight: 'bold' },
});