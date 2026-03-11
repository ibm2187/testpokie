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
import { useLocalSearchParams, useRouter } from "expo-router";
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
import i18n from "../../src/i18n";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = parseInt(id!, 10);
  const { pokemon, loading, error, retry } = usePokemonDetail(pokemonId);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.backButtonContainer, { top: insets.top }]}>
          <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={8}>
            <Ionicons name="arrow-back" size={iconSizes.md} color={colors.textPrimary} />
          </Pressable>
        </View>
        <ErrorState message={error ?? i18n.t("error.notFound")} onRetry={retry} />
      </View>
    );
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
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, spacing.xxl) + spacing.xxl }]}
      >
        {/* Edge-to-edge hero — extends behind status bar */}
        <View style={[styles.heroContainer, { backgroundColor: bgColor, paddingTop: insets.top + 56 }]}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.heroImage}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Name and ID */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Text style={styles.idText}>{formatPokemonId(pokemon.id)}</Text>
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
          <Text style={styles.sectionTitle}>{i18n.t("detail.physical")}</Text>
          <View style={styles.physicalRow}>
            <View style={styles.physicalItem}>
              <Text style={styles.physicalLabel}>{i18n.t("detail.height")}</Text>
              <Text style={styles.physicalValue}>
                {formatHeight(pokemon.height)}
              </Text>
            </View>
            <View style={styles.physicalItem}>
              <Text style={styles.physicalLabel}>{i18n.t("detail.weight")}</Text>
              <Text style={styles.physicalValue}>
                {formatWeight(pokemon.weight)}
              </Text>
            </View>
            <View style={styles.physicalItem}>
              <Text style={styles.physicalLabel}>{i18n.t("detail.baseXp")}</Text>
              <Text style={styles.physicalValue}>{pokemon.base_experience}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t("detail.baseStats")}</Text>
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
          <Text style={styles.sectionTitle}>{i18n.t("detail.abilities")}</Text>
          {pokemon.abilities.map((a) => (
            <View key={a.ability.name} style={styles.abilityRow}>
              <Text style={styles.abilityName}>
                {capitalize(a.ability.name.replace(/-/g, " "))}
              </Text>
              {a.is_hidden && (
                <Text style={styles.hiddenBadge}>{i18n.t("detail.hidden")}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating back button over the hero */}
      <View style={[styles.backButtonContainer, { top: insets.top }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={iconSizes.md} color={colors.textOnDark} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
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
  heroContainer: {
    alignItems: "center",
    paddingBottom: spacing.xxl,
  },
  heroImage: {
    width: imageSizes.detailHero,
    height: imageSizes.detailHero,
  },
  backButtonContainer: {
    position: "absolute",
    left: spacing.xl,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: fontSizes.displaySmall,
    fontWeight: fontWeights.extrabold,
    color: colors.textPrimary,
  },
  idText: {
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
