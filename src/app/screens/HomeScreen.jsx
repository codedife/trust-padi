import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const TestButton = ({ title, route }) => (
    <TouchableOpacity style={styles.button} onPress={() => router.push(route)}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Testing Hub</Text>
      <Text style={styles.subtitle}>Click to test your routes</Text>

      <TestButton title="Go to Projects" route="/projects" />
      <TestButton title="Go to Notifications" route="/notifications" />
      <TestButton title="Go to Profile" route="/profile" />
      <TestButton title="Go to Sign In" route="/auth/signin" />
      <TestButton title="Go to Onboarding" route="/auth/index" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#0A3678' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 30, color: '#666' },
  button: {
    backgroundColor: '#F0F4F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#0A3678',
  },
  buttonText: { color: '#0A3678', fontSize: 16, fontWeight: '600', textAlign: 'center' }
});