import React from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { usePokemonList, PokemonListEntry } from "../../src/hooks/usePokemonList";
import { PokemonCard } from "../../src/components/PokemonCard";
import { ErrorState } from "../../src/components/ErrorState";
import { colors, fontSizes, spacing } from "../../src/theme";

export default function PokemonListScreen() {
  const { pokemon, loading, loadingMore, refreshing, reachedLimit, error, loadMore, refresh, retry } =
    usePokemonList();
  const router = useRouter();

  const navigateToDetail = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error && pokemon.length === 0) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }: { item: PokemonListEntry }) => (
        <PokemonCard
          id={item.id}
          name={item.name}
          onPress={() => navigateToDetail(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={styles.footer}
          />
        ) : reachedLimit ? (
          <View style={styles.limitFooter}>
            <Text style={styles.limitText}>
              Showing first 80 Pokemon. That's all for now!
            </Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxl,
  },
  list: {
    paddingVertical: spacing.md,
  },
  footer: {
    paddingVertical: spacing.xxl,
  },
  limitFooter: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.section,
    alignItems: "center",
  },
  limitText: {
    fontSize: fontSizes.body,
    color: colors.textTertiary,
    textAlign: "center",
  },
});
