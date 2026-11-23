
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#0B4A99",
      tabBarInactiveTintColor: "#94A3B8",
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="report-scam"
        options={{
          title: "Report Scam",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="escrow"
        options={{
          title: "Escrow",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
