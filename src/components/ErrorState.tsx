import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSizes, fontWeights, radii, spacing, iconSizes } from "../theme";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const isNetworkError =
    message.toLowerCase().includes("network") ||
    message.toLowerCase().includes("fetch") ||
    message.toLowerCase().includes("failed to");

  return (
    <View style={styles.container}>
      <Ionicons
        name={isNetworkError ? "cloud-offline-outline" : "alert-circle-outline"}
        size={iconSizes.xl}
        color={colors.error}
      />
      <Text style={styles.title}>
        {isNetworkError ? "No Connection" : "Something Went Wrong"}
      </Text>
      <Text style={styles.message}>
        {isNetworkError
          ? "Please check your internet connection and try again."
          : message}
      </Text>
      <Pressable style={styles.retryButton} onPress={onRetry}>
        <Ionicons name="refresh" size={iconSizes.sm} color={colors.textOnPrimary} style={styles.retryIcon} />
        <Text style={styles.retryText}>Try Again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.section,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textTertiary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.xxxl,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: radii.md,
  },
  retryIcon: {
    marginRight: 6,
  },
  retryText: {
    color: colors.textOnPrimary,
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.semibold,
  },
});
