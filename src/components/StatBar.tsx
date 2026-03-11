import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatStatName } from "../utils/pokemon";
import { colors, fontSizes, fontWeights, radii, spacing } from "../theme";

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

export function StatBar({ name, value, maxValue = 255 }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const barColor =
    value >= 100 ? colors.statHigh : value >= 50 ? colors.statMedium : colors.statLow;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{formatStatName(name)}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.barBackground}>
        <View
          style={[styles.barFill, { width: `${percentage}%`, backgroundColor: barColor }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  label: {
    width: 55,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
  },
  value: {
    width: 35,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
    textAlign: "right",
    marginRight: 10,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.statTrack,
    borderRadius: radii.sm,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: radii.sm,
  },
});
