import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFavorites } from "../../src/context/FavoritesContext";
import { PokemonCard } from "../../src/components/PokemonCard";
import { FavoritePokemon } from "../../src/types/pokemon";
import { colors, fontSizes, fontWeights, spacing } from "../../src/theme";

export default function FavoritesScreen() {
  const { favorites, loaded } = useFavorites();
  const router = useRouter();

  const navigateToDetail = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  if (!loaded) {
    return null;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>{'<3'}</Text>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart icon on any Pokemon to add it to your favorites.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }: { item: FavoritePokemon }) => (
        <PokemonCard
          id={item.id}
          name={item.name}
          onPress={() => navigateToDetail(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.screen,
  },
  emptyIcon: {
    fontSize: fontSizes.displayLarge,
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textTertiary,
    textAlign: "center",
    lineHeight: 22,
  },
  list: {
    paddingVertical: spacing.md,
  },
});
