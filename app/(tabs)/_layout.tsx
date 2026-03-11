import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontWeights } from "../../src/theme";
import { useLocale } from "../../src/context/LocaleContext";
import i18n from "../../src/i18n";

export default function TabsLayout() {
  // Subscribe to locale changes so tab titles re-render
  useLocale();

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
          title: i18n.t("tabs.pokedex"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: i18n.t("tabs.favorites"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t("tabs.settings"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
