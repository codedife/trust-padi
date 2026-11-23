import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReportScamScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Scam Screen</Text>
      <Text style={styles.subtitle}>This is inside the Tab Bar.</Text>
      
      {/* Test Button to leave the tabs */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/profile')} // Goes outside (tabs) folder
      >
        <Text style={styles.buttonText}>Go to Profile (Hides Tab Bar)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA', paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#292743', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  button: { backgroundColor: '#0A3678', padding: 15, borderRadius: 8 },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});