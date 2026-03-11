import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePokemonDetail } from "../../src/hooks/usePokemonDetail";
import { useFavorites } from "../../src/context/FavoritesContext";
import { TypeBadge } from "../../src/components/TypeBadge";
import { StatBar } from "../../src/components/StatBar";
import {
  capitalize,
  formatPokemonId,
  formatHeight,
  formatWeight,
} from "../../src/utils/pokemon";
import { getTypeColor } from "../../src/utils/typeColors";
import { ErrorState } from "../../src/components/ErrorState";
import {
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
  iconSizes,
  imageSizes,
} from "../../src/theme";

const HEADER_HEIGHT = 44;

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = parseInt(id!, 10);
  const { pokemon, loading, error, retry } = usePokemonDetail(pokemonId);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !pokemon) {
    return <ErrorState message={error ?? "Pokemon not found"} onRetry={retry} />;
  }

  const favorited = isFavorite(pokemon.id);
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite({ id: pokemon.id, name: pokemon.name });
    }
  };

  const primaryType = pokemon.types[0]?.type.name;
  const bgColor = primaryType ? getTypeColor(primaryType) : colors.backgroundSecondary;

  return (
    <>
      <Stack.Screen
        options={{
          title: capitalize(pokemon.name),
          headerTransparent: true,
          headerTintColor: colors.textOnDark,
          headerStyle: { backgroundColor: colors.transparent },
          headerTitleStyle: { color: colors.textOnDark, fontWeight: fontWeights.bold },
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, spacing.xxl) + spacing.xxl }]}
      >
        {/* Edge-to-edge hero image with type-colored background */}
        <View style={[styles.imageContainer, { backgroundColor: bgColor, paddingTop: insets.top + HEADER_HEIGHT }]}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Name and ID */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
          </View>
          <Pressable onPress={toggleFavorite} style={styles.favButton} hitSlop={8}>
            <Ionicons
              name={favorited ? "heart" : "heart-outline"}
              size={iconSizes.lg}
              color={favorited ? colors.favorite : colors.favoriteInactive}
            />
          </Pressable>
        </View>

        {/* Types */}
        <View style={styles.types}>
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </View>

        {/* Physical */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical</Text>
          <View style={styles.physicalRow}>
            <View style={styles.physicalItem}>
              <Text style={styles.physicalLabel}>Height</Text>
              <Text style={styles.physicalValue}>
                {formatHeight(pokemon.height)}
              </Text>
            </View>
            <View style={styles.physicalItem}>
              <Text style={styles.physicalLabel}>Weight</Text>
              <Text style={styles.physicalValue}>
                {formatWeight(pokemon.weight)}
              </Text>
            </View>
            <View style={styles.physicalItem}>
              <Text style={styles.physicalLabel}>Base XP</Text>
              <Text style={styles.physicalValue}>{pokemon.base_experience}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          {pokemon.stats.map((s) => (
            <StatBar
              key={s.stat.name}
              name={s.stat.name}
              value={s.base_stat}
            />
          ))}
        </View>

        {/* Abilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          {pokemon.abilities.map((a) => (
            <View key={a.ability.name} style={styles.abilityRow}>
              <Text style={styles.abilityName}>
                {capitalize(a.ability.name.replace("-", " "))}
              </Text>
              {a.is_hidden && (
                <Text style={styles.hiddenBadge}>Hidden</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.screen,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxl,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: spacing.xxl,
  },
  image: {
    width: imageSizes.detailHero,
    height: imageSizes.detailHero,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  name: {
    fontSize: fontSizes.displaySmall,
    fontWeight: fontWeights.extrabold,
    color: colors.textPrimary,
  },
  id: {
    fontSize: fontSizes.subtitle,
    color: colors.textTertiary,
    fontWeight: fontWeights.semibold,
    marginTop: spacing.xs,
  },
  favButton: {
    padding: spacing.md,
  },
  types: {
    flexDirection: "row",
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
  },
  section: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: fontSizes.sectionTitle,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  physicalRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  physicalItem: {
    alignItems: "center",
  },
  physicalLabel: {
    fontSize: fontSizes.body,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
  },
  physicalValue: {
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  abilityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  abilityName: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textPrimary,
  },
  hiddenBadge: {
    marginLeft: spacing.md,
    fontSize: fontSizes.xs,
    color: colors.textTertiary,
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.round,
    overflow: "hidden",
  },
});
