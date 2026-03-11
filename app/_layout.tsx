import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FavoritesProvider } from "../src/context/FavoritesContext";
import { LocaleProvider, useLocale } from "../src/context/LocaleContext";

function AppContent() {
  const { loaded } = useLocale();

  if (!loaded) {
    return null;
  }

  return (
    <FavoritesProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}

export default function RootLayout() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}
