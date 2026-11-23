import React, { useState } from 'react'; // 1. Import useState
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert, // 2. Import Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function SignUpScreen() {
  const router = useRouter();
  
  // 3. Create state for the inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 4. Create the validation function
  const handleSignUp = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing fields', 'Please enter your full name and email.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    // If everything is correct, proceed to verify
    router.push('/auth/verify');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#292743" />
          </TouchableOpacity>

          {/* Progress Bar */}
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>1/2</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '50%' }]} />
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Create an account to continue!</Text>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Ibrahim"
              placeholderTextColor="#A0A0A0"
              value={name}
              onChangeText={setName} // 5. Bind the text
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="xyz@gmail.com"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail} // 6. Bind the text
            />

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleSignUp} // 7. Call validation function instead of router directly
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton}>
              <AntDesign name="google" size={20} color="#DB4437" style={{ marginRight: 10 }} />
              <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signin')}>
              <Text style={styles.footerLink}>Sign in</Text>
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
  backButton: { marginBottom: 20, width: 40, height: 40, justifyContent: 'center' },
  progressHeader: { marginBottom: 30 },
  progressText: { fontSize: 12, color: '#666', marginBottom: 8, fontWeight: '600' },
  progressBarBackground: { height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, width: '100%' },
  progressBarFill: { height: 6, backgroundColor: '#0A3678', borderRadius: 3 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#292743', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666666', marginBottom: 30 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#292743', marginBottom: 8 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8,
    paddingHorizontal: 15, fontSize: 14, color: '#292743', marginBottom: 20,
  },
  primaryButton: {
    height: 50, backgroundColor: '#0A3678', borderRadius: 8,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 15, color: '#888', fontSize: 14 },
  googleButton: {
    height: 50, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  },
  googleButtonText: { color: '#292743', fontSize: 15, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingBottom: 20 },
  footerText: { color: '#666', fontSize: 14 },
  footerLink: { color: '#0A3678', fontSize: 14, fontWeight: 'bold' },
});