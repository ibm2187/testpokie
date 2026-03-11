import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontWeights } from "../../src/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: { fontWeight: fontWeights.bold },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokedex",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
