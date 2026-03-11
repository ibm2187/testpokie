import { Stack } from "expo-router";
import { FavoritesProvider } from "../src/context/FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            title: "Details",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
