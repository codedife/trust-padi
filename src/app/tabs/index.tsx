import * as Device from 'expo-device';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // <-- IMPORT ROUTER

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const router = useRouter(); // <-- INITIALIZE ROUTER

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {/* --- TEST ROUTING BUTTONS --- */}
        <ThemedView type="backgroundElement" style={[styles.stepContainer, { marginTop: 20, gap: 15 }]}>
          <ThemedText type="title" style={{ fontSize: 18, textAlign: 'center' }}>Test Your Routes</ThemedText>
          
          <TouchableOpacity style={styles.testButton} onPress={() => router.push('/projects')}>
            <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Test Projects Screen</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={() => router.push('/profile')}>
            <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Test Profile Screen</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.testButton} onPress={() => router.push('/notifications')}>
            <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Test Notifications</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.testButton, { backgroundColor: '#666' }]} onPress={() => router.push('/(auth)/signin')}>
            <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Test Sign In</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    justifyContent: 'center', // Added to center the new buttons
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  // Add style for the test buttons
  testButton: {
    backgroundColor: '#0A3678',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  }
});