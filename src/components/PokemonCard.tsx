import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getOfficialArtworkUrl, formatPokemonId, capitalize } from "../utils/pokemon";
import { useFavorites } from "../context/FavoritesContext";
import { colors, fontSizes, fontWeights, radii, spacing, iconSizes, imageSizes } from "../theme";

interface PokemonCardProps {
  id: number;
  name: string;
  onPress: () => void;
}

export function PokemonCard({ id, name, onPress }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name });
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <Image
        source={{ uri: getOfficialArtworkUrl(id) }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.id}>{formatPokemonId(id)}</Text>
        <Text style={styles.name}>{capitalize(name)}</Text>
      </View>
      <Pressable onPress={toggleFavorite} style={styles.favButton} hitSlop={8}>
        <Ionicons
          name={favorited ? "heart" : "heart-outline"}
          size={iconSizes.md}
          color={favorited ? colors.favorite : colors.favoriteInactive}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginHorizontal: spacing.xl,
    marginVertical: 6,
    padding: spacing.lg,
    shadowColor: colors.surfaceShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: imageSizes.listThumbnail,
    height: imageSizes.listThumbnail,
  },
  info: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  id: {
    fontSize: fontSizes.sm,
    color: colors.textTertiary,
    fontWeight: fontWeights.semibold,
  },
  name: {
    fontSize: fontSizes.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  favButton: {
    padding: spacing.md,
  },
});
