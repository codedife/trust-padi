import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0A3678' }}>
      
      {/* If you want to use home.tsx, point the name to "home" */}
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }} 
      />
      
      <Tabs.Screen 
        name="report-scam" 
        options={{
          title: 'Report scam',
          tabBarIcon: ({ color }) => <Ionicons name="shield-alert" size={24} color={color} />,
        }} 
      />
      
      <Tabs.Screen 
        name="escrow" 
        options={{
          title: 'Escrow',
          tabBarIcon: ({ color }) => <Ionicons name="shield-checkmark" size={24} color={color} />,
        }} 
      />

      {/* Hide index from the tab bar if you are using home.tsx instead */}
      <Tabs.Screen 
        name="index" 
        options={{
          href: null, // This hides it from the bottom tabs
        }} 
      />
    </Tabs>
  );
}