import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getTypeColor } from "../utils/typeColors";
import { capitalize } from "../utils/pokemon";
import { colors, fontSizes, fontWeights, radii, spacing } from "../theme";

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
      <Text style={styles.text}>{capitalize(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    marginRight: 6,
  },
  text: {
    color: colors.textOnDark,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
  },
});
