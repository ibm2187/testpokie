import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSizes, fontWeights, spacing, iconSizes } from "../theme";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => onDismiss());
    }, 4000);

    return () => clearTimeout(timer);
  }, [opacity, onDismiss]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Ionicons name="cloud-offline-outline" size={iconSizes.sm} color={colors.textOnPrimary} />
      <Text style={styles.text} numberOfLines={1}>
        {message}
      </Text>
      <Pressable onPress={onDismiss} hitSlop={8}>
        <Ionicons name="close" size={iconSizes.sm} color={colors.textOnPrimary} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.error,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  text: {
    flex: 1,
    color: colors.textOnPrimary,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
  },
});
