import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" /> {/* Or "(auth)" if the folder has parentheses */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="projects" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}